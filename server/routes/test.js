const express = require('express');
const router = express.Router();
const db = require("../dbConfig.js");
const { authenticateToken } = require("../functions/auth.js");
const axios = require("axios").default;
const { checkBalance } = require('../functions/checkBalance');


router.get('/', (req,res) => {
    res.status(200).json("works");
})

module.exports = router;