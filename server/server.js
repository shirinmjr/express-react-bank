const express = require("express");
const db = require('./db');
const cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const bankController = require('./controllers/bankController');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send({ msg: "This is root!" }));
//app.get("/users", bankController.getAllUsers);//get all users
//app.post('/users', bankController.createUser);//create a new user

app.get("/accounts", bankController.getAllAccounts);//get all accounts
app.get('/accounts/:id', bankController.getOneAccount);//get one account info
app.post('/accounts/', bankController.createBankAccount);//create a new account
app.put('/accounts/:id', bankController.updateOneAccount);//update balance deposit/withdraw
app.delete('/accounts/:id', bankController.deleteOneAccount);//delete one account

app.get("/histories", bankController.getAllHistory);//get one history
app.get("/histories/:id", bankController.getOneHistoryByAccountId);//get one history

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));