const db = require('../db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Chance = require('chance');
const chance = new Chance();
const { User, Account, History } = require('../models');
const users = require("./data/users.json");
const accounts = require("./data/accounts.json");
const histories = require("./data/histories.json");

const accountType = ['SVG', 'CHK'];
const transactionsType = ['deposit', 'withdraw', 'transfer', 'open', 'close'];
const methods = ['check', 'cash'];
let usersList;
let accountsList;

const createUsers = async () => {
    await User.deleteMany();
    usersList = users.map((user) => {
        return new User({
            username: user.username,
            password: user.password
        });
    });
    let createUsers = await User.insertMany(usersList);
    console.log(createUsers);
};

const createAccounts = async () => {
    await Account.deleteMany();
    accountsList = accounts.map((account) => {
        return new Account({
            username: chance.pickone(usersList)._id,
            type: chance.pickone(accountType),
            balance: account.balance,
            status: account.status
        });
    });
    let createAccounts = await Account.insertMany(accountsList);
    console.log(createAccounts);
};

const createHistories = async () => {
    await History.deleteMany();
    const historiesList = histories.map((history) => {
        return new History({
            date: chance.date(),
            description: history.description,
            transactionType: chance.pickone(transactionsType),
            method: chance.pickone(methods),
            amount: chance.floating({ min: 200, max: 3000 }),
            accounts: chance.pickset(accountsList, chance.integer({ min: 1, max: 2 })).map(e => e._id),
        });
    });
    let createHistories = await History.insertMany(historiesList);
    console.log(createHistories);
};

const run = async () => {
    await createUsers();
    await createAccounts();
    await createHistories();
    db.close();
};

run();