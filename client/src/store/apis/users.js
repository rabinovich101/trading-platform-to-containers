// This file contain RTK query API connection
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const { REACT_APP_LOCAL_3003, REACT_APP_LOCAL_3000 } = process.env;
const usersApi = createApi({
    reducerPath: 'users', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/v1',
    }),
    tagTypes: ['Users'],
    endpoints(builder) {
         return {
            getUsers:builder.query({
                query: () => {
                    return {
                        url: "/users",
                        method: "GET"
                    }
                },
                providesTags: ['Users'],
            }),
             byUser: builder.query({
                query: (token) => {
                    return {
                        url: "/users/fetch",
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` }
                    }
                 },
                providesTags: ['Users'],
            }),
            addUser: builder.mutation({
                query: (user) => {
                    return {
                        url: "/users/newuser",
                        body:{
                            firstName : user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            country_residency: user.country_residency,
                            country_living: user.country_living,
                            password: user.password,
                            phone: user.phone
                        },
                        method: "POST"
                    }
                },
                invalidatesTags: (result, error, arg) => result.created ? [{type: 'Users'}] && window.location.replace(`/login`) :[{type: 'Users'}],
            })
         }
    },
});



export const { useAddUserMutation , useGetUsersQuery , useByUserQuery} = usersApi;
export { usersApi };
