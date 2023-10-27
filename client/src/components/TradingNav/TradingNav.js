import "./TradingNav.scss";
import Logo from "../../icons/SVG/Logo";
import TradingNavRightNoAuth from "./TradingNavRightNoAuth/TradingNavRightNoAuth";
import TradingNavRightAuth from "./TradingNavRightAuth/TradingNavRightAuth";



function TradingNav({auth}) {
 
  return (
    <div className="nav-warp">
      <nav className="nav">
        <ul className="menu">
          <li><a className="link" href="/"><Logo className="main-navigation-left__logo" /></a></li>
          <li ><a className="menu-link" href="/">Home</a></li>
          <li className="has-dropdown">
            <a className="menu-link" href="#*">
              Derivatives
            </a>
            <ul className="submenu">
              <li><a className="menu-link" href="#*">OPTION 1</a></li>
              <li><a className="menu-link" href="#*">OPTION 2</a></li>
              <li><a className="menu-link" href="#*">OPTION 3</a></li>
            </ul>
          </li>
          <li><a className="menu-link" href="#*">SWAP</a></li>
          <li><a className="menu-link" href="/trade">TRADE </a></li>
          <li><a className="menu-link" href={auth ? 'https://btq.vixsha.xyz/?sg&scv=1&p=account-live' : 'https://btq.vixsha.xyz/index.php?p=account&sg&e=&angle=&cid=&autologin_url=true'}>AutoTrade</a></li>
        </ul>
        {auth ? <TradingNavRightAuth /> : <TradingNavRightNoAuth />}
      </nav>
    </div>
  );
}

export default TradingNav;