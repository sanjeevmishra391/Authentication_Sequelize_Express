const express = require('express');
const router = express.Router();
const { login, signUp, verifyUser } = require('../controllers/auth.controller');

router.post("/login", login);
router.post("/signup", signUp);
router.get("/verify/:email/:token", verifyUser);


module.exports = router;