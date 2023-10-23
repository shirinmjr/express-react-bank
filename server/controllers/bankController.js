const { User, Account, History } = require('../models');
const { getAccounts, getAccountById, updateAccountBalance, deleteAccount, getHistory } = require('../dao/account');
module.exports = {
    getAllAccounts,
    getOneAccount,
    createBankAccount,
    updateOneAccount,
    getOneHistoryByAccountId,
    deleteOneAccount
};

//GET-account
async function getAllAccounts(req, res) {
    console.log("Getting all accounts...");
    try {
        const accounts = await getAccounts();
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
        let account = await getAccountById(id);
        if (account) {
            return res.json(account);
        }
        return res.status(404).send('Account with the specified ID does not exist.');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

//POST-account
async function createBankAccount(req, res) {
    try {
        const bankAccount = await Account.create(req.body);
        return res.status(201).json({ bankAccount });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//PUT-Account
async function updateOneAccount(req, res) {
    try {
        const id = req.params.id;
        let account = await getAccountById(id);
        console.log(account);
        switch (req.body.action) {

            case 'd':
                let newBalance = account.balance + Number(req.body.amount);
                account = await updateAccountBalance(id, newBalance);
                return res.json(account);

            case 'w':
                if (account.balance >= req.body.amount) {
                    let newBalance = account.balance - Number(req.body.amount);
                    account = await updateAccountBalance(id, newBalance);
                    return res.json(account);
                } else {
                    return res.status(400).send('Balance Not Sufficient');
                }

            case 't':
                if (account.balance >= req.body.amount) {
                    let transferFromBalance = account.balance - Number(req.body.amount);
                    account = await updateAccountBalance(id, transferFromBalance);
                    let accountTransfer = await getAccountById(req.body.transferTo);//Getting transfer to account details
                    let transferToBalance = accountTransfer.balance + Number(req.body.amount);
                    accountTransfer = await updateAccountBalance(req.body.transferTo, transferToBalance);
                    return res.json(account);
                } else {
                    return res.status(400).send('Balance Not Sufficient');
                }
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

//DELETE - Account
async function deleteOneAccount(req, res) {
    console.log("Delete Account...");
    try {
        const id = req.params.id;
        let account = await getAccountById(id);
        if (!account) {
            return res.status(404).send('Account with the specified ID does not exist.');
        }
        if (account.balance != 0) {
            return res.status(400).send('Withdraw or transfer the balance to close');
        }
        account = await deleteAccount(id);
        return res.json(account);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


//GET-History
// async function getAllHistory(req, res) {
//     const id = req.params.id;
//     console.log('Getting History for... ', id);
//     try {
//         const histories = await getHistory(id);
//         return res.json(histories);

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error.message);
//     }
// }

async function getOneHistoryByAccountId(req, res) {
    console.log("Getting Account History Info...");
    try {
        const id = req.params.id;
        const history = await History.find({ "account": id });
        if (history) {
            return res.json(history);
        }
        return res.status(404).send('History for an account with the specified ID does not exist.');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

