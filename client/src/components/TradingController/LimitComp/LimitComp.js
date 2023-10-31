import "./LimitComp.scss";
import { useContext, useState, useEffect, useMemo } from "react";
import { useBuyOrderLimitMutation, useSellOrderLimitMutation, useGetAvlQuery } from "../../../store/index";
import CoinsPricesContext from "../../../context/coinsPricesContext";
import axios from "axios";
import { ToastContainer} from 'react-toastify';
;
function LimitComp({chart ,stableCoin, cryptoCoin}) {
    const { coinsPricesApiS1 } = useContext(CoinsPricesContext);
    const [buy, setBuy] = useState({ buyAmount: 0, sellAmount: 0, price: 0, currency: `${cryptoCoin}/${stableCoin}`, sellCoin: stableCoin, token: window.localStorage.getItem('user') });
    const [sell, setSell] = useState({ buyAmount: 0,sellAmount: 0, price: 0, currency: `${cryptoCoin}/${stableCoin}`, sellCoin: cryptoCoin, token: window.localStorage.getItem('user')});
    const [getBalance1, setGetBalance1] = useState({ token: window.localStorage.getItem('user'), currency: cryptoCoin, });
    const [getBalance2, setGetBalance2] = useState({ token: window.localStorage.getItem('user'), currency: stableCoin, });
    const dataCoin = useMemo(() => coinsPricesApiS1, [coinsPricesApiS1]);
    const [buyOrder, result] = useBuyOrderLimitMutation();
    const [sellOrder] = useSellOrderLimitMutation();
    // Get account balance
    const { data: crypto, isLoading: cryptoLoding ,isSuccess:cryptoSuccess, isError:cryptoError} = useGetAvlQuery(getBalance1, {pollingInterval: 300,refetchOnMountOrArgChange: true ,skip:false});
    const { data: stable, isLoading: stableLoding, isSuccess:stableSuccess, isError: stableError } = useGetAvlQuery(getBalance2, {pollingInterval: 300, refetchOnMountOrArgChange: true ,skip:false});
    // END get account balance
    //function to fetch price for coin
    const getPrice = coinsPricesApiS1 => {
        axios.get(`https://www.binance.com/api/v3/ticker/price?symbols=[${coinsPricesApiS1.toUpperCase()}]`
        ).then(
            (res) => {
                res.data.map((r) => {
                    if (r.symbol === chart.ticker) {
                        setBuy(p => ({ ...p, price: parseFloat(r.price).toFixed(2, 0) }));
                        setSell(p => ({ ...p, price: parseFloat(r.price).toFixed(2, 0) }));
                    }
                })
            }
        );
    };
    //function to render avl balance
    const renderBalance = (balance,loading, sucsses,error) => {
        if (loading) {
            return '';
        } else if(sucsses) {
            return balance;
        } else if (error) {
            return '';
        }
        else {
            return '';
        }
    };
    const buySubmit = (e) => {
        e.preventDefault();
        if (buy.sellAmount > 0) {
            buyOrder(buy);
            setBuy(p => ({ ...p, buyAmount: 0, sellAmount: 0 }));
        }
    };
    const sellSubmit = (e) => {
        e.preventDefault();
        if (sell.sellAmount > 0) {
            sellOrder(sell);
            setSell(p => ({ ...p, buyAmount: 0, sellAmount: 0 }));
        };
    };
    useEffect(() => {
        getPrice(dataCoin);
        setGetBalance1(p => ({ ...p, token: window.localStorage.getItem('user'), currency: cryptoCoin }));
        setGetBalance2(p => ({ ...p, token: window.localStorage.getItem('user'), currency: stableCoin }));
        setBuy(p => ({ ...p, currency: `${cryptoCoin}/${stableCoin}` }));
        setSell(p => ({ ...p, currency: `${cryptoCoin}/${stableCoin}` }));
    }, [chart.ticker, crypto, stable]);
    
    return (
        <>
            <form className="trading-controller-buy" onSubmit={e => buySubmit(e)}>
                {console.log(result)}
                <div className="trading-controller-buy-balance">{`Avbl ${renderBalance(stable,stableLoding,stableSuccess, stableError)} ${stableCoin.toUpperCase()}`}</div>
                <div className="trading-controller-buy-price">
                    <label className="limitcamp-label">Price</label>
                    <input autoComplete="off" className="limitcamp-input" type="text" min="0.01" step="0.01" name="price" value={buy.price}
                        onChange={e => setBuy(p => ({ ...p, price: e.target.value, buyAmount: buy.sellAmount/e.target.value }))}  />
                    <span className="limitcamp-span">{stableCoin.toUpperCase()}</span>
                </div>
                <div className="trading-controller-buy-amount">
                    <label className="limitcamp-label" htmlFor="amount">Amount</label>
                    <input autoComplete="off" className="limitcamp-input" type="text" min="0.01" step="0.01" name="amount" value={buy.buyAmount}
                        onChange={e => setBuy(p => ({ ...p, buyAmount: e.target.value, sellAmount: e.target.value * buy.price}))}
                    />
                    <span className="limitcamp-span">{cryptoCoin.toUpperCase()}</span>
                </div>
                
                <div className="trading-controller-buy-amount-sell">
                    <label className="limitcamp-label" htmlFor="amount">Amount</label>
                    <input autoComplete="off" className="limitcamp-input" type="text" min="0.01" step="0.01" name="amount" value={buy.sellAmount}
                        onChange={e => setBuy(p => ({ ...p, sellAmount: e.target.value , buyAmount: e.target.value / buy.price}))} />
                    <span className="limitcamp-span">{stableCoin.toUpperCase()}</span>
                </div>
                <button type="submit">{`Buy ${cryptoCoin.toUpperCase()}`}</button>
            </form>
            <ToastContainer autoClose={2000}/>
            <form className="trading-controller-sell" onSubmit={e => sellSubmit(e)}>
                <div className="trading-controller-sell-balance">{`Avbl ${renderBalance(crypto,cryptoLoding,cryptoSuccess, cryptoError)} ${cryptoCoin.toUpperCase()}`}</div>
                <div className="trading-controller-sell-price">
                    <label className="limitcamp-label" htmlFor="price">Price</label>
                    <input autoComplete="off" className="limitcamp-input" type="text" min="0.01" step="0.01" name="price" value={sell.price}
                        onChange={e => setSell(p => ({ ...p, price: e.target.value , buyAmount: e.target.value * sell.sellAmount}))} />
                    <span className="limitcamp-span">{stableCoin.toUpperCase()}</span>
                </div>
                <div className="trading-controller-sell-amount">
                    <label className="limitcamp-label" htmlFor="amount">Amount</label>
                    <input autoComplete="off" className="limitcamp-input" type="text" min="0.01" step="0.01" name="amount" value={sell.sellAmount}
                        onChange={e => setSell(p => ({ ...p, sellAmount: e.target.value, buyAmount: e.target.value * sell.price }))} />
                    <span className="limitcamp-span">{cryptoCoin.toUpperCase()}</span>
                </div>
                
                <div className="trading-controller-sell-amount-buy">
                    <label className="limitcamp-label" htmlFor="amount">Amount</label>
                    <input autoComplete="off" className="limitcamp-input" type="text" min="0.01" step="0.01" name="amount" value={sell.buyAmount}
                        onChange={e => setSell(p => ({ ...p, sellAmount: e.target.value / sell.price  , buyAmount: e.target.value}))} />
                    <span className="limitcamp-span">{stableCoin.toUpperCase()}</span>
                </div>
                <button type="submit">{`Sell ${cryptoCoin.toUpperCase()}`}</button>
            </form>
        </>
    );
}
export default LimitComp;