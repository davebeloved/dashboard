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

export default function Pie3() {
    ChartJs.register(BarElement, ArcElement, LinearScale, CategoryScale)
    const { pillars, userToken } = useStateContext()
    const [approve, setApprove] = useState([])

    const [barchart, setBarchart] = useState([])

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
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/6/iconic`,

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

    const projectId = approve.map((id) => id.pillarid)
    console.log('dddddkkkk', projectId)
    // projectId.forEach((item) => {
    //     fetchData(item)
    // })

    useEffect(() => {
        approveProject()
        fetchData()
    }, [])

    console.log('iniddd', barchart)

    const datas = {
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: barchart.map((p) => p.status)
            }
        ],
        labels: barchart.map((pillar) => pillar.projectname)
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
        <div>
            <Pie data={datas} options={options} />
        </div>
    )
}
