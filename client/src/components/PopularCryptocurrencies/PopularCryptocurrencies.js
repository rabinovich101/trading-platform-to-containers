import "./PopularCryptocurrencies.scss";
import ArrowRightShort from "../../icons/SVG/Arrow-Right-Short";
import { Link } from "react-router-dom";
import BitcoinImg from "../../img/bitcoin.png";
import BnbImg from "../../img/bnb.png";
import EthereumImg from "../../img/ethereum.png";
import GalxeImg from "../../img/galxe.png";
import greenMetaverseToken from "../../img/greenMetaverseToken.png";

const PopularCryptocurrencies = () => {
  return (
    <div className="popularcryptocurrencies">
        <div className="popularcryptocurrencies-title">
            <div className="popularcryptocurrencies-title-1">Popular cryptocurrencies</div>
            <Link to="#" className="popularcryptocurrencies-title-2">
                <div className="popularcryptocurrencies-title-2-item-1">View more markets</div>
                <ArrowRightShort/>
            </Link>
        </div>
        <div className="popularcryptocurrencies-subtitles">
            <div className="popularcryptocurrencies-subtitle-name">Name</div>
            <div className="popularcryptocurrencies-subtitle-lastprice">Last Price</div>
            <div className="popularcryptocurrencies-subtitle-name-24change">24h Change</div>
            <div className="popularcryptocurrencies-subtitle-name-marketcap">MarketCap</div>
        </div>
        <div className="popularcryptocurrencies-coins">
            <Link to="#" className="popularcryptocurrencies-coins-bnb">
                <div className="popularcryptocurrencies-coin-bnb">
                    <img src={BnbImg} alt="bnb coin" className="popularcryptocurrencies-coins-bnbimg"/>
                    <div className="popularcryptocurrencies-coins-name">BNB</div>
                    <div className="popularcryptocurrencies-coins-symbol">BNB</div>
                </div>
                <div className="popularcryptocurrencies-coins-price">$ 270.6</div>
                <div className="popularcryptocurrencies-coins-change">+0.66%</div>
                <div className="popularcryptocurrencies-coins-marketcap">$43.5M</div>
            </Link>
            <Link to="#" className="popularcryptocurrencies-coins-bnb">
                <div className="popularcryptocurrencies-coin-bnb">
                    <img src={BitcoinImg} alt="bnb coin" className="popularcryptocurrencies-coins-bnbimg"/>
                    <div className="popularcryptocurrencies-coins-name">Bitcoin</div>
                    <div className="popularcryptocurrencies-coins-symbol">BTC</div>
                </div>
                <div className="popularcryptocurrencies-coins-price">$ 270.6</div>
                <div className="popularcryptocurrencies-coins-change">+0.66%</div>
                <div className="popularcryptocurrencies-coins-marketcap">$43.5M</div>
            </Link>
            <Link to="#" className="popularcryptocurrencies-coins-bnb">
                <div className="popularcryptocurrencies-coin-bnb">
                    <img src={EthereumImg} alt="bnb coin" className="popularcryptocurrencies-coins-bnbimg"/>
                    <div className="popularcryptocurrencies-coins-name">Ethereum</div>
                    <div className="popularcryptocurrencies-coins-symbol">ETH</div>
                </div>
                <div className="popularcryptocurrencies-coins-price">$ 270.6</div>
                <div className="popularcryptocurrencies-coins-change">+0.66%</div>
                <div className="popularcryptocurrencies-coins-marketcap">$43.5M</div>
            </Link>
            <Link to="#" className="popularcryptocurrencies-coins-bnb">
                <div className="popularcryptocurrencies-coin-bnb">
                    <img src={GalxeImg} alt="bnb coin" className="popularcryptocurrencies-coins-bnbimg"/>
                    <div className="popularcryptocurrencies-coins-name">Galxe</div>
                    <div className="popularcryptocurrencies-coins-symbol">GAL</div>
                </div>
                <div className="popularcryptocurrencies-coins-price">$ 270.6</div>
                <div className="popularcryptocurrencies-coins-change">+0.66%</div>
                <div className="popularcryptocurrencies-coins-marketcap">$43.5M</div>
            </Link>
            <Link to="#" className="popularcryptocurrencies-coins-bnb">
                <div className="popularcryptocurrencies-coin-bnb">
                    <img src={greenMetaverseToken} alt="bnb coin" className="popularcryptocurrencies-coins-bnbimg"/>
                    <div className="popularcryptocurrencies-coins-name">Green Metaverse Token</div>
                    <div className="popularcryptocurrencies-coins-symbol">GMT</div>
                </div>
                <div className="popularcryptocurrencies-coins-price">$ 270.6</div>
                <div className="popularcryptocurrencies-coins-change">+0.66%</div>
                <div className="popularcryptocurrencies-coins-marketcap">$43.5M</div>
            </Link>
            <Link to="#" className="popularcryptocurrencies-title-2-mobile">
                <div className="popularcryptocurrencies-title-2-item-1">View more markets</div>
                <ArrowRightShort/>
            </Link>
            <div className="get-started-feature">
                <h3 className="get-started-feature-text">Sign up now to build your own portfolio for free!</h3>
                <Link className="get-started-feature-button" to="#">Get Started</Link>
            </div>
        </div>
    </div>
  )
}

export default PopularCryptocurrencies;