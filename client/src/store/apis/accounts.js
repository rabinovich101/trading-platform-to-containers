import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from "react-toastify";

const { REACT_APP_LOCAL_3003 } = process.env;
const accountsApi = createApi({
    reducerPath: 'accounts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/v1/accounts',
    }),
    tagTypes: ['Accounts'],
    endpoints(builder) {
        return {
            getAvl: builder.query({
                query: (balance) => {
                    return {
                        url: `/avbalance/${balance.currency}`,
                        method: "GET",
                        headers: { Authorization: `Bearer ${balance.token}` }
                    }
                },
                providesTags: ['Accounts']
            }),
            getBalance: builder.query({
                query: (balance) => {
                    return {
                        url: `/${balance.currency}`,
                        method: "GET",
                        headers: { Authorization: `Bearer ${balance.token}` }
                    }
                },
                providesTags: ['Accounts']
            }),
            getAllBalances: builder.query({
                query: (token) => {
                    return {
                        url: `/balances`,
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` }
                    }
                },
                providesTags: ['Accounts']
            }),
            getAllAvlBalances: builder.query({
                query: (token) => {
                    return {
                        url: `/avlbalances`,
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` }
                    }
                },
                providesTags: ['Accounts']
            }),
            addBuyTransaction: builder.mutation({
                query: (input) => {
                    return {
                        url: `/transaction/buy`,
                        method: "POST",
                        body: input,
                        headers: { Authorization: `Bearer ${input.token}` }
                    }
                },
                invalidatesTags: (result, error, arg) => result === 'done' ? [{ type: 'Accounts' }]
                    && toast.success("Order Succsess") :
                    result === 'Sufficient Funds' ? [{ type: 'Accounts' }] &&
                        toast.error("Sufficient Funds") : error ? [{ type: 'Accounts' }] 
                        && toast.error("Order Failed"): [{ type: 'Accounts' }]
            }),
            addSellTransaction: builder.mutation({
                query: (input) => {
                    return {
                        url: `/transaction/sell`,
                        method: "POST",
                        body: input,
                        headers: { Authorization: `Bearer ${input.token}` }
                    }
                },
                invalidatesTags: (result, error, arg) => result === 'done' ? [{ type: 'Accounts' }]
                    && toast.success("Order Succsess") :
                    result === 'Sufficient Funds' ? [{ type: 'Accounts' }] &&
                        toast.error("Sufficient Funds") : error ? [{ type: 'Accounts' }] 
                        && toast.error("Order Failed"): [{ type: 'Accounts' }]
            }),
            buyOrderLimit: builder.mutation({
                query: (input) => {
                    return {
                        url: `/transaction/limitbuy`,
                        method: "POST",
                        body: input,
                        headers: { Authorization: `Bearer ${input.token}` }
                    }
                },
                invalidatesTags: (result, error, arg) => result.ClientID ? [{ type: 'Accounts' }] && toast.success("Order Sends") : 
                result === 'Sufficient Funds' ? [{ type: 'Accounts' }] &&
                    toast.error("Sufficient Funds") : error ? [{ type: 'Accounts' }] 
                    && toast.error("Order Failed"): [{ type: 'Accounts' }]
            }),
            sellOrderLimit: builder.mutation({
                query: (input) => {
                    return {
                        url: `/transaction/limitsell`,
                        method: "POST",
                        body: input,
                        headers: { Authorization: `Bearer ${input.token}` }
                    }
                },
                invalidatesTags: (result, error, arg) => result.ClientID ? [{ type: 'Accounts' }] && toast.success("Order Sends") : 
                result === 'Sufficient Funds' ? [{ type: 'Accounts' }] &&
                    toast.error("Sufficient Funds") : error ? [{ type: 'Accounts' }] 
                    && toast.error("Order Failed"): [{ type: 'Accounts' }]
            }),
            withdraw: builder.mutation({
                query: (obj) => {
                    return {
                        url: `/transaction/withdraw`,
                        method: "POST",
                        body: {sellCoin: obj.currency, amount: obj.amount},
                        headers: { Authorization: `Bearer ${obj.token}` }
                    }
                },
                invalidatesTags:['Accounts']
            }),
        };
    }
});


export const { useGetBalanceQuery, useAddBuyTransactionMutation,
    useAddSellTransactionMutation, useGetAllBalancesQuery, useGetAvlQuery,
    useBuyOrderLimitMutation, useSellOrderLimitMutation, useGetAllAvlBalancesQuery,
    useWithdrawMutation,
} = accountsApi;
export { accountsApi };