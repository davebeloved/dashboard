import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { projectInfo } from '../data'
import axiosClient from '../store/axios'
import axios from 'axios'
import { useStateContext } from '../context/contextProvider'
import { url } from '../store/url'

// importing icons
import { AiFillCodeSandboxCircle } from 'react-icons/ai'

import { MdOutlineAgriculture } from 'react-icons/md'

import { SiXdadevelopers, SiRelianceindustrieslimited } from 'react-icons/si'
import { AiOutlinePartition } from 'react-icons/ai'
import { RiGovernmentFill } from 'react-icons/ri'
import { PuffLoader } from 'react-spinners'
import ClipLoader from 'react-spinners/ClipLoader'
import { ColorRing, InfinitySpin } from 'react-loader-spinner'
import Loader from './Loader'

export default function DashboardStatsGrid() {
    const navigate = useNavigate()
    const { userToken, pillars, loading } = useStateContext()

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className=" grid grid-cols-1    md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                    {pillars.map((item) => {
                        const { id, pillarname, color, background } = item

                        return (
                            <div key={id} className=" rounded-md" style={{ backgroundColor: color }}>
                                <button
                                    onClick={() => navigate(`pillars/${id}`)}
                                    className="px-3 h-[200px] hover:no-underline flex flex-col items-center justify-center text-center text-white text-xl font-bold    w-full py-8 "
                                >
                                    {background === '<AiFillCodeSandboxCircle />' && (
                                        <AiFillCodeSandboxCircle size={70} className="" />
                                    )}
                                    {background === '<SiXdadevelopers  />' && (
                                        <SiXdadevelopers size={70} className="" />
                                    )}
                                    {background === '<MdOutlineAgriculture  />' && (
                                        <MdOutlineAgriculture size={70} className="" />
                                    )}
                                    {background === '<SiRelianceindustrieslimited  />' && (
                                        <SiRelianceindustrieslimited size={70} className="" />
                                    )}
                                    {background === '<AiOutlinePartition  />' && (
                                        <AiOutlinePartition size={70} className="" />
                                    )}
                                    {background === '<RiGovernmentFill  />' && (
                                        <RiGovernmentFill size={70} className="" />
                                    )}

                                    {pillarname}
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}
