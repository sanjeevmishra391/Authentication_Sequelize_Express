const express = require('express');
const router = express.Router();
const { isAuthenticated, login, signUp, verifyUser, sendResetLink, verifyPasswordReset, changePassword } = require('../controllers/auth.controller');

router.get("/check-authentication", isAuthenticated);
router.post("/login",  login);
router.post("/signup", signUp);
router.get("/verify/:email/:token", verifyUser);
router.post("/password_reset", sendResetLink);
router.get("/verify_password_reset/:token", verifyPasswordReset)
router.post("/change_password", changePassword);

module.exports = router;