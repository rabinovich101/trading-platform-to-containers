import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./store";
import { AuthContextProvider } from './context/authContext';
import { CoinsPricesContextProvider } from './context/coinsPricesContext';
import { StockPricesContextProvider } from './context/stockContext';
import { GlobalContextProvider } from './context/globalContext';
import { BalanceContextProvider } from './context/balanceContext';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <GlobalContextProvider>
                    <StockPricesContextProvider>
                        <CoinsPricesContextProvider>
                            <BalanceContextProvider>
                                <App />
                            </BalanceContextProvider>
                        </CoinsPricesContextProvider>
                    </StockPricesContextProvider>
                </GlobalContextProvider>
            </AuthContextProvider>
        </Provider>
    </React.StrictMode>
);

