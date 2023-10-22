import React from 'react';
import "./FirstHeader.scss";
import img from "../../../img/foreground-image-light.png";
import { Link } from "react-router-dom";
import PresentBinance from "../../../icons/SVG/PresentBinance";
import ArrowRightShort from "../../../icons/SVG/Arrow-Right-Short";
import HumanIcon from '../../../icons/SVG/human-icon';
import AppleIcon from '../../../icons/SVG/AppleIcon';
import googleImg from "../../../img/google-icon.png";
const FirstHeader = () => {
  return (
    <div className="first-header">
        <div className="left-header">
            <h1 className="first-h1">Buy, trade, and hold 350+ cryptocurrencies on Binance</h1>
            <div className="header-login-sign">
                <Link className="marketing-small" to="#">
                    <PresentBinance/>
                    <div className="text-marketing">Trade Bitcoin for free</div>
                    <ArrowRightShort/>
                </Link>
                <div className="signup-login">
                    <Link to="#" className="signup-login-link">
                        <HumanIcon/>
                        <div className="signup-login-text button_effect">Sign up with Email or Phone</div>
                    </Link>
                </div>
                <div className="hr-element">
                    <div className='hr-element-first'/>
                    <div className="hr-element-text">or continue with</div>
                    <div className="hr-element-second"/>
                </div>
                <div className="signup-buttons">
                    <Link to="#" className="google-button">
                        <img src={googleImg} alt="googleicon"/>
                        <div className="google-text">Google</div>
                    </Link>
                    <Link to="#" className="apple-button">
                        <AppleIcon/>
                        <div className="apple-text">Apple</div>
                    </Link>
                </div>
            </div>
        </div>
        <div className="right-header">
            <div className="nft-img"><img src={img} alt="nft img"/></div>
        </div>
    </div>
  )
}

export default FirstHeader;