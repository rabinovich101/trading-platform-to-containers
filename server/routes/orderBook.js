const express = require('express');
const router = express.Router();
const axios = require("axios").default;
const { authenticateToken } = require("../functions/auth.js");

//test

router.get('/test', async (req, res) => {
  try {
      const test = await axios.get(`http://orderbook:3010/test`);
      if (test?.data) return res.status(200).json(test.data);
  } catch (error) {
      console.log(error);
  }  
});

router.get('/tradesbyid', authenticateToken, async (req, res) => {
    try {
        const ClientID = req.user.id;
        if (ClientID) {
            const trades = await axios.get(`http://orderbook:3010/trades?ClientID=${ClientID}`);
            return res.status(200).json(trades.data);
        }
    } catch (error) {
        return res.status(400).json(error)
    }
});

// get final trades
router.get('/trades', async (req, res) => {
    try {
        const { relatedId, currency} = req.query;
        if (relatedId && currency) {
            const trades = await axios.get(`http://orderbook:3010/trades?ralatedid=${relatedId}&currency=${currency}`);
            return res.status(200).json(trades.data);
        } else if (currency) {
            const trades = await axios.get(`http://orderbook:3010/trades?currency=${currency}`);
            return res.status(200).json(trades.data);
        } 
        const trades = await axios.get(`http://orderbook:3010/trades`);
        return res.status(200).json(trades.data);
    }
    catch (error) {
        return res.status(400).json(error)
    }
});
//get asks by currency
router.get('/ask', async (req, res) => {
    try {
        const { currency } = req.query;
        if (currency) {
            const ask = await axios.get(`http://orderbook:3010/ask/${currency}`);
            if (ask.data) {
                return res.status(200).json(ask.data);
            } else {
                return res.status(400).json("error happen")
            }
        };
    }
    catch (error) {
        return res.status(400).json(error)
    }

});

//get bids by currency
router.get('/bid', async (req, res) => {
    try {
        const { currency } = req.query;
        if (currency) {
            const bid = await axios.get(`http://orderbook:3010/bid/${currency}`);
            if (bid.data) {
                return res.status(200).json(bid.data);
            } else {
                return res.status(400).json("error happen")
            }
        };
    }
    catch (error) {
        return res.status(400).json(error)
    }

});

//get active orders by id
router.get(`/transaction`, authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const orders = await axios.get(`http://orderbook:3010/transaction/${id}`,{});
        const results = orders.data;
        if (results) {
            return res.status(200).json(results);
        } else {
            console.log("error")
            return res.status(400).json("error")
        }
    } catch (error) {
        return res.status(400).json(error)
    }
});

//cancel order rout, send signal if you want cancel an existing order 
router.post('/cancel', authenticateToken, async (req, res) => {
    try {
        const ClientID = req.user.id;
        const { id } = req.body;
        if (ClientID && id) {
            const result = await axios.post(`http://orderbook:3010/cancel`, { ClientID :ClientID, id: id });
            const request = result.data;
            if (request) {
                return res.status(200).json(request);
            } else {
                return res.status(400).json("for some reason cannot cancel the request");
            }
        }
        else {
            return res.status(400).json("one of arguments is missing");
        }
    } catch (error) {
        
    }
})

module.exports = router;