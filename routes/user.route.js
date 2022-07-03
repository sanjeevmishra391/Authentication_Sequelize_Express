const express = require('express');
const router = express.Router();
const { 
    getUser, deleteUser, 
    addAddress, updateAddress, getAllAddresses, deleteAddress, 
    getBalance } = require('../controllers/user.controller');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();
const verify = require('../utils/verifyToken.util');

// getting all the data
router.get("/", verify, getUser);
router.get("/delete", ensureLoggedIn, deleteUser);

router.get("/get_all_addresses", ensureLoggedIn, getAllAddresses);
router.post("/add_address", ensureLoggedIn, addAddress);
router.post("/update_address", ensureLoggedIn, updateAddress);
router.delete("/delete_address", ensureLoggedIn, deleteAddress);

router.get("/get_balance", ensureLoggedIn, getBalance);

module.exports = router;
