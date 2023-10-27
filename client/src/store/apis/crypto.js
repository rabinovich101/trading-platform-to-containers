import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const {LOCALHOST_80} = process.env;
const cryptoApi = createApi({
    reducerPath: 'crypto',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/v1/crypto',
    }),
    tagTypes: ['Crypto'],
    endpoints(builder) {
        return {
            getAddressByCoin: builder.query({
                query: (obj) => {
                    return {
                        url: '/getBTCaddress',
                        method: "GET",
                        headers: { Authorization: `Bearer ${obj?.token}` }
                    }
                }, providesTags: ['Crypto'],
            }),
            getAnyAddress: builder.query({
                query: (obj) => {
                    return {
                        url: '/getAddress',
                        method: "GET",
                        headers: { Authorization: `Bearer ${obj?.token}` },
                        params: { coin: obj?.coin, network: obj?.network },
                    }
                }, providesTags: ['Crypto'],
            })
            
        };
    }
});

export const {useGetAddressByCoinQuery, useGetAnyAddressQuery } = cryptoApi;
export { cryptoApi };

