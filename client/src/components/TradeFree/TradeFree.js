import "./TradeFree.scss";
import trade_free from "../../img/0_btc_fee.png";
import { Link } from "react-router-dom";
import ArrowRightShort from "../../icons/SVG/Arrow-Right-Short";

const TradeFree = () => {
  return (
    <div className="trade-free-warper">
        <div className="trade-free">
            <div className="trade-free-img-warper">
                <img src={trade_free} alt="trade-free-img"/>
            </div>
            <div className="trade-free-description">
                <div className="trade-free-description-title">Trade Bitcoin for Free</div>
                <Link to="#" className="item-1">
                    <div>0 trading fee on selected Bitcoin (BTC) spot trading pairs now</div>
                    <ArrowRightShort/>
                </Link>
                <Link to="#" className="item-2">
                    <div>Lowest transactions fees {`< 0.10%`} </div>
                    <ArrowRightShort/>
                </Link >
                <Link to="#" className="item-3">Buy BTC for 0 Fee</Link>
            </div>
        </div>
    </div>
  );
};

export default TradeFree;