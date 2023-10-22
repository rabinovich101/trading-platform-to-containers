import "./TradingController.scss";
import { useState } from "react";
import LimitComp from "./LimitComp/LimitComp";
import MarketComp from "./MarketComp/MarketComp";
import { Link } from "react-router-dom";
function TradingController({auth, chart, stableCoin, cryptoCoin}) {
    const ItradeType = { spot: true, cross: false, isolated: false };
    const Iordertype = { limit: true, market: false, stoploss: false };
    const [tradeType, setTradeType] = useState(ItradeType);
    const [ordertype, setordertype] = useState(Iordertype);
    const renderComponent = () => {
        if (tradeType.spot && ordertype.limit && auth) {
            return <LimitComp auth={auth} chart={chart} stableCoin={stableCoin} cryptoCoin={cryptoCoin}/>
        } else if (tradeType.spot && ordertype.market && auth) {
            return <MarketComp auth={auth} chart={chart} stableCoin={stableCoin} cryptoCoin={cryptoCoin}/>
        } else if (tradeType.spot && ordertype.stoploss && auth) {
            return <h1 className="soon">Comming Soon</h1>
        } else if (tradeType.cross  && auth) {
            return <h1 className="soon">Comming Soon</h1>
        }
        else if (tradeType.isolated  && auth) {
            return <h1 className="soon">Comming Soon</h1>
        }else if (!auth) {
            return <Link className="link" to="/login">Login</Link>
        }
    };

    return (
        <div className="trading-controller">
            <ul className="trading-controller-menu">
                <li style={tradeType.spot ? { borderBottom: '1px solid #F0B90B' } : {}} onClick={() => {
                    setTradeType(p => ({ ...p, spot: true, cross: false, isolated: false })); setordertype({ ...Iordertype });}}>Spot</li>
                <li style={tradeType.cross ? { borderBottom: '1px solid #F0B90B' } : {}} onClick={() => {
                    setTradeType(p => ({ ...p, spot: false, cross: true, isolated: false })); setordertype({ ...Iordertype }); }}>Cross 3x</li>
                <li style={tradeType.isolated ? { borderBottom: '1px solid #F0B90B'} : {}} onClick={() => {setTradeType(p => (
                    { ...p, spot: false, cross: false, isolated: true}));setordertype({ ...Iordertype });}}>Isolated 10x</li>
            </ul>
            <ul className="trading-controller-menu-ordertype">
                <li style={ordertype.limit ? { color: '#F0B90B' } : {}}
                    onClick={() => setordertype(p => ({ ...p, limit: true, market: false, stoploss: false }))}>Limit</li>
                <li style={ordertype.market ? { color: '#F0B90B' } : {}}
                    onClick={() => setordertype(p => ({ ...p, limit: false, market: true, stoploss: false })) }>Market</li>
                <li style={ordertype.stoploss ? { color: '#F0B90B' } : {}}
                    onClick={() => setordertype(p => ({ ...p, limit: false, market: false, stoploss: true }))}>Stop-limit</li>
            </ul>
            {renderComponent()}
        </div>
    );
}

export default TradingController;