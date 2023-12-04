const { Schema } = require('mongoose');

const Account = new Schema(
    {
        accountNumber: { type: Number, required: true },
        type: { type: String, required: true },
        balance: { type: Number, required: true },
        status: { type: Boolean, required: true },
        user: { type: String, required: true, ref: 'User' }
    },
    { timestamps: true }
);

module.exports = Account;

// Note: if wanted to use ._id instead of auth
//const { User } = require('.');
//user: { type: Schema.Types.ObjectId, required: true, ref: 'User'; }
