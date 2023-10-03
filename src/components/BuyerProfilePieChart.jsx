import React, { useEffect, useState } from 'react'
import { PieChart, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useStateContext } from '../context/contextProvider'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

import { Pie } from 'react-chartjs-2'
import axios from 'axios'

const data = [
    { name: 'Income', value: 540 },
    { name: 'Expenditure', value: 620 },
    { name: 'Other', value: 210 }
]

const RADIAN = Math.PI / 180
const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

export default function BuyerProfilePieChart() {
    ChartJs.register(BarElement, ArcElement, LinearScale, CategoryScale)
    const { pillars, userToken } = useStateContext()

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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/4/iconic`,

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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/5/iconic`,

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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/6/iconic`,

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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/7/iconic`,

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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/8/iconic`,

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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/9/iconic`,

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

    console.log('-----', barchart)

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

    const datas = {
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: [
                    barchart.length,
                    barchart2.length,
                    barchart3.length,
                    barchart4.length,
                    barchart5.length,
                    barchart6.length
                ]
            }
        ],
        labels: pillars.map((pillar) => pillar.pillarname)
        // labels: pillars.map((pillar) => pillar.pillarname.substring(0, 5))
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex]
                    const total = dataset.data.reduce((acc, value) => acc + value, 0)
                    const value = dataset.data[tooltipItem.index]
                    const percentage = ((value / total) * 100).toFixed(2)
                    return `${data.labels[tooltipItem.index]}: ${percentage}%`
                }
            }
        }
    }
    return (
        <div className="w-[26rem] lg:w-full h-[22rem] mb-10 lg:ml-0 bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
            {/* <div className="w-[20rem] h-[22rem] ml-28 lg:ml-0 bg-white p-4 rounded-sm border border-gray-200 flex flex-col"> */}
            <strong className="text-gray-700 font-medium">Pie Chart</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                {/* <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pillars}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#FF8042"
                            dataKey="value"
                        >
                            {pillars.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        {/* <Legend /> */}
                {/* </PieChart> */}
                {/* </ResponsiveContainer> */}
                <Pie data={datas} options={options} />
            </div>
        </div>
    )
}
