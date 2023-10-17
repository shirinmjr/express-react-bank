const mongoose = require('mongoose');
const UserSchema = require('./user');
const AccountSchema = require('./account');
const HistorySchema = require('./history');

const User = mongoose.model('Actor', UserSchema);
const Account = mongoose.model('Review', AccountSchema);
const History = mongoose.model('Movie', HistorySchema);

module.exports = {
    User,
    Account,
    History
};