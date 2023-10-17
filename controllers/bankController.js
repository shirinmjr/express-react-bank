const { User, Account, History } = require('../models');
module.exports = {
    getAllAccounts,
    createBankAccount


};

//GET-movies
async function getAllAccounts(req, res) {
    console.log("Getting all accounts...");
    try {
        const accounts = await Account.find();
        return res.json(accounts);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

async function createBankAccount(req, res) {

    try {
        const bankAccount = await Account.create(req.body);
        return res.status(201).json({ bankAccount });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

