import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const { REACT_APP_LOCAL_3003,  REACT_APP_LOCAL_3000 } = process.env;
const authApi = createApi({
    reducerPath: 'Auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/v1/auth',
    }),
    tagTypes: ['Auth'],
    endpoints(builder){
        return {
            authLogin: builder.mutation({
                query: (user) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: {
                            email: user.email,
                            password: user.password
                        }
                    }
                },
                invalidatesTags: (result, error, arg) => {
                    result.token && result.token !== undefined ?
                    window.localStorage.setItem("user", result.token) : window.location.replace(`/trades`)
                },
            }),
            checkAuth: builder.query({
                query: (token) => {
                    return {
                        url: '/',
                        method: 'GET',
                        headers: { Authorization: `Bearer ${token}` }
                    }
                },providesTags: ['Auth']
            })
        };
    }
})
export const { useAuthLoginMutation ,useCheckAuthQuery} = authApi;
export { authApi };
