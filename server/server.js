const express = require("express");
const db = require('./db');
const cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const movieController = require('./controllers/movieController');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("This is root!"));
app.get("/users", bankController.getAllUsers);//get all users
app.post('/users', bankController.createUser);//create a new user
app.get("/accounts", bankController.getAllAccounts);//get all accounts
app.post('/accounts', bankController.createUser);//create a new account
app.get("/history", bankController.getAllHistory);//get all histories
app.post('/history', bankController.createHistory);//create a new history