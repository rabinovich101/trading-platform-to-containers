const axios = require('axios').default;

const bidEngine = async () => {
    const tradesASK = await axios.get(`${process.env.LOCALHOST_3004}/orderbook?Side=ASK&Status=pending&Status=partial&_sort=Price,id&_order=asc`);
    const resASK = tradesASK.data;
    const tradesBID = await axios.get(`${process.env.LOCALHOST_3004}/orderbook?Side=BID&Status=pending&Status=partial&_sort=Price,id&_order=desc`);
    const resBID = tradesBID.data;
    let lastEntery = resBID[0];
    if (resBID.length > 0) {
    for (let tradeASK  of resASK) {
        if (lastEntery.Pair === tradeASK.Pair) {
            if (lastEntery.Price >= tradeASK.Price) {
                let q = parseFloat(tradeASK.Quantity - lastEntery.Quantity / tradeASK.Price);
                let tAskQ = tradeASK.Quantity;
                let tBidQ = lastEntery.Quantity;
                if (q === 0) { 
                    try {
                        //if swap is happen we must to initail quaninty to 0 for both clients and update to fulfilled
                        lastEntery.Quantity = 0;
                        lastEntery.Status = "fulfilled";
                        tradeASK.Quantity = 0;
                        tradeASK.Status = "fulfilled";
                        //update json order book with currect data 
                        axios.all([
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${lastEntery.id}`, { Quantity: lastEntery.Quantity, Status: lastEntery.Status }),
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${tradeASK.id}`, { Quantity: tradeASK.Quantity, Status: tradeASK.Status })
                        ]);
                        // update trades thats happens after swap occures
                        axios.all([
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: lastEntery.ClientID, related:lastEntery.id,Pair: lastEntery.Pair,currency: lastEntery.Pair.split("/")[0],price: tradeASK.Price,amount: tAskQ , time: Date.now()}),
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: tradeASK.ClientID, related: tradeASK.id,Pair: lastEntery.Pair, currency: lastEntery.Pair.split("/")[1],price: tradeASK.Price,amount: tBidQ, time: Date.now() })
                        ]);
                        // update platform routes about new data
                        axios.all([
                            axios.post(`api/v1/int/bid`,
                                { ClientID: lastEntery.ClientID, RelatedID: lastEntery.id, Pair: lastEntery.Pair, sellCoin: lastEntery.Pair.split("/")[1], amount: tBidQ, price: tradeASK.Price, newAmount: tAskQ }),
                            axios.post(`api/v1/int/ask`,
                                { ClientID: tradeASK.ClientID, RelatedID: tradeASK.id, Pair: tradeASK.Pair, sellCoin: tradeASK.Pair.split("/")[0], amount: tAskQ, price: tradeASK.Price, newAmount: tBidQ })
                        ]);
                    } catch (error) {
                        throw error;
                    }
                } else if (q < 0) {
                    try {
                        lastEntery.Quantity = (-1) * q * tradeASK.Price;
                        lastEntery.Status = "partial";
                        tradeASK.Quantity = 0;
                        tradeASK.Status = "fulfilled";
                        //update json order book with currect data
                        axios.all([
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${lastEntery.id}`, { Quantity: lastEntery.Quantity, Status: lastEntery.Status }),
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${tradeASK.id}`, { Quantity: tradeASK.Quantity, Status: tradeASK.Status })
                        ]);
                        // update trades thats happens after swap occures
                        axios.all([
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: lastEntery.ClientID, related: lastEntery.id, currency: lastEntery.Pair.split("/")[0],price: tradeASK.Price ,amount: tAskQ, time: Date.now()}),
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: tradeASK.ClientID, related: tradeASK.id, currency: lastEntery.Pair.split("/")[1],price: tradeASK.Price ,amount: tAskQ * tradeASK.Price, time: Date.now() })
                        ]);
                        // update platform routes about new data
                        axios.all([
                            axios.post(`api/v1/int/ask`,
                                { ClientID: tradeASK.ClientID, RelatedID: tradeASK.id, Pair: tradeASK.Pair, sellCoin: tradeASK.Pair.split("/")[0], amount: tAskQ, price: tradeASK.Price, newAmount: tAskQ * tradeASK.Price }),
                            axios.post(`api/v1/int/bid`,
                                {ClientID: lastEntery.ClientID, RelatedID: lastEntery.id, Pair: lastEntery.Pair, sellCoin: lastEntery.Pair.split("/")[1], amount: tAskQ * tradeASK.Price, price: tradeASK.Price, newAmount: tAskQ})
                        ]);
                    } catch (error) {
                        throw error;
                    }
                } else if (lastEntery.Quantity > q && q > 0) {
                    try {
                        lastEntery.Quantity = 0;
                        lastEntery.Status = "fulfilled";
                        tradeASK.Quantity = q;
                        tradeASK.Status = "partial";
                        //update json order book with currect data
                        axios.all([
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${lastEntery.id}`, { Quantity: lastEntery.Quantity, Status: lastEntery.Status }),
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${tradeASK.id}`, { Quantity: tradeASK.Quantity, Status: tradeASK.Status })
                        ]);
                        // update trades thats happens after swap occures
                        axios.all([
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: lastEntery.ClientID, related: lastEntery.id, currency: lastEntery.Pair.split("/")[0],price: tradeASK.Price ,amount: tBidQ/tradeASK.Price , time: Date.now()}),
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: tradeASK.ClientID, related: tradeASK.id, currency: lastEntery.Pair.split("/")[1],price: tradeASK.Price ,amount: tBidQ, time: Date.now() })
                        ]);
                        // update platform routes about new data
                        axios.all([
                        axios.post(`api/v1/int/ask`,
                            { ClientID: tradeASK.ClientID, RelatedID: tradeASK.id, Pair: tradeASK.Pair, sellCoin: tradeASK.Pair.split("/")[0], amount: tBidQ/tradeASK.Price, price: tradeASK.Price, newAmount: tBidQ }),
                        axios.post(`api/v1/int/bid`,
                            {ClientID: lastEntery.ClientID, RelatedID: lastEntery.id, Pair: lastEntery.Pair, sellCoin: lastEntery.Pair.split("/")[1], amount: tBidQ, price: tradeASK.Price, newAmount: tBidQ / tradeASK.Price})
                        ]);
                    } catch (error) {
                        throw error;
                    }
                }

            }
        }
        }
    }
};


module.exports = {
    bidEngine: bidEngine
}