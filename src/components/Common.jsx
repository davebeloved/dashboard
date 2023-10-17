import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from './Modal'
import Progress from './Progress'
import { projectInfo } from '../data'
import { useStateContext } from '../context/contextProvider'
import axios from 'axios'
import Loader from './Loader'
import { ColorRing } from 'react-loader-spinner'
import { Bar, Pie } from 'react-chartjs-2'

import {
ArcElement,
BarElement,
CategoryScale,
Chart as ChartJs,
Legend,
LinearScale,
Title,
Tooltip,
plugins
} from 'chart.js'

const Common = () => {
const [isOpen, setIsOpen] = useState(false)
const [pillarid, setPillarid] = useState('')
const [projectstatus, setProjectstatus] = useState('')
const [iconic, setIconic] = useState('')
const { projects, pillars, userToken } = useStateContext()
const [singlePillar, setSinglePillar] = useState([])
const [barchart, setBarchart] = useState([])
const [piechart, setPiechart] = useState([])
const [loading, setLoading] = useState(false)
const [pillarName, setPillarName] = useState([])
// console.log('myprojectssss', projects)

const navigate = useNavigate()

const openModal = () => {
    setIsOpen(!isOpen)
}
const { id } = useParams()

const fetchSinglePillar = async () => {
    try {
        if (userToken) {
            setLoading(true)
            const res = await axios.post(
                `https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus`,
                {
                    pillarid: id,
                    projectstatus: 'approved'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            console.log('newdataaafrom dave', res.data.data)
            setSinglePillar(res.data.data)
            setLoading(false)
        }
    } catch (error) {
        console.log('errorrrrrrrrrff', error)
    }
}
const fetchPillarDetails = async () => {
    try {
        if (userToken) {
            setLoading(true)
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/pillar/view/all`,
    

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            console.log('pillarname from dave', res.data.data)
            setPillarName(res.data.data.find((x)=>x.id === Number(id)))
            setLoading(false)
        }
    } catch (error) {
        console.log('errorrrrrrrrrff', error)
    }
}

useEffect(() => {
    fetchPillarDetails()
    fetchSinglePillar()
}, [userToken])

// const singleProject = singlePillar.find((item) => item.id === Number(id))
console.log('snngle', typeof singlePillar)

// console.log(pillars)

const fetchData = async () => {
    try {
        const res = await axios.post(
            'https://spms.telexcoresources.com.ng/api/v1/project/viewbystatus',
            {
                pillarid: id,
                projectstatus: 'approved',
                iconic: 'no'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            }
        )
        setBarchart(res.data.data)
        // console.log('resssss', res.data.data)
    } catch (error) {
        console.log(error)
    }
}
const fetchData2 = async () => {
    try {
        const res = await axios.get(
            `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/${id}/iconic`,

            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            }
        )
        setPiechart(res.data.data)
        // console.log('resssss', res.data.data)
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    fetchData()
    fetchData2()
}, [])

// charts
ChartJs.register(BarElement, Tooltip, Legend, Title, ArcElement, LinearScale, CategoryScale)

const colors = [
    {
        color: 'FFBB28'
    },
    {
        color: '1c4e8d'
    },
    {
        color: 'ff4b2b'
    },
    {
        color: '00C49F'
    },
    {
        color: 'FF8042'
    },
    {
        color: '6a1b9a'
    }
]
const datas = {
    labels: barchart.map((project) => project.projectname),
    datasets: [
        {
            label: barchart.map((project) => project.projectname),
            backgroundColor: pillars.map((colors) => colors.color),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            // hoverBorderColor: 'rgba(75, 192, 192, .75)',
            data: barchart.map((project) => project.status)
        }
    ]
}
const datas2 = {
    labels: piechart.map((project) => project.projectname),
    datasets: [
        {
            label: piechart.map((project) => project.projectname),
            backgroundColor: pillars.map((colors) => colors.color),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            plugins: ['22', '33'],

            // hoverBorderColor: 'rgba(75, 192, 192, .75)',
            data: piechart.map((project) => project.status)
        }
    ]
}

const options = {
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                padding: 10,
                boxHeight: 50,
            }
        }
    },
    layout: {
        padding: {
            top: 10
            // bottom : 10
        }
    },
    responsive: true,
    maintainAspectRatio: false
}

console.log('bar', barchart)
console.log('pie', piechart)

return (
    <>
        {isOpen ? (
            <Modal setIsOpen={setIsOpen} />
        ) : (
            <div className="relative pl-44 lg:pl-0 bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <h2 className="text-gray-900 font-bold text-xl pl-2 mb-10 ">Current Projects Details</h2>
                <strong className="text-gray-700 pl-2 font-bold">{pillarName.pillarname}</strong>

                <input
                    type="hidden"
                    name="pillarid"
                    value={pillarid}
                    onChange={(e) => setPillarid(e.target.value)}
                />
                <input type="hidden" name="iconic" value={iconic} onChange={(e) => setIconic(e.target.value)} />
                <input
                    type="hidden"
                    name="projectstatus"
                    value={projectstatus}
                    onChange={(e) => setProjectstatus(e.target.value)}
                />
                <div className=" lg:pl-0 border-x border-gray-200 rounded-sm mt-3 ">
                    <table className="w-full  relative text-gray-700 mt-9">
                        <thead>
                            <button
                                onClick={openModal}
                                className="text-white bg-green-700 absolute right-4 -top-12 px-6 py-2"
                            >
                                Add New Project
                            </button>
                            <tr className="mt-8">
                                <th>Project Name</th>
                                <th>Contractor Name</th>
                                <th> Amount</th>
                                <th>Award Date</th>
                                <th>Delivery Date</th>
                                <th>Project Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <p className="flex items-center justify-end w-full py-20 pl-20 mr-96">
                                <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                            </p>
                        ) : (
                            <tbody>
                                {singlePillar.map((project) => (
                                    <>
                                        <tr
                                            key={project.id}
                                            className={
                                                project.iconic === 'yes'
                                                    ? 'bg-red-100 text-[#D1D100] font-semibold mb-9'
                                                    : 'mb-7'
                                            }
                                        >
                                            <td className="">
                                                <Link
                                                    to={`/project_info/${project.id}`}
                                                    className={
                                                        project.iconic === 'yes'
                                                            ? 'text-[#D1D100] font-semibold hover:no-underline'
                                                            : 'hover:no-underline text-black'
                                                    }
                                                >
                                                    {project.projectname}
                                                </Link>
                                            </td>
                                            <td> {project.contractor}</td>
                                            <td> {project.amount}</td>
                                            <td> {project.award_date}</td>
                                            <td> {project.delivery_date}</td>

                                            <td>{<Progress completed={project.status} />}</td>
                                            <td className=" grid grid-cols-3 space-x-2">
                                                <button
                                                    onClick={() => navigate(`/project_info/${project.id}`)}
                                                    className=" bg-blue-700 text-white py-1 px-3"
                                                >
                                                    Comment
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/project_info/${project.id}`)}
                                                    className="bg-green-700 text-white py-1 px-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/project_info/${project.id}`)}
                                                    className="bg-[#FF0000] text-white py-1 px-3"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className="mt-10">
                    <h2 className="text-xl font-semiboldbold text-black text-center">Chart Details</h2>
                    <div className=" w-full flex justify-between ">
                        {barchart.length && (
                            <div className="mt-3 w-[48%] gap-x-4  h-[22rem] py-5 flex-1 text-xs">
                                <Bar data={datas} options={options} />
                            </div>
                        )}
                        {piechart.length && (
                            <div className="w-1/2  h-[22rem] ml-48 lg:ml-0 bg-white p-4 rounded-sm border border-gray-200 flex flex-col ">
                                <Pie data={datas2} options={options} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
)
}

export default Common
