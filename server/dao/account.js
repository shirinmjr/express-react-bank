const { User, Account, History } = require('../models');


module.exports = {
    getAccounts,
    getAccountById,
    updateAccountBalance,
    deleteAccount,
    getHistoryAll,
    getHistoryById,
    createHistory,
    deleteHistoryById,
};
async function getAccounts() { return await Account.find(); }
async function getAccountById(id) { return await Account.findById(id); };
async function updateAccountBalance(id, newBalance) {
    const filter = { _id: id };
    const update = { balance: newBalance };
    return await Account.findOneAndUpdate(filter, update);
}
async function deleteAccount(id) { return await Account.findByIdAndDelete(id); }

async function getHistoryAll() { return await History.find(); }
async function getHistoryById(id) { return await History.find({ "account_id": id }).sort([['createdAt', -1]]); }
async function deleteHistoryById(accountId) { return await History.deleteMany({ account_id: accountId }); }
async function createHistory(history) { return await History.insertMany(history); }