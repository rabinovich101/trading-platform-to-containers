import "./withdrawPage.scss";
import { useContext, useMemo } from "react";
import AuthContext from "../../context/authContext";
import TradingNav from "../../components/TradingNav/TradingNav";
import { useParams } from "react-router-dom";
import SubNav from "../../components/SubNav/SubNav";
import Withdarw from "../../components/Withdraw/Withdarw";
import BalanceContext from "../../context/balanceContext";
import Footer from "../../components/Footer/Footer";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

function WithdrawPage() {
  const { auth } = useContext(AuthContext);
  const { currency } = useParams();
  const { datastate } = useContext(BalanceContext);
  const data = useMemo(() => datastate, [datastate]);
  const action = 'Withdraw';
  // check if array against currency
  function filterByCoin(item) {
    if (item.coin === currency.toUpperCase()) {
      return true;
    }
    return false;
  };

  const coinArray = data.filter(filterByCoin);
    
    return (
      <div className="withdraw__page">
        <div className="withdraw_nav">
          <TradingNav auth={auth} />
        </div>
        <div className="withdraw_subnav">
          <SubNav />
        </div>
        <div className="withdraw_content">
          <div className="withdraw_content_proccess">
            <Withdarw currency={currency} coinData={coinArray} />
          </div>
          <div className="withdraw_content_history">
            <HistoryTable action={action}/>
          </div>
        </div>
        <div className="withdraw_footer">
          <Footer/>
        </div>
      </div>
    );
}

export default WithdrawPage;