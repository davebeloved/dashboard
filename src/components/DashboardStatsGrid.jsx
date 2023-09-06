import React, { useEffect } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { projectInfo } from '../data'

export default function DashboardStatsGrid() {
    const navigate = useNavigate()

    return (
        <div className=" grid grid-cols-1 pl-20  lg:pl-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectInfo.map((btn) => {
                const { id, title, bgColor, icon } = btn

                return (
                    <div key={id} className=" rounded-md   " style={{ backgroundColor: bgColor }}>
                        <button
                            onClick={() => navigate(`pillars/${id}`)}
                            className="px-3 h-[200px] hover:no-underline flex flex-col items-center justify-center text-center text-white text-xl font-bold    w-full py-8 "
                        >
                            {icon}
                            {title}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
