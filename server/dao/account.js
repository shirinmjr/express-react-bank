const { User, Account, History } = require('../models');


module.exports = {
    getAccounts,
    getAccountById,
    updateAccountBalance,
    deleteAccount,
    getHistory
};
async function getAccounts() { return await Account.find(); }
async function getAccountById(id) { return await Account.findById(id); };
async function updateAccountBalance(id, newBalance) {
    const filter = { _id: id };
    const update = { balance: newBalance };
    return await Account.findOneAndUpdate(filter, update);
}
async function deleteAccount(id) { return await Account.findByIdAndDelete(id); }
async function getHistory(id) { return await History.findById(id); }
//async function createHistory(id,)



