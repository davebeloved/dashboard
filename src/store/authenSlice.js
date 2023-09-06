import { createSlice } from '@reduxjs/toolkit'
import { DefaultContext } from 'react-icons'
import authSlice from './authSlice'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authenSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    }
})

export const { setCredentials, logout } = authenSlice.actions
export default authenSlice.reducer
