const { Schema } = require('mongoose');

const User = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String },
        auth: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = User;