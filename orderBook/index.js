const axios = require('axios').default;
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const { askEngine } = require("./orderBookEngine/askEngine.js");
const { bidEngine } = require("./orderBookEngine/bidEngine.js");
const { axiosGet } = require("./functions/test.js");

const headers = { "Content-Type": "application/json" };

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//test

app.get('/test', async (req, res) => {
    try {
        res.status(200).json("test works")
    } catch (error) {
        return res.status(500).json(error);
    }
});



// get any active order filtered by ClientID
app.get(`/transaction/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const trans = await axios.get(`http://jsonserver:3004/orderbook?ClientID=${id}&Status=pending&Status=partial`,{}, headers);
            const resulsts = trans.data;
            return res.status(200).json(resulsts);
        } else {
            return res.status(400).json("id is missing");
        }
    } catch (error) {
        return res.status(500).json("some thing goes wronge");
    }
});

// get all fulfilled orders 
app.get('/fulfilled', async (req, res) => {
    try {
        const filled = await axios.get(`http://jsonserver:3004/orderbook?Status=fulfilled`,{}, headers);
        return res.status(200).json(filled.data);

    } catch (error) {
        return res.status(500).json("some thing goes wronge");
    }
    
});

// get active asks filtered by currency
app.get(`/ask/:currency`, async (req, res) => {
    try {
        const { currency } = req.params;
        if (currency) {
        let currencyTranform = currency.split("-").join("/")
        //const ask = axiosGet(`http://jsonserver:3004/orderbook?Side=ASK&Status=pending&Status=partial&Pair=${currencyTranform}`,{}, headers)
        const ask = await axios.get(`http://jsonserver:3004/orderbook?Side=ASK&Status=pending&Status=partial&Pair=${currencyTranform}`, {}, headers);
        if(ask?.data.length > 0){
        let data = ask?.data.sort((a, b) => a.Price - b.Price);
        const resulsts = data?.reduce((arr, curr) => {
            let itemIndex = arr.findIndex(item => item.Price === curr.Price);
            if(itemIndex !== -1) {
              arr[itemIndex] = {
                  Price: curr.Price,
                Quantity: parseFloat(arr[itemIndex].Quantity) + parseFloat(curr.Quantity),
                Orders: (arr[itemIndex].orders || 1) + 1
              }
            } else {
              arr = arr.concat({
                  Price: curr.Price,
                Quantity: parseFloat(curr.Quantity),
                Orders: 1
              })
            }
            return arr.sort((a, b) => a.Price - b.Price);
        }, []);
        }
        return res.status(200).json(resulsts);
    } else {
        return res.status(400).json("provide currency please");
    }
    } catch (error) {
        return res.status(500).json(error);
    }
    

});

// get active bids filtered by currency
app.get(`/bid/:currency`, async (req, res) => {
    try {
        const { currency } = req.params;
        if (currency) { 
            let currencyTranform = currency.split("-").join("/");
            //const bid = axiosGet(`http://jsonserver:3004/orderbook?Side=BID&Status=pending&Status=partial&Pair=${currencyTranform}`,{}, headers)
            const bid = await axios.get(`http://jsonserver:3004/orderbook?Side=BID&Status=pending&Status=partial&Pair=${currencyTranform}`, {}, headers);
            if (bid?.data.length > 0) {
                let data = bid?.data?.sort((a, b) => b.Price - a.Price);
                const resulsts = data?.reduce((arr, curr) => {
                    let itemIndex = arr.findIndex(item => item.Price === curr.Price);
                    if(itemIndex !== -1) {
                      arr[itemIndex] = {
                          Price: curr.Price,
                        Quantity: parseFloat(arr[itemIndex].Quantity) + parseFloat(curr.Quantity),
                        Orders: (arr[itemIndex].orders || 1) + 1
                      }
                    } else {
                      arr = arr.concat({
                          Price: curr.Price,
                        Quantity: parseFloat(curr.Quantity),
                        Orders: 1
                      })
                    }
                    return arr.sort((a, b) => b.Price - a.Price);
                }, []);
                return res.status(200).json(resulsts); 
            } else {
                return res.status(500).json("srver errro");  
            }
        } else {
            return res.status(400).json("provide currency please");
        } 
    } catch (error) {
        return res.status(500).json(error);
    }


});

// get trades by id ot all trades
app.get(`/trades`, async (req, res) => {
    try {
        const { ralatedid, currency, ClientID } = req.query;
        if (ralatedid && currency) {
            const result = await axios.get(`http://jsonserver:3004/trades?related=${ralatedid}&currency=${currency}`,{}, headers);
            return res.status(200).json(result.data);
        } else if(currency && !ClientID && !ralatedid){
            const result = await axios.get(`http://jsonserver:3004/trades?currency=${currency}`,{}, headers);
            return res.status(200).json(result.data);
        } else if (ClientID && !currency && !ralatedid) {
            const result = await axios.get(`http://jsonserver:3004/trades?ClientID=${ClientID}`,{}, headers);
            return res.status(200).json(result.data);
        }
        const result = await axios.get(`http://jsonserver:3004/trades`,{}, headers);
        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json(error);
    }

});

// preform trade buy or sell 
app.post(`/trade`, async (req, res) => {
    try {
        const { ClientID, currency, quantity, price, side } = req.body; 
        const Status = "pending";
        const Updated = 0;
        if (ClientID && currency && quantity && price && side) {
            const result = await axios.post(`http://jsonserver:3004/orderbook`,
            { ClientID, Side: side, Pair: currency, Quantity: quantity, OriginalQuantity: quantity,Price: price, Status, Updated, time: Date.now() }, headers);
            if (side === "ASK" && result.data.ClientID === ClientID) {
                askEngine();
                return res.status(200).json(result.data);
            } else if (side === "BID" && result.data.ClientID === ClientID) {
                bidEngine();
                return res.status(200).json(result.data);
            }
        } else {
            return res.status(400).json("one of elements is missing");
        }
    } catch (error) {
        return res.status(500).json(error);
    }

});

// to cancel order
app.post(`/cancel`, async (req, res) => {
    try {
        const {ClientID, id} = req.body;
        if (ClientID && id) {
            //check if we have this order in queue
            const result = await axios.get(`http://jsonserver:3004/orderbook?ClientID=${ClientID}&id=${id}&Status=pending&Status=partial`,{}, headers);
            const trade = result.data;
            if (trade[0]) {
                let currency = trade[0].Side === "BID" ? trade[0].Pair.split("/")[1] : trade[0].Pair.split("/")[0];
                let amount = trade[0].Quantity;
                //performing the cancel
                const toCancel = await axios.patch(`http://jsonserver:3004/orderbook/${id}`, { Status: "cancel" }, headers);
                //i need also update our dataBase so i send signal to our server
                const updateInternalRoutes = await axios.post(`http://api:3003/v1/int/cancel`, { ClientID, id, currency, amount });
                if (toCancel && updateInternalRoutes) {
                    return res.status(200).json(toCancel.data.id);
                } else {
                    return res.status(400).json("from some reason cannot cancel this order please contact support");
                }
                
            } else {
                return res.status(400).json("not such order");
            }
        } else {
            return res.status(400).json("one of elements is missing");
        }
    } catch (error) {
        return res.status(500).json(error);
    }

});


app.listen(port, () => {
    console.log(`OrderBook Service listening on port ${port}`)
});