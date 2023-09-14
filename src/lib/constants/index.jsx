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
import { FcApproval } from 'react-icons/fc'
import { AiOutlineProject, AiOutlineVerified } from 'react-icons/ai'

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
        key: 'verification',
        label: 'Awaiting Verification',
        path: '/awaiting_verification',
        icon: <AiOutlineVerified />
    },
    {
        key: 'approval',
        label: 'Awaiting Approval',
        path: '/awaiting_approval',
        icon: <FcApproval />
    },
    {
        key: 'projects',
        label: 'Project',
        path: '/projects',
        icon: <AiOutlineProject />
    }
    // {
    //     key: 'chartss',
    //     label: 'Chart',
    //     path: '/charts',
    //     icon: <AiOutlineProject />
    // }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '#',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '#',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
