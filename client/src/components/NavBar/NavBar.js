
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.scss";
import "./NavBar.css";
import { CheveronDown } from "../../icons/SVG/CheveronDown";
import CheveronUp from "../../icons/SVG/CheveronUp";
import Logo from "../../icons/SVG/Logo";
import AdjustLogo from "../../icons/SVG/AdjustLogo";
import GridIcon from "../../icons/SVG/GridIcon";
import FlagFinance from "../../icons/SVG/FlagFinance";
import PaperFinance from "../../icons/SVG/PaperFinance";
import TargetFinance from"../../icons/SVG/TargetFinance";
import ArrowRight from "../../icons/SVG/ArrowRight";

const clickHandal = () => {
    const navToggole = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.right-side');
    const visibility = primaryNav.getAttribute('data-visible');
    if(visibility === "false") {
        primaryNav.setAttribute('data-visible', "true");
        navToggole.setAttribute('aria-expanded', "true");
    }
    else{
        primaryNav.setAttribute('data-visible', "false");
        navToggole.setAttribute('aria-expanded', "false");
    }
    
}


const NavBar = () => {
    const [gridHover, setGridHover] =useState(false);
    const [buyHover, setBuyHover] =useState(false);
    const [tHover, setTHover] =useState(false);
    const [derivativeHover, setDerivativeHover] =useState(false);
    const [erHover, setErHover] =useState(false);
    const [finHover, setFinHover] =useState(false);
    const [insHover, setInsHover] =useState(false);
    
    const gridIconHover = () => {
        if(gridHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    }
    const buyCryptoHover = () => {
        if(buyHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    }
    const tradeHover = () => {
        if(tHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    }
    const derivativesHover = () => {
        if(derivativeHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    }    
    const EarnHover = () => {
        if(erHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    } 
    const financeHover = () => {
        if(finHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    } 
    const institutionalHover = () => {
        if(insHover) {
            return <CheveronUp/>;
        };
        return <CheveronDown/>
    } 
    return (
        <div className="nav-bar">
            <div className="left-side">
                <Link to="/"><Logo/></Link>
                <div className="GridIcon" onMouseEnter={() => {setGridHover(true)} } onMouseLeave={()=> {setGridHover(false)}}>
                    <div className="GridIcon1 word">
                        <GridIcon/>
                        <div className="dropdown">
                            <div className="dropdown__links">
                                <Link to="#">
                                <div className="dropdown__link">
                                    <div className="dropdown__icon"><FlagFinance/></div> 
                                    <div className="dropdown__item">Exchange</div>
                                    <div className="arrow-right"><ArrowRight/></div>
                                </div>
                                </Link>
                                <Link to="#">
                                <div className="dropdown__link">
                                    <div className="dropdown__icon"><PaperFinance/></div> 
                                    <div className="dropdown__item">Cloud</div>
                                    <div className="arrow-right"><ArrowRight/></div>
                                </div>
                                </Link>
                                <Link to="#">
                                <div className="dropdown__link">
                                    <div className="dropdown__icon"><TargetFinance/></div> 
                                    <div className="dropdown__item">Academy</div>
                                    <div className="arrow-right"><ArrowRight/></div>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="GridIcon-logo" >{gridIconHover()}</div>
                </div>
                <div className="buy-crypto" onMouseEnter={() => {setBuyHover(true)} } onMouseLeave={()=> {setBuyHover(false)}}>
                    <div className="buy-crypto1 word">Buy Crypto</div>
                    <div className="buy-crypto-logo">{buyCryptoHover()}</div>
                </div>
                <div className="Markets" >
                    <div className="Markets1 word">Markets</div>
                </div>
                <div className="Trade" onMouseEnter={() => {setTHover(true)} } onMouseLeave={()=> {setTHover(false)}}>
                    <div className="Trade1 word">Trade</div>
                    <div className="Trade-logo">{tradeHover()}</div>
                </div>
                <div className="Derivatives" onMouseEnter={() => {setDerivativeHover(true)} } onMouseLeave={()=> {setDerivativeHover(false)}}>
                    <div className="Derivatives1 word">Derivatives</div>
                    <div className="Derivatives-logo">{derivativesHover()}</div>
                </div>
                <div className="Earn" onMouseEnter={() => {setErHover(true)} } onMouseLeave={()=> {setErHover(false)}}>
                    <div className="Earn1 word">Earn</div>
                    <div className="Earn-logo">{EarnHover()}</div>
                </div>
                <div className="Finance" onMouseEnter={() => {setFinHover(true)} } onMouseLeave={()=> {setFinHover(false)}}>
                    <div className="Finance1 word">Finance</div>
                    <div className="Finance-logo">{financeHover()}</div>
                </div>
                <div className="NFT">
                    <div className="NFT1 word">NFT</div>
                </div>
                <div className="Institutional" onMouseEnter={() => {setInsHover(true)} } onMouseLeave={()=> {setInsHover(false)}}>
                    <div className="Institutional1 word">Institutional</div>
                    <div className="nstitutional-logo">{institutionalHover()}</div>
                </div>
                <div className="Feed">
                    <div className="Feed1 word">Feed</div>
                </div>
            </div>
            {/* ------right side start--- */}
            <button className="mobile-nav-toggle" aria-controls="right-side" aria-expanded="false" onClick={clickHandal}>
            <span className="sr-only">Menu</span>
            </button>
            <div id="right-side" data-visible="false" className="right-side">
                
                <Link to="/login" className="log-in button_effect">Log In</Link>
                <Link to="/register" className="register button_effect">Register</Link>
                <div className="buy-crypto-right">
                    <div className="buy-crypto1-right word">Buy Crypto</div>
                    <div className="buy-crypto-right-logo"></div>
                </div>
                <div className="Markets-right" >
                    <div className="Markets1-right word">Markets</div>
                </div>
                <div className="Trade-right" >
                    <div className="Trade1-right word">Trade</div>
                    <div className="Trade-logo"></div>
                </div>
                <div className="Derivatives-right" >
                    <div className="Derivatives1-right word">Derivatives</div>
                    <div className="Derivatives-logo"></div>
                </div>
                <div className="Earn-right">
                    <div className="Earn1-right word">Earn</div>
                    <div className="Earn-logo"></div>
                </div>
                <div className="Finance-right">
                    <div className="Finance1-right word">Finance</div>
                    <div className="Finance-logo"></div>
                </div>
                <div className="NFT-right">
                    <div className="NFT1-right word">NFT</div>
                </div>
                <div className="Institutional-right">
                    <div className="Institutional1-right word">Institutional</div>
                    <div className="nstitutional-logo"></div>
                </div>
                <div className="Feed-right">
                    <div className="Feed1-right word">Feed</div>
                </div>
                <div className="Downloads">Downloads</div>
                <div className="language">English</div>
                <div className="currency">| USD |</div>
                <AdjustLogo/>
            </div>
        </div>
    );
};

export default NavBar;