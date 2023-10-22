const express = require('express');
const router = express.Router();
const db = require("../dbConfig.js");
const {authenticateToken} = require('../functions/auth');

//create new user
router.post(`/newuser`, async (req, res) => {
    let { firstName, lastName, email, password, country_residency, country_living, phone } = req.body;
    //check if user exist 
    let q = "SELECT * FROM users WHERE email=?";
    db.query(q, [email], (err, rows, fields) => {
        if (err) return res.status(500).json(err);
        if (rows.length) return res.status(409).json("User Already Exist");
        //if user not exist creates new user
        db.query(`INSERT INTO users (uniqID, firstName, lastName, email, country_residency, country_living, password,phone,type_account,status_account)
        VALUES (UUID(),'${firstName}','${lastName}','${email}','${country_residency}','${country_living}','${password}' , '${phone}', 'user-personal', 'pending')`
            , (err, rows, fields) => {
                if (err) return res.status(500).json({ "created": false, err });
            
                res.status(200).json({
                    "created": true,
                    "UserCreated": {
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": email,
                        "country_residency": country_residency,
                        "country_living": country_living,
                        "password": password,
                        "phone": phone,
                        "time": Date.now()
                    },
                });
            });
    });
});


// Get All Users
router.get('/', authenticateToken, async (req, res) => {
    let q = "SELECT * FROM users";
    db.query(q, (err, rows, fields) => {
        if(err) return res.status(500).json(err);
        const results = rows.map((row) => {
            return {
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                country_residency: row.country_residency,
                country_living: row.country_living,
                password: row.password,
                phone: row.phone
            }
        })
        return res.status(200).json(results);
    })
});

//fetch data by user

router.post('/fetch', authenticateToken, async (req, res) => {
    let q = `SELECT * FROM users WHERE uniqID = '${req.user.id}'`;
    db.query(q, (err, rows, fields) => {
        if (err) return res.status(500).json(err);
        const results = rows.map((row) => {
            return {
                id: row.uniqID,
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                country_residency: row.country_residency,
                country_living: row.country_living,
                password: row.password,
                phone: row.phone
            }
        })
        return res.status(200).json(results);
    })
});

module.exports = router