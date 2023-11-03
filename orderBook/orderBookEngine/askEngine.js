const axios = require('axios').default;

const askEngine = async () => {
    const tradesASK = await axios.get(`${process.env.LOCALHOST_3004}/orderbook?Side=ASK&Status=pending&Status=partial&_sort=Price,id&_order=asc`);
    const resASK = tradesASK.data;
    const tradesBID = await axios.get(`${process.env.LOCALHOST_3004}/orderbook?Side=BID&Status=pending&Status=partial&_sort=Price,id&_order=desc`);
    const resBID = tradesBID.data;
    let lastEntery = resASK[0];
    if (resASK.length > 0) {
    for (let tradeBID  of resBID) {
        if (lastEntery.Pair === tradeBID.Pair) {
            if (lastEntery.Price <= tradeBID.Price) {
                let q = parseFloat(lastEntery.Quantity - tradeBID.Quantity / tradeBID.Price);
                let tAskQ = lastEntery.Quantity;
                let tBidQ = tradeBID.Quantity;
                if (q === 0) { 
                    try {
                        //if swap is happen we must to initail quaninty to 0 for both clients and update to fulfilled
                        lastEntery.Quantity = 0;
                        lastEntery.Status = "fulfilled";
                        tradeBID.Quantity = 0;
                        tradeBID.Status = "fulfilled";
                        //update json order book with currect data
                        axios.all([
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${lastEntery.id}`, { Quantity: lastEntery.Quantity, Status: lastEntery.Status }),
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${tradeBID.id}`, { Quantity: tradeBID.Quantity, Status: tradeBID.Status })
                        ]);
                        // update trades thats happens after swap occures
                        axios.all([
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: lastEntery.ClientID, related:lastEntery.id , Pair: lastEntery.Pair,currency: lastEntery.Pair.split("/")[1],price: tradeBID.Price, amount: tBidQ , time: Date.now()}),
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: tradeBID.ClientID, related: tradeBID.id, Pair: lastEntery.Pair,currency: lastEntery.Pair.split("/")[0],price: tradeBID.Price, amount: tAskQ, time: Date.now() })
                        ]);
                        // update platform routes about new data 
                        axios.all([
                            axios.post(`api/v1/int/ask`,
                                { ClientID: lastEntery.ClientID, RelatedID: lastEntery.id, Pair: lastEntery.Pair, sellCoin: lastEntery.Pair.split("/")[0], amount: tAskQ, price: lastEntery.Price, newAmount: tBidQ }),
                            axios.post(`api/v1/int/bid`,
                                { ClientID: tradeBID.ClientID, RelatedID: tradeBID.id, Pair: tradeBID.Pair, sellCoin: tradeBID.Pair.split("/")[1], amount: tBidQ, price: tradeBID.Price, newAmount: tAskQ })
                        ]);
                    } catch (error) {
                        throw error;
                    }
                } else if (q < 0) {
                    try {
                        lastEntery.Quantity = 0;
                        lastEntery.Status = "fulfilled";
                        tradeBID.Quantity = (-1) * q * tradeBID.Price;
                        tradeBID.Status = "partial";
                        //update json order book with currect data
                        axios.all([
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${lastEntery.id}`, { Quantity: lastEntery.Quantity, Status: lastEntery.Status }),
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${tradeBID.id}`, { Quantity: tradeBID.Quantity, Status: tradeBID.Status })
                        ]);
                        // update trades thats happens after swap occures
                        axios.all([
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: lastEntery.ClientID, related: lastEntery.id, currency: lastEntery.Pair.split("/")[1], price: tradeBID.Price,amount: tAskQ * tradeBID.Price, time: Date.now()}),
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: tradeBID.ClientID, related: tradeBID.id, currency: lastEntery.Pair.split("/")[0],price: tradeBID.Price, amount: tAskQ, time: Date.now() })
                        ]);
                        // update platform routes about new data
                        axios.all([
                            axios.post(`api/v1/int/ask`,
                                { ClientID: lastEntery.ClientID, RelatedID: lastEntery.id, Pair: lastEntery.Pair, sellCoin: lastEntery.Pair.split("/")[0], amount: tAskQ, price: tradeBID.Price, newAmount: tAskQ * tradeBID.Price }),
                            axios.post(`api/v1/int/bid`,
                                {ClientID: tradeBID.ClientID, RelatedID: tradeBID.id, Pair: tradeBID.Pair, sellCoin: tradeBID.Pair.split("/")[1], amount: tAskQ * tradeBID.Price, price: tradeBID.Price, newAmount: tAskQ})
                        ]);
                    } catch (error) {
                        throw error;
                    }
                } else if (lastEntery.Quantity > q && q > 0) {
                    try {
                        lastEntery.Quantity = q;
                        lastEntery.Status = "partial";
                        tradeBID.Quantity = 0;
                        tradeBID.Status = "fulfilled";
                        //update json order book with currect data
                        axios.all([
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${lastEntery.id}`, { Quantity: lastEntery.Quantity, Status: lastEntery.Status }),
                            axios.patch(`${process.env.LOCALHOST_3004}/orderbook/${tradeBID.id}`, { Quantity: tradeBID.Quantity, Status: tradeBID.Status })
                        ]);
                        // update trades thats happens after swap occures
                        axios.all([
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: lastEntery.ClientID, related: lastEntery.id, currency: lastEntery.Pair.split("/")[1], price: tradeBID.Price, amount: tBidQ, time: Date.now() }),
                            axios.post(`${process.env.LOCALHOST_3004}/trades`, { ClientID: tradeBID.ClientID, related: tradeBID.id, currency: lastEntery.Pair.split("/")[0], price: tradeBID.Price, amount: tBidQ / tradeBID.Price, time: Date.now() })
                        ]);
                        // update platform routes about new data
                        axios.all([
                            axios.post(`api/v1/int/ask`,
                                { ClientID: lastEntery.ClientID, RelatedID: lastEntery.id, Pair: lastEntery.Pair, sellCoin: lastEntery.Pair.split("/")[0], amount: tBidQ/lastEntery.Price, price: tradeBID.Price, newAmount: tBidQ }),
                            axios.post(`api/v1/int/bid`,
                                {ClientID: tradeBID.ClientID, RelatedID: tradeBID.id, Pair: tradeBID.Pair, sellCoin: tradeBID.Pair.split("/")[1], amount: tBidQ, price: tradeBID.Price, newAmount: tBidQ/tradeBID.Price})
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
    askEngine: askEngine
}