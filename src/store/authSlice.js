import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from './url'
// import * as jwtDecode from 'jwt-decode'
import jwt_decode from 'jwt-decode'
import axiosClient from './axios'
// import jwt from 'jsonwebtoken'

const initialState = {
    token: JSON.parse(localStorage.getItem('token')),
    name: '',
    email: '',
    id: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false
}

export const registerUser = createAsyncThunk('auth/registerUser', async (values, { rejectWithValue }) => {
    try {
        const token = await axiosClient.post('/register', {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        })

        localStorage.setItem('token', JSON.stringify(token.data))

        return token.data
    } catch (error) {
        console.log(error.reespnse.data)
        rejectWithValue(error.response.data)
    }
})
export const loginUser = createAsyncThunk('auth/loginUser', async (values, { rejectWithValue }) => {
    try {
        const token = await axiosClient.post('/login', {
            email: values.email,
            password: values.password
        })

        localStorage.setItem('token', JSON.stringify(token.data))

        return token.data
    } catch (error) {
        console.log(error.reespnse.data)
        rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUsers(state, action) {
            const token = state.token
            if (token) {
                const user = jwt_decode(action.payload)

                return {
                    ...state,
                    token: token,
                    name: user.name,
                    email: user.email,
                    _id: user.id,
                    userLoaded: true
                }
            }
        },
        logoutUser(state, actioon) {
            localStorage.removeItem('token')
            return {
                token: '',
                name: '',
                email: '',
                id: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false
            }
        }
    },
    extraReducers: (builder) => {
        // register users
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: 'pending' }
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                // const user = jwt_decode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    // name: user.name,
                    // email: user.email,
                    // id: user._id,
                    registerStatus: 'success'
                }
            } else return state
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            return { ...state, registerStatus: 'rejected', registerError: action.payload }
        })

        // login users
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: 'pending' }
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwt_decode(action.payload)

                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: 'success'
                }
            } else return state
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            return { ...state, loginStatus: 'rejected', loginError: action.payload }
        })
    }
})

export default authSlice.reducer
export const { loadUsers, logoutUser } = authSlice.actions
