import { useContext } from "react";
import AuthContext from "../../context/authContext";
import TradingNav from "../../components/TradingNav/TradingNav";
import Markets from "../../components/Markets/Markets";
import TradingGraph from "../../components/TradingGraph/TradingGraph";
import TradingController from "../../components/TradingController/TradingController";
import OrderBook from "../../components/OrderBook/OrderBook";
import GlobalContext from "../../context/globalContext";
import MarketTrades from "../../components/MarketTrades/MarketTrades";
import OrdersAndHistory from "../../components/OrderAndHistory/OrdersAndHistory";
import "./Trading.scss";
import Footer from "../../components/Footer/Footer";
import { useGetTestQuery } from "../../store";
function Trading() {
  const { chart } = useContext(GlobalContext);
  const { auth } = useContext(AuthContext);    
  const stableCoin = chart.ticker.slice(chart.ticker.length - 4, chart.ticker.length);
  const cryptoCoin = chart.ticker.slice(0, chart.ticker.length - 4);
  const { data } = useGetTestQuery();

  return (
    <div className="trading-page">
      <TradingNav auth={auth} />
      <div className="trading-page_info">
        <Markets />
        <TradingGraph />
        <TradingController auth={auth} chart={chart} stableCoin={stableCoin} cryptoCoin={cryptoCoin} />
      </div>
      <div className="trading-page-results">
        <OrderBook chart={chart} stableCoin={stableCoin} cryptoCoin={cryptoCoin} />
        <MarketTrades cryptoCoin={cryptoCoin} />
        <OrdersAndHistory />
      </div>
      {data ? data : "no"}
      <Footer/>
    </div>
  );
}

export default Trading;