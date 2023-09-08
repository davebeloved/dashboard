import React, { useEffect } from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import RecentOrders from '../components/RecentOrders'
import BuyerProfilePieChart from '../components/BuyerProfilePieChart'
import PopularProducts from '../components/PopularProducts'

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 px-20 lg:pl-0">
            <DashboardStatsGrid />

            <div className="flex flex-col lg:flex-row lg:pl-10 gap-4 lg:w-full">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
                {/* <RecentOrders />
				<PopularProducts /> */}
            </div>
        </div>
    )
}