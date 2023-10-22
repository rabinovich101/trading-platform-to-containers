import { Link } from "react-router-dom";
import Ring from "../../../img/ring.png";
import "./TradingNavRightNoAuth.scss";
function TradingNavRightNoAuth() {
  return (
    <ul className="main-navigation-right">
    <li><Link className="link" to="/login">Log In</Link></li>
    <li><Link className="link" to="/register">Sign Up</Link></li>
    <li><img src={Ring} alt="ring"/></li>
  </ul>
  )
}

export default TradingNavRightNoAuth