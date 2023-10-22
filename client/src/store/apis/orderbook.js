import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from "react-toastify";
const { REACT_APP_LOCAL_3003 } = process.env;
const orderBookApi = createApi({
    reducerPath: 'OrderBook',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/v1/orderbook',
    }),
    tagTypes: ['OrderBook'],
    endpoints(builder) {
        return {
            getAsks: builder.query({
                query: (currency) => {
                    return {
                        url: `/ask`,
                        method: "GET",
                        params: {currency: currency}
                    }
                },
                providesTags: ['OrderBook']
            }),
            getBids: builder.query({
                query: (currency) => {
                    return {
                        url: `/bid`,
                        method: "GET",
                        params: {currency: currency}
                    }
                },
                providesTags: ['OrderBook']
            }),
            getTrades: builder.query({
                query: (data) => {
                    return {
                        url: `/trades`,
                        method: "GET",
                        params: {currency: data.currency, relatedId: data.relatedId }
                    }
                },providesTags: ['OrderBook']
            }),
            getActiveOrders: builder.query({
                query: (token) => {
                    return {
                        url: `/transaction`,
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` }
                    }
                },providesTags: ['OrderBook']
            }),
            cancelOrder: builder.mutation({
                query: (obj) => {
                    return {
                        url: '/cancel',
                        method: 'POST',
                        body:{id: obj.id},
                        headers: { Authorization: `Bearer ${obj.token}` }
                    }
                }, invalidatesTags: (result, error, arg) => result === arg.id ? [{ type: 'OrderBook' }] && toast.warning("Order canceled") :
                    toast.error(error) &&  [{ type: 'OrderBook' }]
            }),
            getTradesByID: builder.query({
                query: (token) => {
                    return {
                        url: '/tradesbyid',
                        method: 'GET',
                        headers: { Authorization: `Bearer ${token}` }
                    }
                },providesTags: ['OrderBook']
            }),
            getTest: builder.query({
                query: () => {
                    return {
                        url: '/test',
                        method: 'GET'
                    }
                },providesTags: ['OrderBook']
            })
        }
    }
});
    

export const { useGetAsksQuery, useGetBidsQuery, useGetTradesQuery,
    useGetActiveOrdersQuery, useCancelOrderMutation, useGetTradesByIDQuery, useGetTestQuery } = orderBookApi;
export { orderBookApi };