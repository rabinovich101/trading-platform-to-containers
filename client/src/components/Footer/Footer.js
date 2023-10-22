import "./Footer.scss";
import "./Footer.css";
import React from 'react'
import { Link } from "react-router-dom";
import ScanIcon from "../../icons/SVG/ScanIcon";
import Logo from "../../img/logo.png";
import DiscordIcon from "../../icons/SVG/DiscordIcon";
import TelegramIcon from "../../icons/SVG/TelegramIcon";
import TiktokIcon from "../../icons/SVG/TiktokIcon";
import FacebookIcon from "../../icons/SVG/FacebookIcon";
import TwitterIcon from "../../icons/SVG/TwitterIcon";
import RedditIcon from "../../icons/SVG/RedditIcon";
import InstagramIcon from "../../icons/SVG/InstagramIcon";
import CoinmarketcapIcon from "../../icons/SVG/CoinmarketcapIcon";
import VkIcon from "../../icons/SVG/VkIcon";
import YoutubeIcon from "../../icons/SVG/YoutubeIcon";


const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-main">
            <div className="footer-main-left">
            <div className="footer-main-about">
                <div className="footer-main-about-title title">About Us</div>
                <Link className="item" to="#">About</Link>
                <Link className="item" to="#">Careers</Link>
                <Link className="item" to="#">Business Contacts</Link>
                <Link className="item" to="#">Community</Link>
                <Link className="item" to="#">Vixsha Blog</Link>
                <Link className="item" to="#">Terms</Link>
                <Link className="item" to="#">Privacy</Link>
                <Link className="item" to="#">Risk Warning</Link>
                <Link className="item" to="#">Announcements</Link>
                <Link className="item" to="#">News</Link>
                <Link className="item" to="#">Notices</Link>
                <Link className="item" to="#">Sitemap</Link>
                <Link className="item" to="#">Cookie Preferences</Link>
            </div>
            <div className="footer-main-product">
                <div className="footer-main-product-title title">Products</div>
                <Link className="item" to="#">Exchange</Link>
                <Link className="item" to="#">Academy</Link>
                <Link className="item" to="#">Vixsha Live</Link>
                <Link className="item" to="#">Charity</Link>
                <Link className="item" to="#">Card</Link>
                <Link className="item" to="#">Labs</Link>
                <Link className="item" to="#">Launchpad</Link>
                <Link className="item" to="#">Research</Link>
                <Link className="item" to="#">Trust Wallet</Link>
                <Link className="item" to="#">NFT</Link>
                <Link className="item" to="#">Vixsha Pay</Link>
                <Link className="item" to="#">Vixsha Gift Card</Link>
                <Link className="item" to="#">BABT</Link>
            </div>
            <div className="footer-main-service">
                <div className="footer-main-service-title title">Service</div>
                <Link className="item" to="#">Downloads</Link>
                <Link className="item" to="#">Desktop Application</Link>
                <Link className="item" to="#">Buy Crypto</Link>
                <Link className="item" to="#">Institutional & VIP Services</Link>
                <Link className="item" to="#">OTC Trading</Link>
                <Link className="item" to="#">Referral</Link>
                <Link className="item" to="#">Affiliate</Link>
                <Link className="item" to="#">BNB</Link>
                <Link className="item" to="#">Listing Application</Link>
                <Link className="item" to="#">P2P Merchant Application</Link>
                <Link className="item" to="#">P2Pro Merchant Application</Link>
                <Link className="item" to="#">Historical Market Data</Link>
                <Link className="item" to="#">Proof of Collateral for B-Tokens</Link>
            </div>
            <div className="footer-main-support">
                <div className="footer-main-support-title title">Support</div>
                <Link className="item" to="#">Give Us Feedback</Link>
                <Link className="item" to="#">Support Center</Link>
                <Link className="item" to="#">Submit a request</Link>
                <Link className="item" to="#">APIs</Link>
                <Link className="item" to="#">Fees</Link>
                <Link className="item" to="#">Trading Rules</Link>
                <Link className="item" to="#">Vixsha Verify</Link>
                <Link className="item" to="#">Law Enforcement Requests</Link>
                <Link className="item" to="#">Vixsha Legal (Court Orders)</Link>
                <Link className="item" to="#">Vixsha Airdrop Portal</Link>
            </div>
            <div className="footer-main-learn">
                <div className="footer-main-learn-title title">Learn</div>
                <Link className="item" to="#">Learn & Earn</Link>
                <Link className="item" to="#">Browse Crypto Prices</Link>
                <Link className="item" to="#">Bitcoin Price</Link>
                <Link className="item" to="#">Ethereum Price</Link>
                <Link className="item" to="#">Buy BNB</Link>
                <Link className="item" to="#">Buy BUSD</Link>
                <Link className="item" to="#">Buy Bitcoin</Link>
                <Link className="item" to="#">Buy Ethereum</Link>
                <Link className="item" to="#">Buy Dogecoin (Court Orders)</Link>
                <Link className="item" to="#">Buy XRP</Link>
                <Link className="item" to="#">Buy Tradable Altcoins</Link>
            </div>
            </div>
            <div className="footer-main-right">
            <div className="footer-main-trade">
                <div className="footer-main-trade-title title">Trade on the go with Vixsha</div>
                <Link className="footer-register-button" to="#">Register</Link>
                <div className="scan-svg-icon">
                    <ScanIcon/>
                    <img src={Logo} alt=""/>
                </div>
                <div className="footer-main-trade-desc">Scan to download the app</div>
            </div>
            </div>
        </div>
        <div className="footer-social">
            <div className="footer-social-title">Community</div>
            <div className="footer-social-icons">
                <Link className="link-icon" to="#"><DiscordIcon/></Link>
                <Link className="link-icon" to="#"><TelegramIcon/></Link>
                <Link className="link-icon" to="#"><TiktokIcon/></Link>
                <Link className="link-icon" to="#"><FacebookIcon/></Link>
                <Link className="link-icon" to="#"><TwitterIcon/></Link>
                <Link className="link-icon" to="#"><RedditIcon/></Link>
                <Link className="link-icon" to="#"><InstagramIcon/></Link>
                <Link className="link-icon" to="#"><CoinmarketcapIcon/></Link>
                <Link className="link-icon" to="#"><VkIcon/></Link>
                <Link className="link-icon" to="#"><YoutubeIcon/></Link>
            </div>
        </div>
        <div className="footer-rights">Vixsha © 2022</div>
    </div>
  )
}

export default Footer;