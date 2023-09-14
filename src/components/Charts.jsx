import React from 'react'
import { Outlet } from 'react-router-dom'

const Charts = () => {
    return (
        <div>
            <div></div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Charts
