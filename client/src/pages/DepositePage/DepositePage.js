import { useParams } from "react-router-dom";
import "./DepositePage.scss";
import BtcCoin from "../../components/depoisteCoins/BtcCoin/BtcCoin";
import TradingNav from "../../components/TradingNav/TradingNav";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import BnbCoin from "../../components/depoisteCoins/BnbCoin/BnbCoin";
import Usdt from "../../components/depoisteCoins/Usdt/Usdt";
import Busd from "../../components/depoisteCoins/Busd/Busd";
import { GoSync } from "react-icons/go";
import SubNav from "../../components/SubNav/SubNav";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
import Footer from "../../components/Footer/Footer";


function DepositePage() {
  const {auth} = useContext(AuthContext); 
  const queryParameters = new URLSearchParams(window.location.search);
  const coin = queryParameters.get("coin");
  const action = 'Deposite';

  const renderCoin = (coin) => {
    if (coin === 'BTC') {
      return <BtcCoin coin={coin}/>;
    } else if (coin === 'BNB') {
      return <BnbCoin coin={coin} />;
    } else if (coin === 'LTC') {
      return <BnbCoin coin={coin} />;
    } else if (coin === 'USDT') {
      return <Usdt coin={coin} />;
    } else if (coin === 'BUSD') {
      return <Busd coin={coin} />;
    }
  };

  return (
    <div className="deposite-page">
      <div className="deposite-page_tradingnav">
        <TradingNav auth={auth}/>
      </div>
      <div className="deposite-page_subnav">
        <SubNav />
      </div >
      <div className="deposite-page_content">
        {renderCoin(coin) ? renderCoin(coin) : <GoSync />}
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