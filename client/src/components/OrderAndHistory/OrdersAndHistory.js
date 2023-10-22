import { Link } from "react-router-dom";
import { useState } from "react";
import "./OrdersAndHistory.scss";
import ActiveOrders from "./ActiveOrders/ActiveOrders";
import HistoryOrders from "./HistoryOrders/HistoryOrders";
function OrdersAndHistory() {
  const [active, setActive] = useState(0);
  const styles = {
    default:{
      borderBottom: active === 0 ? "1px solid rgb(240, 185, 11)" : "none",
      backgroundColor: active === 0 ? "rgb(12, 14, 20)" : "rgb(23, 27, 38)",
    }
  };
  
  const renderComponenet = () => {
    if (active === 0) { 
      return <ActiveOrders />;
    } else if (active === 1) {
      return <HistoryOrders />;
    }
  }
  
  return (
    <div className="orders-and-history">
      <div className="orders-and-history-header">
        <Link className="active-orders" onClick={()=> {setActive(0)}} style={styles.default}>Active Orders</Link>
        <Link className="history-orders" onClick={()=> {setActive(1)}}>History Orders</Link>
      </div>
      <div className="orders-and-history-body">
        {renderComponenet()}
      </div>
    </div>
  )
}

export default OrdersAndHistory;