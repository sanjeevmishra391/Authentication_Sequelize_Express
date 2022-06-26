const express = require('express');
const router = express.Router();
const { getUserId } = require('../controllers/user.controller');
const {authenticateToken} = require("../middlewares/index.middleware");

// getting all the data
router.get("/:id", authenticateToken, getUserId);

module.exports = router;
