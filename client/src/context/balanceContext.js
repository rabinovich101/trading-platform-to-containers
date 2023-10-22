import { createContext, useEffect, useState } from "react";
import { useGetAllBalancesQuery } from "../store";
import { useGetAllAvlBalancesQuery } from "../store";

import bnbImg from "../img/bnb.png";
import btcImg from "../img/bitcoin.png";
import busdImg from "../img/busd.png";
import usdtImg from "../img/usdt.png";
import ltcImg from "../img/LTC.png";
const BalanceContext = createContext();

function BalanceContextProvider({ children }) {
  const [token, setToken] = useState(window.localStorage.getItem("user"));
  const [datastate, setSatastate] = useState([
    { coin: 'BNB', icon: bnbImg, total: "0.00", available: "0.00" },
    { coin: 'BTC', icon: btcImg, total: "0.00", available: "0.00" },
    { coin: 'BUSD', icon: busdImg, total: "0.00", available: "0.00" },
    { coin: 'LTC', icon: ltcImg, total: "0.00", available: "0.00" },
    { coin: 'USDT', icon: usdtImg, total: "0.00", available: "0.00" },
  ]);
  const { data, isSuccess, } = useGetAllBalancesQuery(token);
  const { data: avlBalances, isSuccess: AvlIsSuccses,} = useGetAllAvlBalancesQuery(token);
  let newdata = data && isSuccess ? data : '';
    // loop balance results agianst state
  const balanceVsState = () => {
    let interval = setInterval(() => {
        if (isSuccess) {
          data.map((e) => {
          setSatastate(p => {
            return p.map(item => {
              return item.coin === e.Currency? {...item, total: parseFloat(e.balances).toFixed(4,0)} : item
              })
          })
          })
      }
    }, 2000);
    return () => clearInterval(interval);
    }
  // END loop balance results agianst state
      // loop balance results agianst state
      const AvaliblebalanceVsState = () => {
        let inteval = setInterval(() => {
            if (AvlIsSuccses) {
              avlBalances.map((e) => {
              setSatastate(p => {
                return p.map(item => {
                  return item.coin === e.Currency? {...item, available: parseFloat(e.avl).toFixed(4,0)} : item
                  })
              })
              })
          }
        }, 2000);
        
        return () => clearInterval(inteval);
        }
      // END loop balance results agianst state

  useEffect(() => {
    setToken(window.localStorage.getItem("user"));
    balanceVsState();
    AvaliblebalanceVsState();
    return () => {
      clearInterval(balanceVsState());
      clearInterval(AvaliblebalanceVsState());
    }
    
  }, [token, data, datastate]);

  return (
      <BalanceContext.Provider value={{datastate}}>
          {children}
    </BalanceContext.Provider>
  )
}

export { BalanceContextProvider };
export default BalanceContext;