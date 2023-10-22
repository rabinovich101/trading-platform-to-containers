import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const binanceApi = createApi({
    reducerPath: 'binance',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.binance.com/api/v3/',
    }),
    tagTypes: ['Binance'],
    endpoints(builder) {
        return {
            getBinancePrice: builder.query({
                query: (pair) => {
                    return {
                        url: `ticker/24hr?symbols=[${pair.toUpperCase()}]`,
                        method: "GET"
                    }
                }, providesTags: ['Binance']
            })
        }
    }
});

export const {useGetBinancePriceQuery} = binanceApi;
export { binanceApi };