import { useParams } from "react-router-dom";
import "./DepositePage.scss";
import BtcCoin from "../../components/depoisteCoins/BtcCoin/BtcCoin";
import TradingNav from "../../components/TradingNav/TradingNav";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useState } from "react";
import { useEffect } from "react";
import BnbCoin from "../../components/depoisteCoins/BnbCoin/BnbCoin";
import Usdt from "../../components/depoisteCoins/Usdt/Usdt";
import Busd from "../../components/depoisteCoins/Busd/Busd";
import { GoSync } from "react-icons/go";
import SubNav from "../../components/SubNav/SubNav";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
import Footer from "../../components/Footer/Footer";


function DepositePage() {
  const { auth } = useContext(AuthContext); 
  const { currency } = useParams();
  const [token, setToken] = useState(window.localStorage.getItem('user'));
  const action = 'Deposite';
  const renderCoin = (currency) => {
    if (currency === 'BTC') {
      return <BtcCoin currency={currency} token={token} />;
    } else if (currency === 'BNB') {
      return <BnbCoin currency={currency} token={token} />;
    } else if (currency === 'LTC') {
      return <BnbCoin currency={currency} token={token} />;
    } else if (currency === 'USDT') {
      return <Usdt currency={currency} token={token} />;
    } else if (currency === 'BUSD') {
      return <Busd currency={currency} token={token} />;
    }
  };
  

  useEffect(() => {
    setToken(window.localStorage.getItem('user'));
  }, [token]);
  

  return (
    <div className="deposite-page">
      <div className="deposite-page_tradingnav">
        <TradingNav auth={auth} />
      </div>
      <div className="deposite-page_subnav">
        <SubNav />
      </div >
      <div className="deposite-page_content">
        {renderCoin(currency) ? renderCoin(currency) : <GoSync />}
      </div>
      <div className="deposite-page_history">
        <HistoryTable action={action} />
      </div>
      <div className="deposite-page_footer">
        <Footer/>
      </div>
    </div>
  );
};

export default DepositePage;