const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (this.password !== value) {
            throw new Error('Passwords don\'t match!');
        }
    });


const User = mongoose.model('User', userSchema);

module.exports = User;