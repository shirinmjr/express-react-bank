const { Schema } = require('mongoose');

const History = new Schema(
    {
        date: { type: Date, required: true },
        description: { type: String },
        transactionType: { type: String, required: true }, //Deposit or Withdraw d,w,t,c
        method: { type: String }, //Check or Cash
        amount: { type: Number, required: true },
        accounts: { type: Array, required: true, ref: 'Account' }
    },
    { timestamps: true }
);

module.exports = History;