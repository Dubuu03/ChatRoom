const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        token: {
            type: String,
            default: ''
        },

        accessLevel: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
