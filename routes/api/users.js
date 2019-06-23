const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/User');
const jwtSecret = require('../../config/keys').jwtSecret;

router.get("/test", (req, res) => res.json(
    {
        msg: "Users test"
    }
));

router.post('/', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({
                    email: 'Email already exists'
                });
            }else{
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            throw err;
                        }else{
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        }
                    });
                });
            }
        })
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return req.status(404).json({email: 'User not found'});
            }

            //Check password
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //create jwt payload
                        const payload = {id: user.id, email: user.email};
                        jwt.sign(payload, jwtSecret, {expiresIn: 3600}, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    }else{
                        res.status(400).json({password: 'Username/Password doesnot match'});
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

module.exports = router;