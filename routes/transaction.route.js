const express = require('express');
const router = express.Router();
const { depositMoneyToWallet } = require('../controllers/transaction.controller');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();

router.post("/deposit-money-to-wallet", ensureLoggedIn, depositMoneyToWallet);

module.exports = router;