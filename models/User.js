const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

//Create schema
const UserSchema = new Scheme({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);