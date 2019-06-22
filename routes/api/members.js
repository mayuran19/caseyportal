const express = require('express');
const router = express.Router();

//Load member model
const Member = require('../../models/Member')

router.get("/test", (req, res) => res.json(
    {
        msg: "Members test"
    }
));

router.post('/', (req, res) => {
    Member.findOne({email: req.body.email})
        .then(member => {
            if(member){
                return res.status(400).json({email: 'Email already exists'});
            }else{
                const newUser = new User({
                    name: req.body.email,
                    email: req.body.email
                });
            }
        })
})

module.exports = router;