import { createContext, useContext, useEffect, useState } from 'react'
import axiosClient from '../store/axios'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const stateContext = createContext({})

export const StateContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(JSON.stringify(localStorage.getItem('USER'))) || '')
    // const [userToken, _setUserToken] = useState(JSON.parse(JSON.stringify(localStorage.getItem('TOKEN'))) || '')
    const [userToken, _setUserToken] = useState(JSON.parse(localStorage.getItem('TOKEN')) || '')
    const [pillars, setPillars] = useState([])
    const [projects, setProjects] = useState([])
    const [projectDetail, setProjectDetail] = useState([])
    const [singlePillar, setSinglePillar] = useState([])

    const { id } = useParams()

    const fetchData = async () => {
        try {
            if (userToken) {
                const res = await axios.get('https://spms.telexcoresources.com.ng/api/v1/pillar/view/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setPillars(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [userToken])

    const fetchProjects = async () => {
        try {
            if (userToken) {
                const res = await axios.get('https://spms.telexcoresources.com.ng/api/v1/project/view/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setProjects(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProjects()
    }, [userToken])

    const fetchProjectDetails = async () => {
        try {
            if (userToken) {
                const res = await axios.get('https://spms.telexcoresources.com.ng/api/v1/project/details/view/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setProjectDetail(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProjectDetails()
    }, [userToken])

    const fetchSinglePillar = async () => {
        try {
            if (userToken) {
                const res = await axios.post('https://spms.telexcoresources.com.ng/api/v1/project/details/view/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setSinglePillar(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchSinglePillar()
    }, [userToken])

    console.log('helloll', singlePillar)
    // console.log('mydata', pillars)

    // const setUserToken = (token) => {
    //     if (token) {
    //         localStorage.setItem('TOKEN', token)
    //     } else {
    //         localStorage.removeItem('TOKEN')
    //     }
    //     _setUserToken(token)
    // }

    return (
        <stateContext.Provider
            value={{
                currentUser,
                userToken,
                setCurrentUser,
                _setUserToken,
                pillars,
                projects,
                projectDetail,
                singlePillar
            }}
        >
            {children}
        </stateContext.Provider>
    )
}
export const useStateContext = () => useContext(stateContext)
