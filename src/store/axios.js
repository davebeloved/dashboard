import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { url } from './url'

const axiosClient = axios.create({
    // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
    baseURL: 'https://spms.telexcoresources.com.ng/api'
})

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('TOKEN'))}`

    return config
})

axiosClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('TOKEN')
            // window.location.href = '/login'
            // const navigate = useNavigate()

            // navigate('/login')
            return error
        }
        throw error
    }
)

export default axiosClient
