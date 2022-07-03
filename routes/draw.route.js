const express = require('express');
const router = express.Router();
const { getGrandDrawResultByDate, createGrandDraw } = require('../controllers/draw.controller');

// getting all the data
router.post("/get-grand-result", getGrandDrawResultByDate);
router.post("/create-grand-draw", createGrandDraw);

module.exports = router;
