const mongoose = require('mongoose');
const UserSchema = require('./user');
const AccountSchema = require('./account');
const HistorySchema = require('./history');

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);
const History = mongoose.model('History', HistorySchema);

module.exports = {
    User,
    Account,
    History
};