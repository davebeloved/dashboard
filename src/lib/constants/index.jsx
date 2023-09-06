import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'
import { GiMucousPillar } from 'react-icons/gi'
import { AiOutlineProject } from 'react-icons/ai'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    // {
    //     key: 'pillars',
    //     label: 'Pillars',
    //     path: '#',
    //     icon: <HiOutlineCube />,
    //     childrens: [
    //         {
    //             id: 1,
    //             label: 'Youth Dev/Job Creation',
    //             path: '/youth'
    //         },
    //         {
    //             id: 2,
    //             label: 'Human Capital',
    //             path: '/human_capital'
    //         },
    //         {
    //             id: 3,
    //             label: 'Agriculture/Rural Dev',
    //             path: '/agriculture'
    //         },
    //         {
    //             id: 4,
    //             label: 'Infrastructure/Industrialization',
    //             path: '/infrastructure'
    //         },
    //         {
    //             id: 5,
    //             label: 'Arts,cultuure/tourism',
    //             path: '/arts'
    //         },
    //         {
    //             id: 6,
    //             label: 'Gorvernce',
    //             path: 'governance'
    //         }
    //     ]
    // },
    {
        key: 'pillars',
        label: 'Pillars',
        path: '#',
        icon: <GiMucousPillar />
    },
    {
        key: 'projects',
        label: 'Project',
        path: '#',
        icon: <AiOutlineProject />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
