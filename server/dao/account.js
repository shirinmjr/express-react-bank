const { User, Account, History } = require('../models');


module.exports = {
    getAccountById,
    updateAccountBalance
};

async function getAccountById(id) { return await Account.findById(id); };
async function updateAccountBalance(id, newBalance) {
    console.log(id, newBalance);
    const filter = { _id: id };
    const update = { balance: newBalance };
    return await Account.findOneAndUpdate(filter, update);
}


