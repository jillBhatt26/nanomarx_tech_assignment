const { Schema, model } = require('mongoose');

const AuthSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const AuthModel = model('auths', AuthSchema);

module.exports = AuthModel;
