const express = require('express');
const router = express.Router();
const db = require("../dbConfig.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { authenticateToken } = require("../functions/auth.js");

// login route
router.post("/login", (req,res) => { 
    const {email , password} = req.body;
    try{
        if (!email || !password || email === 'undefined' || password === 'undefined') {
            return res.status(403).json({"massage":"some thing wrong"});
        }
        let q = "SELECT * FROM users WHERE email=?";
        db.query(q, [email],function(error, results, fields){
            if(error) return res.status(403).json({"massage":"some thing wrong"});
            if(password === results[0].password) {
                const token = jwt.sign({"email":email, "id": results[0].uniqID, "indexID":results[0].Coin_Index}, process.env.SECRET_TOKEN, {expiresIn: '1d'});
                return res.status(200).json({"token": token})
                
            }else{
                return res.status(403).json({"massage":"some thing wrong"});
            }
        });
    }
    catch(err) {
        return res.status(403).json({"massage":"some thing wrong"});
    }
});

router.post('/', authenticateToken, (req, res) => {
    return res.status(200).json(true);
});

router.get('/', authenticateToken, (req, res) => {
    return res.status(200).json(true);
});


module.exports = router;