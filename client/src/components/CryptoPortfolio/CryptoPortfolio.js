import cryptoportfolio from "../../img/portfolio-section.png";
import "./CryptoPortfolio.scss";
import Kyc from "../../icons/SVG/kyc";
import Spot from "../../icons/SVG/spot";
import User from "../../icons/SVG/user";
import { Link } from "react-router-dom";

const CryptoPortfolio = () => {
  return (
    <div className='crypto-portfolio-warper'>
        <div className='crypto-portfolio'>
            <div className='crypto-portfolio-left'>
                <div className='crypto-portfolio-left-header'>
                    <div className="crypto-portfolio-left-header-title">Build your crypto portfolio</div>
                    <div className="crypto-portfolio-left-header-description">Start your first trade with these easy steps.</div>
                </div>
                <div className="phone-img-mobile">
                    <img src={cryptoportfolio} alt='crypto portfolio'/>
                </div>
                <div className="verfiy-identy">
                    <Kyc/>
                    <div className="verfiy-identy-text">
                        <div className="verfiy-identy-text-title">Verify your identity</div>
                        <div className="verfiy-identy-text-desc">Complete the identity verification process to secure your account and transactions.</div>
                    </div>
                </div>
                <div className="fund-account">
                    <User/>
                    <div className="fund-account-text">
                        <div className="fund-account-text-title">Fund your account</div>
                        <div className="fund-account-text-desc">Add funds to your crypto account to start trading crypto. You can add funds with a variety of payment methods.</div>
                    </div>
                </div>
                <div className="start-trading">
                    <Spot/>
                    <div className="start-trading-text">
                        <div className="start-trading-text-title">Start trading</div>
                        <div className="start-trading-text-desc">You're good to go! Buy/sell crypto, set up recurring buys for your investments, and discover what Binance has to offer.</div>
                    </div>
                </div>
                <Link className="button" to="#">Get Started</Link>
            </div>
            <div className='crypto-portfolio-right'>
                <img src={cryptoportfolio} alt='crypto portfolio'/>
            </div>
        </div>
    </div>
  )
}

export default CryptoPortfolio;