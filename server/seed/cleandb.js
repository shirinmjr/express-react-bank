const db = require('../db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const { User, Account, History } = require('../models');

const run = async () => {
    let userClean = await User.deleteMany();
    let accountClean = await Account.deleteMany();
    let historyClean = await History.deleteMany();
    console.log(userClean, accountClean, historyClean);
    db.close();
};

run();