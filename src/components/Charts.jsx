import React, { useEffect, useState } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useStateContext } from '../context/contextProvider'
import axios from 'axios'
import { Bar, Pie } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJs, LinearScale } from 'chart.js'
import { useParams } from 'react-router-dom'
import PiechartIconic from './PiechartIconic'
import Pie2 from './Pie2'
import Pie3 from './Pie3'
import Pie4 from './Pie4'
import Pie5 from './Pie5'
import Pie6 from './Pie6'

export default function Charts() {
    const [pillarid, setPillarid] = useState('')
    const [projectstatus, setProjectstatus] = useState('')
    const [iconic, setIconic] = useState('')
    const { userToken, pillars } = useStateContext()
    const [dataVerify, setDataVerify] = useState([])
    const [barchart, setBarchart] = useState([])
    const [barchart2, setBarchart2] = useState([])
    const [barchart3, setBarchart3] = useState([])
    const [barchart4, setBarchart4] = useState([])
    const [barchart5, setBarchart5] = useState([])
    const [barchart6, setBarchart6] = useState([])
    const [approve, setApprove] = useState([])
    const [newArray, setNewArray] = useState([])

    const approveProject = async () => {
        try {
            if (userToken) {
                const res = await axios.post(
                    `https://spms.telexcoresources.com.ng/api/v1/project/pillar`,
                    {
                        projectstatus: 'approved'
                    },

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                // console.log('newdataaa', res.data.data)

                setApprove(res.data.data)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }

    const fetchData = async (item) => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus',
                {
                    pillarid: 4,
                    projectstatus: 'approved'
                    // iconic: 'no'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            // setBarchart([...barchart, ...res.data.data])
            setBarchart(res.data.data)
            // console.log('resssss', res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData2 = async (item) => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus',
                {
                    pillarid: 5,
                    projectstatus: 'approved'
                    // iconic: 'no'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            // setBarchart([...barchart, ...res.data.data])
            setBarchart2(res.data.data)
            // console.log('resssss', res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData3 = async (item) => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus',
                {
                    pillarid: 6,
                    projectstatus: 'approved'
                    // iconic: 'no'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            // setBarchart([...barchart, ...res.data.data])
            setBarchart3(res.data.data)
            // console.log('resssss', res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData4 = async (item) => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus',
                {
                    pillarid: 7,
                    projectstatus: 'approved'
                    // iconic: 'no'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            // setBarchart([...barchart, ...res.data.data])
            setBarchart4(res.data.data)
            // console.log('resssss', res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData5 = async (item) => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus',
                {
                    pillarid: 8,
                    projectstatus: 'approved'
                    // iconic: 'no'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            // setBarchart([...barchart, ...res.data.data])
            setBarchart5(res.data.data)
            // console.log('resssss', res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData6 = async (item) => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/viewallstatus',
                {
                    pillarid: 9,
                    projectstatus: 'approved'
                    // iconic: 'no'
                },

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )

            // setBarchart([...barchart, ...res.data.data])
            setBarchart6(res.data.data)
            // console.log('resssss', res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const projectId = approve.map((id) => id.pillarid)
    console.log('dddddkkkk', projectId)
    // projectId.forEach((item) => {
    //     fetchData(item)
    // })

    useEffect(() => {
        approveProject()
        fetchData()
        fetchData2()
        fetchData3()
        fetchData4()
        fetchData5()
        fetchData6()
    }, [])

    // console.log('chartttttt', pillars)

    // getting all approved projects
    console.log('approveddd', approve)

    // console.log('barchattttbar', barchart)

    const pillaridx = pillars.map((item) => item.id)

    ChartJs.register(BarElement, LinearScale, CategoryScale)

    const datas = {
        labels: barchart.map((pillar) => pillar.projectname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart.map((stat) => stat.status)
            }
        ]
    }

    const data2 = {
        labels: barchart2.map((pillar) => pillar.projectname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart2.map((stat) => stat.status)
            }
        ]
    }
    const data3 = {
        labels: barchart3.map((pillar) => pillar.projectname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart3.map((stat) => stat.status)
            }
        ]
    }
    const data4 = {
        labels: barchart4.map((pillar) => pillar.projectname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart4.map((stat) => stat.status)
            }
        ]
    }
    const data5 = {
        labels: barchart5.map((pillar) => pillar.projectname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart5.map((stat) => stat.status)
            }
        ]
    }
    const data6 = {
        labels: barchart6.map((pillar) => pillar.projectname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart6.map((stat) => stat.status)
            }
        ]
    }

    const datas2 = {
        labels: barchart.map((project) => project.projectname),
        datasets: [
            {
                label: barchart.map((project) => project.projectname),
                backgroundColor: ['#FFBB28', '#1c4e8d', '#ff4b2b', '#00C49F', '#FF8042', '#6a1b9a'],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,

                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: ['33']
            }
        ]
    }
    const options = {
        plugins: {
            outlabels: {
                text: '%l %p',
                color: 'white',
                stretch: 35,
                font: {
                    resizable: true,
                    minSize: 12,
                    maxSize: 18
                }
            },
            legend: {
                display: false,
                position: 'top',

                labels: {
                    padding: 10,
                    boxWidth: 15
                }
            },
            datalabels: {
                display: true,
                align: 'bottom',
                backgroundColor: '#ccc',
                // borderRadius: 5,
                font: {
                    size: 18
                }
            }
        },
        // layout: {
        //     padding: {
        //         top: 10
        //         // bottom : 10
        //     }
        // },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            labels: {
                fontSize: 200,
                borderRadius: 50
            }
        }
    }

    console.log('charttt', barchart)
    return (
        <div className=" pl-28 lg:pl-0 bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 pl-5 mb-7 font-medium">Chart Details</strong>
            <div className=" w-full grid grid-cols-2  gap-10  ">
                <div className="border border-neutral-600 rounded-lg p-4">
                    <h2 className="text-neutral-500">Youth Development and Job Creation</h2>
                    <div className="grid grid-cols-2">
                        <div className="mt-3  lg:w-56 h-56 pr-4">
                            <Bar data={datas} options={options} />
                        </div>
                        {/* <Pie data={datas2} options={options} /> */}
                        <div className="w-full  lg:ml-0 pr-4">
                            <PiechartIconic />
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-600 rounded-lg p-4">
                    <h2 className="text-neutral-500"> Human Capital Development</h2>
                    <div className="grid grid-cols-2">
                        <div className="mt-3  lg:w-56 h-56 pr-4">
                            <Bar data={data2} options={options} />
                        </div>
                        {/* <Pie data={datas2} options={options} /> */}
                        <div className="w-full  lg:ml-0 pr-5">
                            <Pie2 />
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-600 rounded-lg p-4">
                    <h2 className="text-neutral-500"> Agricultural and Rural Development</h2>
                    <div className="grid grid-cols-2">
                        <div className="mt-3  lg:w-56 h-56 pr-4">
                            <Bar data={data3} options={options} />
                        </div>
                        {/* <Pie data={datas2} options={options} /> */}
                        <div className="w-full  lg:ml-0 pr-5">
                            <Pie3 />
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-600 rounded-lg p-4">
                    <h2 className="text-neutral-500"> Infrastructure and Industralization</h2>
                    <div className="grid grid-cols-2">
                        <div className="mt-3  lg:w-56 h-56 pr-4">
                            <Bar data={data4} options={options} />
                        </div>
                        {/* <Pie data={datas2} options={options} /> */}
                        <div className="w-full  lg:ml-0 pr-5">
                            <Pie4 />
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-600 rounded-lg p-4">
                    <h2 className="text-neutral-500"> Arts Culture and Tourism</h2>
                    <div className="grid grid-cols-2">
                        <div className="mt-3  lg:w-56 h-56 pr-4">
                            <Bar data={data5} options={options} />
                        </div>
                        {/* <Pie data={datas2} options={options} /> */}
                        <div className="w-full  lg:ml-0 pr-5">
                            <Pie5 />
                        </div>
                    </div>
                </div>
                <div className="border border-neutral-600 rounded-lg p-4">
                    <h2 className="text-neutral-500"> Governance</h2>
                    <div className="grid grid-cols-2">
                        <div className="mt-3  lg:w-56 h-56 pr-4 ">
                            <Bar data={data6} options={options} />
                        </div>
                        {/* <Pie data={datas2} options={options} /> */}
                        <div className="w-full  lg:ml-0 pr-5">
                            <Pie6 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{
    /* <ResponsiveContainer width="100%" height="100%">
    <BarChart
        width={500}
        height={300}
        data={pillars}
        margin={{
            top: 20,
            right: 10,
            left: -10,
            bottom: 0
        }}
    >
        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
        <XAxis dataKey="" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */
}
// <Bar dataKey="pillarname" fill="#0ea5e9" />
// <Bar dataKey="pillars" fill="#ea580c" />
// </BarChart>
// </ResponsiveContainer>
