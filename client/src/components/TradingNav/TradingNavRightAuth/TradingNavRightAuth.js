import Ring from "../../../img/ring.png";
import { Link } from "react-router-dom";
import "./TradingNavRightAuth.scss";
import { BsWallet2 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import {  useEffect } from "react";
import { useByUserQuery } from "../../../store";

function TradingNavRightAuth() {
  const token = window.localStorage.getItem('user');
  const {data} = useByUserQuery(token);
  useEffect(() => {
    window.localStorage.getItem('user');
  }, [token])
  
  return (
    <ul className="main-navigation-right">
      <li><BsWallet2/><a className="" href="/assets">Wallet </a></li> 
      <li><FaRegUserCircle />
        <Link className="link-user">{data !== undefined && data[0]?.email !== undefined && data[0]?.email}</Link>
      </li>
      <li><img src={Ring} alt="ring"/></li>   
    </ul>
  )
}

export default TradingNavRightAuth;