import { createContext, useState } from "react";
const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
    const [chart, setChart] = useState({provider:'BINANCE', ticker:'BTCUSDT'});
    const onUpdateChart = (ticker) => {
        setChart(p => ({...p, ticker}))
    };
    return (
        <GlobalContext.Provider value={{ chart , onUpdateChart}}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContextProvider };
export default GlobalContext;