const { User, Account, History } = require('../models');


module.exports = {
    getUsers,
    getUserByEmail,
    getUserByAuth,
    createUser,
    createAccount,
    getAccounts,
    getAccountsUser,
    getAccountById,
    updateAccountBalance,
    deleteAccount,
    getHistoryAll,
    getHistoryById,
    createHistory,
    deleteHistoryById,
};
async function getUsers() { return await User.find(); }
async function getUserByEmail(email) { return await User.findOne({ email: email }); }
async function getUserByAuth(auth) { return await User.findOne({ auth: auth }); }
async function createUser(user) { return await User.insertMany(user); }

async function createAccount(account) { return await Account.insertMany(account); }
async function getAccounts() { return await Account.find({}); }
async function getAccountsUser(user) { return await Account.find({ user: user }); }

async function getAccountById(id) { return await Account.findById(id); };
async function updateAccountBalance(id, newBalance) {
    const filter = { _id: id };
    const update = { balance: newBalance };
    return await Account.findOneAndUpdate(filter, update);
}
async function deleteAccount(id) { return await Account.findByIdAndDelete(id); }

async function createHistory(history) { return await History.insertMany(history); }
async function getHistoryAll() { return await History.find(); }
async function getHistoryById(id) { return await History.find({ "account_id": id }).sort([['createdAt', -1]]); }
async function deleteHistoryById(accountId) { return await History.deleteMany({ account_id: accountId }); }
