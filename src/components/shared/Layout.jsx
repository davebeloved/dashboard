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
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className="bg-neutral-100 w-full h-screen  lg:w-screen overflow-x-hidden flex  ">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            <div className="flex  flex-col overflow-y-scroll md:flex-1">
                <Header OpenSidebar={OpenSidebar} />
                <div className="main-container">
                    {/* <div className="md:flex-1 lg:p-4 lg:min-h-0"> */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
