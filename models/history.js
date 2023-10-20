const { Schema } = require('mongoose');

const History = new Schema(
    {
        account: { type: String, required: true, ref: 'Account' },
        description: { type: String },
        transactionType: { type: String, required: true }, //n==New d=Deposit w=Withdraw t=Transfer c=Close
        method: { type: String }, //Check or Cash
        amount: { type: Number, required: true },//if open should have an amount
        accounts: { type: Array, required: true, ref: 'Account' }//accounts involved in the transaction
    },
    { timestamps: true }
);

module.exports = History;