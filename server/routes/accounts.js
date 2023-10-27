const express = require('express');
const router = express.Router();
const db = require("../dbConfig.js");
const util = require('util');
const { authenticateToken } = require("../functions/auth.js");
const axios = require("axios").default;
const { checkBalance } = require('../functions/checkBalance');
const query = util.promisify(db.query).bind(db);
// fetch price for spesipic pair 
const getPrice = async (cryptoCoin, stableCoin) => {
    try {
        const res = await axios.get(`https://www.binance.com/api/v3/ticker/price?symbols=["${cryptoCoin.toUpperCase()}${stableCoin.toUpperCase()}"]`);
        return res.data[0].price;
    } catch (error) {
        console.log(error);
    }
    
};

//this route return balances for all coins together
router.get('/avlbalances', authenticateToken, (req, res) => {
    try {
        const { id } = req.user;
        let q = `select Currency, available('${id}', Currency) as avl
        from orders
        where Client_ID = '${id}'
        GROUP BY Currency`;
        db.query(q, function (error, results, fields) {
            if (error) res.status(400).json("something wrong");
            return res.status(200).json(results);
        }); 
    } catch (error) {
        return res.status(500).json(error);
    }
});

//this route return balances for all coins together
router.get('/balances', authenticateToken, (req, res) => {
    try {
        const { id } = req.user;
        let q = `select Currency, balance('${id}', Currency) as balances
        from orders
        where Client_ID = '${id}'
        GROUP BY Currency`;
        db.query(q, function (error, results, fields) {
            if (error) res.status(400).json("something wrong");
            return res.status(200).json(results);
        }); 
    } catch (error) {
        return res.status(500).json(error);
    }
});

//this route is return the balance for specipic coin
router.get('/:currency', authenticateToken, (req, res) => {
    const { currency } = req.params;
    const { id } = req.user;

    let q =  `select balance('${id}', '${currency.toLocaleUpperCase()}') as balance`;
    db.query(q, function (error, results, fields) {
        if (error) return res.status(400).json('bad request');
        const balance = results[0].balance;
        return res.status(200).json([balance]);
    });
    return;
});

router.get('/avbalance/:currency', authenticateToken, (req, res) => {
    const { currency } = req.params;
    const { id } = req.user;
    let q = `select available('${id}', '${currency.toLocaleUpperCase()}') as avl`;
    db.query(q, function (error, results, fields) {
        if (error) return res.status(400).json('bad request');
        const avl = results[0].avl;
        return res.status(200).json([avl]);
    });
});

//buy route for market order
router.post(`/transaction/buy`, authenticateToken ,checkBalance ,async (req, res) => {
    const { id } = req.user;
    const { buyCoin, sellCoin, amount } = req.body;
    const orderid = Math.floor(Math.random() * 100000000).toString();
    let price = await getPrice(buyCoin, sellCoin);
    const amountToFloat = parseFloat(amount);
    const newAmount = amountToFloat / price;
    //for understanding porpuses i wrote to sparated filled for more clearty
    let qbuyCoin = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt) 
    VALUES ('${id}', '${orderid}', 'buy', '${buyCoin}','${newAmount}','${price}',now())`;
    let qsellCoin = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt) 
    VALUES ('${id}', '${orderid}', 'sell', '${sellCoin}','${amount}','${price}',now())`;
    let q = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt) 
    VALUES ('${id}', '${orderid}', 'buy', '${buyCoin}','${newAmount}','${price}',now());INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt) 
    VALUES ('${id}', '${orderid}', 'sell', '${sellCoin}','${amountToFloat}','${price}',now())`
    const results = await query(qbuyCoin);
    if (results) {
        await query(qsellCoin).then(e => {
            if (e) {
                return res.status(200).json('done');
            } else {
                return res.status(400).json('Bad Request');
            }
            
        });
    } else {
        return res.status(400).json('Bad Request');
    }

});

//sell route for market order
router.post(`/transaction/sell`,authenticateToken , checkBalance , async (req, res) => {
    const { id } = req.user;
    const { buyCoin, sellCoin, amount } = req.body;
    const orderid = Math.floor(Math.random() * 100000000).toString();
    let price = await getPrice(sellCoin, buyCoin);
    const amountToFloat = parseFloat(amount);
    const newAmount = amountToFloat * price;
    //for understanding porpuses i wrote to sparated filled for more clearty
    let qbuyCoin = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt) 
    VALUES ('${id}', '${orderid}', 'buy', '${buyCoin}','${newAmount}','${price}',now())`;
    let qsellCoin = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price, CreatedAt) 
    VALUES ('${id}', '${orderid}', 'sell', '${sellCoin}','${amountToFloat}','${price}',now())`;

    const results = await query(qsellCoin);
    if (results) {
        await query(qbuyCoin).then(e => {
            if (e) {
                return res.status(200).json('done');
            } else {
                return res.status(400).json('Bad Request');
            }
            
        });
    } else {
        return res.status(400).json('Bad Request');
    }
});

// porpus of this route is to send buy order to json server and update dataBase
// provide (currency means to pair , amount to buy, price to buy, sell coin for check balance function to check if you have enough amount)
router.post(`/transaction/limitbuy`, authenticateToken, checkBalance, async (req, res) => {
    try {
        const { id } = req.user;
        const side = 'BID';
        const { currency, sellAmount, price, sellCoin } = req.body;
        if (currency && sellAmount && price) {
            const results = await axios.post(`orderbook/trade`, { ClientID: id, side, currency, quantity: sellAmount, price });
            if (results.data) {
                //this part is update the database about the buy order
                let q = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt)
                VALUES ('${id}', '${results.data.id}', 'orderBookIn', '${sellCoin}','${results.data.OriginalQuantity}','${results.data.Price}',now())`;
                db.query(q, function (error, results, fields) {
                    if (error) return res.status(400).json(error);
                });
                return res.status(200).json(results.data)
            } else {
                return res.status(400).json("some thing goes wronge");
            }
        } else {
            return res.status(400).json("some thing missing");
        }
    } catch (error) {
        return res.status(500).json(error)
    }
});

router.post(`/transaction/limitsell`, authenticateToken, checkBalance, async (req, res) => {
    try {
        const { id } = req.user;
        const side = 'ASK';
        const { currency, sellAmount, price, sellCoin } = req.body;
        if (currency && sellAmount && price) {
            let newCurrency = currency.split("/");
            const results = await axios.post(`orderbook/trade`, { ClientID: id, side, currency, quantity: sellAmount, price });
            if (results.data) {
                //this part is update the database about the buy order
                let q = `INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt)
                VALUES ('${id}', '${results.data.id}', 'orderBookIn', '${newCurrency[0]}','${results.data.OriginalQuantity}','${results.data.Price}',now())`;
                db.query(q, function (error, results, fields) {
                    if (error) return res.status(400).json(error);
                });
                return res.status(200).json(results.data)
            } else {
                return res.status(400).json("some thing goes wronge");
            }
        } else {
            return res.status(400).json("some thing missing");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/transaction/withdraw', authenticateToken, checkBalance, async (req, res) => {
    try {
        const { id } = req.user;
        const currency = req.body.sellCoin;
        const amount = req.body.amount;
        const status = 'pending';
        if (currency && amount) {
            let q = `INSERT INTO withrawals (Client_id, Currency, Amount, Status) VALUES ('${id}', '${currency}', '${amount}', '${status}')`;
            db.query(q, function (error, results, fields) {
                if (error) return res.status(400).json(error);
                return res.status(200).json({id,currency,amount});
            });
        }
    } catch (error) {
        return res.status(400).json(error);
    }

});



module.exports = router;