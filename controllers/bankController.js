const { User, Account, History } = require('../models');
module.exports = {
    getAllAccounts,
    getOneAccount,
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

async function getOneAccount(req, res) {
    console.log("Getting Account Info...");
    try {
        const id = req.params.id;
        const account = await Account.findById(id);
        if (account) {
            return res.json(account);
        }
        return res.status(404).send('Account with the specified ID does not exist.');
    } catch (error) {
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

