// dont sent directly requests to this routes
const express = require('express');
const router = express.Router();
const db = require("../dbConfig.js");
const { authenticateToken } = require("../functions/auth.js");
;
const { checkBalance } = require('../functions/checkBalance');
// internal updates between the json server and sql
//amount is the amount that will be selled and new amount this is amount of new coin you will recieve 
router.post('/bid', (req, res) => {
    try {
        const { ClientID, RelatedID, Pair, sellCoin, amount, price, newAmount } = req.body; 
        if (ClientID && RelatedID && Pair && sellCoin && amount && price && newAmount) {
            let buyCoin = Pair.split("/")[0];
            let q = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt) 
            VALUES ('${ClientID}', '${RelatedID}', 'orderBookOut', '${sellCoin}','${amount}','${price}',now());
            INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt)
            VALUES ('${ClientID}', '${RelatedID}', 'sell', '${sellCoin}','${amount}','${price}',now());
            INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt)
            VALUES ('${ClientID}', '${RelatedID}', 'buy', '${buyCoin}','${newAmount}','${price}',now());`;
            db.query(q, function (error, results, fields) {
                if (error) throw error;
            });
        } else {
            console.log("one of the argumnents is missing");
        }
    } catch (error) {
        throw error;
    }
});

router.post('/ask', (req, res) => {
    try {
        const { ClientID, RelatedID, Pair, sellCoin, amount, price, newAmount } = req.body;
        if (ClientID && RelatedID && Pair && sellCoin && amount && price && newAmount) {
            let buyCoin = Pair.split("/")[1];
            let q = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt) 
            VALUES ('${ClientID}', '${RelatedID.toString()}', 'orderBookOut', '${sellCoin}','${amount}','${price}',now());
            INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt)
            VALUES ('${ClientID}', '${RelatedID.toString()}', 'sell', '${sellCoin}','${amount}','${price}',now());
            INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt)
            VALUES ('${ClientID}', '${RelatedID.toString()}', 'buy', '${buyCoin}','${newAmount}','${price}',now());`;
            db.query(q, function (error, results, fields) {
                if (error) throw error;
            });
        } else {
            console.log("one of the argumnents is missing");
        }
    } catch (error) {
        throw error;
    }
});

router.post('/cancel', (req, res) => {
    try {
        const { id, ClientID, currency, amount } = req.body;
        let q = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt) 
        VALUES('${ClientID}', '${id.toString()}','orderBookOut', '${currency}', '${amount}', '${0}',now())`;
        if (id && ClientID && currency && amount) {   
        db.query(q, function (error, results, fields) {
            if (error) return res.status(404).json(error);
        });
            return res.status(200).json();
        } else {
            console.log("one of the argumnents is missing");
        }
    } catch (error) {
        return res.status(500).json(error)
    }

});


module.exports = router;