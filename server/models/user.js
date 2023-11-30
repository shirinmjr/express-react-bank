const { Schema } = require('mongoose');

const User = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String }
    },
    { timestamps: true }
);

module.exports = User;