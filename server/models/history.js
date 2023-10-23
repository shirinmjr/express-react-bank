const { Schema } = require('mongoose');

const History = new Schema(
    {
        account_id: { type: String, required: true, ref: 'Account' },
        description: { type: String },
        transactionType: { type: String, required: true }, //n==New d=Deposit w=Withdraw t=Transfer c=Close
        method: { type: String }, //Check or Cash
        amount: { type: Number, required: true },//if open should have an amount
    },
    { timestamps: true }
);

module.exports = History;