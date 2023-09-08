import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useStateContext } from '../../context/contextProvider'

export default function Layout() {
    const [width, setWidth] = useState(100)
    const navigate = useNavigate()
    const { userToken } = useStateContext()
    useEffect(() => {
        if (!userToken) {
            navigate('/login')
        }
    })

    return (
        <div className="bg-neutral-100 h-screen  lg:w-screen overflow-hidden flex ">
            <Sidebar />

            <div className="flex flex-col   lg:flex-1 w-full lg:pl-60">
                <Header />
                <div className="md:flex-1  lg:p-4 lg:min-h-0">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
