import { createContext, useContext, useEffect, useState } from 'react'
import axiosClient from '../store/axios'

const stateContext = createContext({})

export const StateContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(JSON.stringify(localStorage.getItem('USER'))) || '')
    const [userToken, _setUserToken] = useState(JSON.parse(JSON.stringify(localStorage.getItem('TOKEN'))) || '')
    const [pillars, setPillars] = useState([])

    // const getAllPillars = async () => {
    //     try {
    //         const res = await axiosClient.post('/v1/pillar/view/all')
    //         console.log('pillars', res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     getAllPillars()
    // }, [])

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token)
    }

    return (
        <stateContext.Provider value={{ currentUser, userToken, setCurrentUser, _setUserToken }}>
            {children}
        </stateContext.Provider>
    )
}
export const useStateContext = () => useContext(stateContext)
