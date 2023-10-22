import { configureStore} from "@reduxjs/toolkit";
/*start  rtk imports */ 
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from "./apis/users";
import { authApi } from "./apis/auth";
import { accountsApi } from "./apis/accounts";
import { binanceApi } from "./apis/binance";
import { cryptoApi } from "./apis/crypto";
import { orderBookApi } from "./apis/orderbook";
/*end */
import { userReducer, addUser } from "./slices/userSlice";


 const store = configureStore({
    reducer: {
        users: userReducer, //regular reducer
            [usersApi.reducerPath]: usersApi.reducer,
            [authApi.reducerPath]: authApi.reducer, // rtk query reducer
            [accountsApi.reducerPath]: accountsApi.reducer,  // rtk query reducer
            [binanceApi.reducerPath]: binanceApi.reducer,
            [cryptoApi.reducerPath]: cryptoApi.reducer,
            [orderBookApi.reducerPath]: orderBookApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ immutableCheck: false }).concat(usersApi.middleware)
            .concat(authApi.middleware).concat(accountsApi.middleware)
            .concat(binanceApi.middleware).concat(cryptoApi.middleware).concat(orderBookApi.middleware)
    }
});

//TEMPORARY
window.store = store;

setupListeners(store.dispatch);

export {store, addUser};
export * from "./thunks/users"; //thunk
export {useGetUsersQuery, useAddUserMutation, useByUserQuery} from "./apis/users"; // rtk query
export {useAuthLoginMutation, useCheckAuthQuery} from "./apis/auth"; // rtk query
export {
    useGetBalanceQuery, useAddBuyTransactionMutation,
    useAddSellTransactionMutation, useGetAllBalancesQuery,
    useGetAvlQuery, useBuyOrderLimitMutation, useSellOrderLimitMutation,
    useGetAllAvlBalancesQuery, useWithdrawMutation
} from "./apis/accounts"; // rtk query
export { useGetBinancePriceQuery } from "./apis/binance";
export { useGetAddressByCoinQuery, useGetAnyAddressQuery } from "./apis/crypto";
export {
    useGetAsksQuery, useGetBidsQuery, useGetTradesQuery,
    useGetActiveOrdersQuery, useCancelOrderMutation,
    useGetTradesByIDQuery, useGetTestQuery
} from "./apis/orderbook";

