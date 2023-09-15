import React from 'react'
import { PieChart, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useStateContext } from '../context/contextProvider'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'

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
    const { pillars } = useStateContext()

    const datas = {
        labels: pillars.map((pillar) => pillar.pillarname),
        datasets: [
            {
                label: 'Projects',
                backgroundColor: pillars.map((colors) => colors.color),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: pillars.map((colors) => colors.color),
                // hoverBorderColor: 'rgba(75, 192, 192, .75)',
                data: [2, 4, 4, 3, 1, 5]
            }
        ]
    }
    return (
        <div className="w-[20rem] h-[22rem] ml-28 lg:ml-0 bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
            <strong className="text-gray-700 font-medium"></strong>
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
                <Pie data={datas} />
            </div>
        </div>
    )
}
