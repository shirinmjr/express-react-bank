const { Schema } = require('mongoose');
const { User } = require('.');

const Account = new Schema(
    {
        accountNumber: { type: Number, required: true },
        type: { type: String, required: true },
        balance: { type: Number, required: true },
        status: { type: Boolean, required: true }
    },
    { timestamps: true }
);

module.exports = Account;

// user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }