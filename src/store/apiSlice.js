import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { url } from './url'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: '/login',
                    method: 'post',
                    body: data
                }
            }
        })
    })
})

export const { useLoginUserMutation } = apiSlice
