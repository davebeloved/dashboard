import React, { useEffect, useState } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useStateContext } from '../context/contextProvider'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJs, LinearScale } from 'chart.js'
import { useParams } from 'react-router-dom'

const data = [
    {
        name: 'Jan',
        Expense: 4000,
        Income: 2400
    },
    {
        name: 'Feb',
        Expense: 3000,
        Income: 1398
    },
    {
        name: 'Mar',
        Expense: 2000,
        Income: 9800
    },
    {
        name: 'Apr',
        Expense: 2780,
        Income: 3908
    },
    {
        name: 'May',
        Expense: 1890,
        Income: 4800
    },
    {
        name: 'Jun',
        Expense: 2390,
        Income: 3800
    },
    {
        name: 'July',
        Expense: 3490,
        Income: 4300
    },
    {
        name: 'Aug',
        Expense: 2000,
        Income: 9800
    },
    {
        name: 'Sep',
        Expense: 2780,
        Income: 3908
    },
    {
        name: 'Oct',
        Expense: 1890,
        Income: 4800
    },
    {
        name: 'Nov',
        Expense: 2390,
        Income: 3800
    },
    {
        name: 'Dec',
        Expense: 3490,
        Income: 4300
    }
]

export default function TransactionChart() {
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
            const res = await axios.get(
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/4/noniconic`,

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
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/5/noniconic`,

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
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/6/noniconic`,

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
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/7/noniconic`,

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
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/8/noniconic`,

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
                `https://spms.telexcoresources.com.ng/api/v1/project/dashboardchart/9/noniconic`,

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
        // labels: ['1', '2', '3', '4', '5', '6'],
        labels: pillars.map((pillar) => pillar.pillarname),
        // labels: pillars.map((pillar) => pillar.pillarname.substring(0, 5)),
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
        ]
    }

    console.log('charttt', barchart)
    return (
        // <div className="charts">
        <div className="w-[22rem] lg:w-full bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 pl-5  font-medium">Chart Info</strong>
            <div className="mt-3  lg:w-full flex-1 text-xs">
                <input type="hidden" name="pillarid" value={pillarid} onChange={(e) => setPillarid(e.target.value)} />
                <input
                    type="hidden"
                    name="projectstatus"
                    value={projectstatus}
                    onChange={(e) => setProjectstatus(e.target.value)}
                />
                <input type="hidden" name="iconic" value={iconic} onChange={(e) => setIconic(e.target.value)} />

                <Bar data={datas} />
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
