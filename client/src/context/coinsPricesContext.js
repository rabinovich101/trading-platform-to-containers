import { createContext, useEffect, useState,useMemo  } from "react";
import axios from "axios";
const CoinsPricesContext = createContext();


function CoinsPricesContextProvider({ children }) {
    //all coins spareted
    const allCoins = ['BNB','BTC','USDT','BUSD','LTC'];
    //END all coins spareted
    const [prices, setPrices] = useState([
        { name: 'BNBUSDT', price: null, change24 : ''},
        { name: 'BTCUSDT', price: null, change24 : ''},
        { name: 'BTCBUSD', price: null, change24: '' },
        { name: 'LTCUSDT', price: null, change24 : ''},
    ]);
    const [pricesApi, setPricesApi] = useState([
        { name: 'BNBUSDT', price: null, change24 : ''},
        { name: 'BTCUSDT', price: null, change24 : ''},
        { name: 'BTCBUSD', price: null, change24: '' },
        { name: 'LTCUSDT', price: null, change24 : ''},
    ]);
    /* intial array for all coins */
    const coinsArray = [
        'bnbusdt', 'btcusdt', 'btcbusd','ltcusdt'
    ];
    /* END intial array for all coins */

    /* loop for prepare varible to send a request for a stream */
    let coins = 'bnbusdt@aggTrade';
    coinsArray.map(coin => {
        coins += `/${coin}@aggTrade`;
        return coins;
    });
    /*END loop for prepare varible to send a request  */
    /* prepar varible to send a api request for the priice*/
    let coinsPricesApi = '';
    coinsArray.map((coin, i) => {
        coinsPricesApi += `"${coin}",`
    });
    const coinsPricesApiS = coinsPricesApi.slice(0, -2);
    const coinsPricesApiS1 = `${coinsPricesApiS}"`;
    //console.log(coinsPricesApiS1.toUpperCase())
    /*END prepar varible to send a api request for the priice*/
    //this is rtk query implementation just for fun and test
    // const { data, isSuccess, isError } = useGetBinancePriceQuery(coinsPricesApiS1.toUpperCase(), { pollingInterval: 10000, refetchOnMountOrArgChange: true, skip: false });
    // if (isSuccess) console.log(data);
    //END this is rtk query implementation just for fun and test
    //const { data, isLoading, isSuccess } = useGetBinancePriceQuery(coinsPricesApiS1);
    
    const getTickerChangesAPi = () => {
        let interval = setInterval(() => {
                axios.get(`https://www.binance.com/api/v3/ticker/24hr?symbols=[${coinsPricesApiS1.toUpperCase()}]`).then(
                    (res) => {
                        res.data.map((r) => {
                            setPrices(p => {
                                return p.map(item => {
                                    return item.name === r.symbol ? { ...item, change24: r.priceChangePercent} : item
                                });
                            });
                        });
                    }
            );
        }, 20000);
        return () => clearInterval(interval);
    };

    const binanceStreamPrice = () => {
                /*open websocket to get binance prices by stream*/ 
                const webSocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${coins}`); //bnbusdt@aggTrade/btcusdt@aggTrade/btcbusd@aggTrade
                webSocket.onmessage = (e) => {
                    let socketOBJ = JSON.parse(e.data);
                    let coinprice = parseFloat(socketOBJ.data.p).toFixed(2) ;
                    let coinlable = socketOBJ.data.s;
        
                    setPrices(p => {
                        return p.map(item => {
                        return item.name === coinlable ? {...item, price: coinprice}: item
                        })
                    });
                    /*end websocket*/ 
                };
                return () => webSocket.close();
    }

  
    useEffect(() => {
        getTickerChangesAPi();
        //getPricesApi();
        binanceStreamPrice();
        
        return () => {
            clearInterval(getTickerChangesAPi());
            clearInterval(binanceStreamPrice());
        }
    },[]);

    return (
        <CoinsPricesContext.Provider value={{ prices , coinsPricesApiS1, allCoins}}>
            {children}
        </CoinsPricesContext.Provider>
    );
};
export {CoinsPricesContextProvider};
export default CoinsPricesContext;