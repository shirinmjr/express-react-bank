const db = require('../db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const { User, Account, History } = require('../models');
const Chance = require('chance');
const chance = new Chance();
const users = require("./data/users.json");
//const accounts = require("./data/accounts.json");
//const histories = require("./data/histories.json");

const accountType = ['SVG', 'CHK'];
const transactionsType = ['deposit', 'withdraw', 'transfer', 'open'];
const methods = ['check', 'cash'];

let usersList;
let accountsList;

const createUsers = async () => {
    await User.deleteMany();
    usersList = users.map((user) => {
        return new User({
            email: user.email,
            name: user.name
        });
    });
    let createUsers = await User.insertMany(usersList);
    console.log(createUsers);
};

const createAccounts = async () => {
    await Account.deleteMany();
    accountsList = [...Array(5)].map(() => {
        return new Account({
            accountNumber: chance.integer({ min: 1234567890, max: 9999999999 }),
            type: chance.pickone(accountType),
            balance: chance.floating({ min: 100, max: 9999, fixed: 2 }),
            status: true,
        });
    });
    let createAccounts = await Account.insertMany(accountsList);
    console.log(createAccounts);
};

const createHistories = async () => {
    await History.deleteMany();
    console.log("accountsList===>", accountsList);
    const historiesList = [...Array(10)].map(() => {
        return new History({
            account_id: chance.pickone(accountsList)._id,
            description: chance.paragraph({ sentences: 1 }),
            transactionType: chance.pickone(transactionsType),
            method: chance.pickone(methods),
            amount: chance.floating({ min: 200, max: 3000 }),
        });
    });
    let createHistories = await History.insertMany(historiesList);
    console.log(createHistories);
};

const run = async () => {
    console.log('Seeding USER DB ============');
    await createUsers();
    console.log('Seeding Account DB ============');
    await createAccounts();
    console.log('Seeding History DB ============');
    await createHistories();
    db.close();
};

run();