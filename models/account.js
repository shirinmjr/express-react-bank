const { Schema } = require('mongoose');

const Account = new Schema(
    {
        username: { type: String, required: true, ref:'User'},
        type: { type: String, required: true },
        balance: { type: Number, required: true },
        status: { type: Boolean, required: true }
    },
    { timestamps: true }
);

module.exports = Account;