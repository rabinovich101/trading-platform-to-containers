import { createContext, useEffect, useState } from "react";
import axios from "axios";
const stockPricesContext = createContext();
const { REACT_APP_WS_LOCAL_8000, REACT_APP_LOCAL_8001 } = process.env;
function StockPricesContextProvider({ children }) {
    const [stockPrices, setstockPrices] = useState([
        { name:'TEVA', price: null, change24:''},
        { name: 'NFLX', price: null, change24: '' },
        { name:'AAPL', price: null, change24:''}
    ]);
    const stockArry = [
        {stock: 'TEVA', exchange: 'nyse'},{stock: 'NFLX', exchange: 'nasdaq'},{stock: 'AAPL', exchange: 'nasdaq'}
    ];
    const getFetchPrices = (stockArry) => {
        setInterval(() => {
            try{
                for (let stock of stockArry) {
                    axios.get(`${REACT_APP_LOCAL_8001}/stocks/${stock.exchange}/${stock.stock}`).then(res => {
                        const data = res.data;
                        if (data && data !== undefined) {
                            setstockPrices(p => {
                                return p.map(item => {
                                   return item.name === data.symbol ? { ...item, price: data.price, change24: data.change } : item;
                                })
                            });
                        };
                    })
                };
                } catch (error) {
                    
            };
        }, 60000);
        return () => clearInterval();
    };
    const getStreamPrices = async () => {
        /* code for catch prices from python script (this code uncomment because python script not return forex curreny)*/
        const newStockArry = stockArry.map(stock => {
            return stock.stock;
        });
        const webSocket = new WebSocket(`${REACT_APP_WS_LOCAL_8000}?market=stock&coins=${newStockArry}`);
        webSocket.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        webSocket.onmessage = (e) => {
            let socketOBJ = e.data;
            let socketARR = socketOBJ.split('-');
            console.log(socketOBJ);
            if (socketARR[1]) {
                let pair = socketARR[0].split(':')[1];
                setstockPrices(p => {
                    return p.map(item => {
                        return item.coin === pair ?{...item, price: socketARR[1]}: item
                    })
                });
            } else{
                getFetchPrices(stockArry);
            }
            /*END code for catch prices from python script*/
        }

        /*code for alpha vintage*/
        // setInterval(() => {
        //     stockArry.map((pair) => {
        //         const sPair = pair.split("/");
        //         axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${sPair[0]}&to_currency=${sPair[1]}&apikey=`)
        //             .then((results) => {
        //                 //console.log(Object.values(Object.values(Object.values(results)[0])[0])[5]);
        //                 console.log(Object.entries(results)[0][1]);
        //             });
        //     });
        // }, 12000);
        /*END code for alpha vintage*/
    };
    useEffect(() => {
        //getStreamPrices();
        //getFetchPrices(stockArry);
    },[])

    return (
    <stockPricesContext.Provider value={{ stockPrices }}>
        { children }
    </stockPricesContext.Provider>);
};

export { StockPricesContextProvider };
export default stockPricesContext;