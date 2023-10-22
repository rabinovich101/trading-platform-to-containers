import { useState, useRef, useEffect } from "react";
import "./Withdraw.scss";
import { AiFillCaretDown } from "react-icons/ai";
import WAValidator from "trezor-address-validator/dist/wallet-address-validator";
import { useWithdrawMutation } from "../../store/index";


function Withdarw({ currency, coinData }) {
    const [withdraw] = useWithdrawMutation();
    const inputRef = useRef();
    const amnRef = useRef();
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const minAmount = 0;
    const newurrency = currency.toLowerCase();
    const valid = WAValidator.validate(address, newurrency);
    const validAmount = parseFloat(amount) <= parseFloat(coinData[0].available) && parseFloat(minAmount) <= parseFloat(amount) && 0 < parseFloat(amount) ? true: false;
    const fee = 0;

    const handleWithdraw = (e) => {
        e.preventDefault();
        amount > 0 && withdraw({ amount, token: window.localStorage.getItem("user"), currency });
    };
    
    const setMax = () => {
        setAmount(cur => cur = parseFloat(coinData[0].available))
        amnRef.current.value = parseFloat(amount);
    };

    const renderWithraw = (currency) => {
        return (
            <>
                <div className="coin__address__amount">
                    <div className="coin__address__amount_desc">Withdraw</div>
                    <div className="coin__address__amount_action">
                        <label>Amount :</label>
                        <input ref={amnRef} className="coin__address__amount_action_input" autoComplete="off" type="text" onChange={e => setAmount(p => p = e.target.value)} value={amount} placeholder="" />
                        <div className="coin__address__amount_feature">
                            <div onClick={setMax}>MAX</div><span>|</span><div>{currency}</div>
                        </div>
                    </div>
                </div>
                <div className="coin__address__fee">
                    <div className="coin__address__fee_desc">Fee</div>
                    <div className="coin__address__fee_action">
                        {fee} {currency} - Network
                    </div>
                </div>
                <div className="coin__address__submit">
                    <div className="coin__address__submit_desc">Receive</div>
                    <div className="coin__address__submit_action">
                        <div>{amount - fee}</div>
                        <button onClick={e => handleWithdraw(e)} disabled={validAmount? false: true} className="coin__address__submit_button">Withdarw</button>
                    </div>
                </div>
            </>
        );
    };

    const renderNetwork = currency => {
        if (currency === "BNB") {
            return "BNB Beacon Chain (BEP2)";
        } else if (currency === "LTC") {
            return "LTC (LTC)";
        } else if (currency === "USDT") {
            return "USDT (USDT)";
        } else if (currency === "BUSD") {
            return "BUSD (BUSD)";
        } else if (currency === "BTC") {
            return "BTC (BTC)";
        }
        return;
    };

    useEffect(() => {
        if (!valid && inputRef.current !== null) {
            inputRef.current.classList.add('not_valid');
        } else if (valid && inputRef.current !== null) {
            inputRef.current.classList.remove('not_valid');
        }

        if (!validAmount && amnRef.current !== undefined && amnRef.current !== null) {
            amnRef.current.classList.add('not_valid');
            amnRef.current.classList.remove('coin__address__amount_action_input');
        } else if (validAmount && amnRef.current !== undefined && amnRef.current !== null) {
            amnRef.current.classList.remove('not_valid');
            amnRef.current.classList.add('coin__address__amount_action_input');
        }
    },[address, amount]);

    return (
        <div className="withdraw">
            <div className="withdraw_coin_warp">
                <div className="coin__type">
                    <div className="coin__type__desc">Select coin</div>
                    <div className="coin__type__action">
                        <div className="coin__type__action__desc">Coin :</div>
                        <div className="coin__type__action__currency">
                            <img src={coinData[0].icon} alt={`${coinData[0].coin}-ICON`} />
                            <div>{currency}</div>
                            <AiFillCaretDown/>
                        </div>
                    </div>
                </div>
                <div className="coin__address">
                    <div className="coin__address__desc">Send to</div>
                    <div className="coin__address__action">
                        <div className="coin__address__action__address">
                            <div className="coin__address__action__address__desc">Address :</div>
                            <input type="text" ref={inputRef} name="address" autoComplete="off" className="coin__address__input" required onChange={e => setAddress(p => p = e.target.value)} value={address} placeholder="" />
                            {!valid? <div>Not Valid Address</div> : null}
                        </div>
                        <div className="coin__address__action__network">
                            <div className="coin__address__action__network__desc">Network :</div>
                            <div className="coin__address__action__network__type">{renderNetwork(currency)} <AiFillCaretDown/></div>
                        </div>
                        <div className="coin__address__action__details">
                            <div className="coin__address__action__details_up">
                                <div className="coin__address__action__details_balance">
                                    <div className="em_title">{currency} balance</div><div>{parseFloat(coinData[0].available)} {currency}</div>
                                </div>
                                <div className="coin__address__action__details_withdrawal">
                                    <div className="em_title">Minimum withdrawal</div><div>{minAmount} { currency}</div>
                                </div>
                            </div>
                            <div className="coin__address__action__details_down">
                                <div className="coin__address__action__details_fee">
                                    <div className="em_title">Network fee</div><div>0.7 ~ 4 { currency}</div>
                                </div>
                                <div className="coin__address__action__details_limit">
                                    <div className="em_title">24h remaining limit</div><div>No Limit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {valid ? renderWithraw(currency): null}
            </div>
            <div className="faq">

            </div>
        </div>
    );
}

export default Withdarw;