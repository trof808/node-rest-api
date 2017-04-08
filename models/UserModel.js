const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'field name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'field email is required']
    },
     password: {
        type: String,
        required: [true, 'field password is required']
     }
});

module.exports = mongoose.model('User', UserScheme);
