import "./MarketComp.scss";
import { useState, useEffect } from "react";
import { useAddBuyTransactionMutation, useAddSellTransactionMutation, useGetAvlQuery } from "../../../store";
import { Schema } from "../../../validations/trades";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MarketComp({chart ,stableCoin, cryptoCoin}) {
    const [getBalance1, setGetBalance1] = useState({ token: window.localStorage.getItem('user'), currency: cryptoCoin, });
    const [getBalance2, setGetBalance2] = useState({ token: window.localStorage.getItem('user'), currency: stableCoin, });
    const [buyInput, setBuyInput] = useState({ amount: "", buyCoin: cryptoCoin, sellCoin: stableCoin, token: window.localStorage.getItem('user') });
    const [sellInput, setSellInput] = useState({amount: "", buyCoin: stableCoin, sellCoin: cryptoCoin,token: window.localStorage.getItem('user')});
    // Get account balance
    const { data: crypto, isLoading: cryptoLoding, isSuccess: cryptoSuccess, isError: cryptoBalanceEroor } =
        useGetAvlQuery(getBalance1, { pollingInterval: 300, refetchOnMountOrArgChange: true, skip: false });
    const { data: stableBalance, isLoading: stableLoding, isSuccess: stableSuccess, isError: stableBalanceEroor } =
        useGetAvlQuery(getBalance2, { pollingInterval: 300, refetchOnMountOrArgChange: true, skip: false });
    const [addBuyTransaction] = useAddBuyTransactionMutation();
    const [addSellTransaction] = useAddSellTransactionMutation();
    // END get account balance
    //onchange funcs
    const buyInputOnChange = (e) => {
        setBuyInput(p => ({...p, amount: e.target.value,buyCoin: cryptoCoin, sellCoin: stableCoin, token: window.localStorage.getItem('user')}));
    };
    const sellInputOnChange = e => {
        setSellInput(p => ({...p, amount: e.target.value,buyCoin: stableCoin, sellCoin: cryptoCoin,token: window.localStorage.getItem('user')}));
    };
    const handleBuySubmit = (e) => {
        e.preventDefault();
        if (buyInput.amount > 0) {
            addBuyTransaction(buyInput);
            setBuyInput(p => ({ ...p, amount: ""}));
        };
    };
    const handleSellSubmit = e => {
        e.preventDefault();
        if (sellInput.amount > 0) {
            addSellTransaction(sellInput);
            setSellInput(p => ({...p, amount:""}));
        };
    };
    //END onchange funcs
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
 
    useEffect(() => {
        setGetBalance1(p => ({ ...p, token: window.localStorage.getItem('user'), currency: cryptoCoin }));
        setGetBalance2(p => ({ ...p, token: window.localStorage.getItem('user'), currency: stableCoin }));
        setBuyInput(p => ({...p, buyCoin: cryptoCoin, sellCoin: stableCoin, token: window.localStorage.getItem('user')}));
        setSellInput(p => ({...p, buyCoin: stableCoin, sellCoin: cryptoCoin,token: window.localStorage.getItem('user')}));
    }, [chart.ticker,crypto,stableBalance]);
   
    return (
        <>
            <form className="market-trading-controller-buy" onSubmit={e => handleBuySubmit(e)}>
                <div className="market-trading-controller-buy-balance">{`Avbl ${renderBalance(stableBalance,stableLoding,stableSuccess,stableBalanceEroor)} ${stableCoin.toUpperCase()}`}</div>
                <div className="market-trading-controller-buy-price">
                    <label className="marketcamp-label" htmlFor="price">Price</label>
                    <input className="marketcamp-input" type="text" min="0.01" step="0.01" name="price" placeholder="MARKET PRICE"/>
                    <span className="marketcamp-span">{stableCoin.toUpperCase()}</span>
                </div>
                <div className="market-trading-controller-buy-amount">
                    <label className="marketcamp-label" htmlFor="amount">Amount</label>
                    <input className="marketcamp-input" type="text" min="0.01" step="0.01" max={stableBalance} name="amount" value={buyInput.amount}
                        onChange={e => buyInputOnChange(e)}  autoComplete="off"/>
                    <span className="marketcamp-span">{stableCoin.toUpperCase()}</span>
                </div>
                
                <button type="submit" >{`Buy ${cryptoCoin.toUpperCase()}`}</button>
            </form>
            <ToastContainer autoClose={2000}/>
            <form className="market-trading-controller-sell" onSubmit={e => handleSellSubmit(e)}>
                <div className="market-trading-controller-sell-balance">{`Avbl ${renderBalance(crypto,cryptoLoding,cryptoSuccess,cryptoBalanceEroor)} ${cryptoCoin.toUpperCase()}`}</div>
                <div className="market-trading-controller-sell-price">
                    <label className="marketcamp-label" htmlFor="price">Price</label>
                    <input className="marketcamp-input" type="text" min="0.01" step="0.01" name="price" placeholder="MARKET PRICE"/>
                    <span className="marketcamp-span">{cryptoCoin.toUpperCase()}</span>
                </div>
                <div className="market-trading-controller-sell-amount">
                    <label className="marketcamp-label" htmlFor="amount">Amount</label>
                    <input className="marketcamp-input" type="text" min="0.01" step="0.01" name="amount" value={sellInput.value}
                        onChange={e => sellInputOnChange(e)} autoComplete="off" />
                    <span className="marketcamp-span">{cryptoCoin.toUpperCase()}</span>
                </div>
                
                <button type="submit">{`Sell ${cryptoCoin.toUpperCase()}`}</button>
            </form>
        </>
    );
}

export default MarketComp;