import "./EarnApr.scss";
import usdt from "../../img/usdt.png";
import ArrowRightCircel from "../../icons/SVG/ArrowRightCircel";
import { Link } from "react-router-dom";
import BTC from "../../img/bitcoin.png";
import BNB from "../../img/bnb.png";
import BUSD from "../../img/busd.png";

const EarnApr = () => {
  return (
    <div className="earnapr-warper">
        <div className="earnapr">
            <div className="earnapr-title">Binance Earn</div>
            <div className="earnapr-desc">Simple & Secure. Search popular coins and start earning.</div>
            <div className="earnapr-boxs">
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={usdt} alt="usdt"/>
                            <div>USDT</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={BTC} alt="BTC"/>
                            <div>BTC</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={BNB} alt="BNB"/>
                            <div>BNB</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={BUSD} alt="BUSD"/>
                            <div>BUSD</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={usdt} alt="ETH"/>
                            <div>ETH</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={BTC} alt="DOT"/>
                            <div>DOT</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={BNB} alt="ADA"/>
                            <div>ADA</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
                <Link to="#" className="earnapr-box">
                    <div className="earnapr-box-title">APR</div>
                    <div className="earnapr-box-precent">1.00% - 155.15%</div>
                    <div className="earnapr-box-icons">
                        <div className="earnapr-box-icon">
                            <img src={BUSD} alt="SHIB"/>
                            <div>SHIB</div>
                        </div>
                        <div className="earnapr-box-arrow"><ArrowRightCircel/></div>
                    </div>
                </Link>
            </div>
            <Link className="button-start-earn" to="#">Start To Earn</Link>
        </div>
    </div>
  )
}

export default EarnApr;