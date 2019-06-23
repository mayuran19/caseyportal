const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

//Create schema
const UserSchema = new Scheme({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);