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
import { FcDisapprove } from 'react-icons/fc'
import { GiMucousPillar } from 'react-icons/gi'
import { FcApproval, FcApprove } from 'react-icons/fc'
import { AiOutlineProject, AiOutlineVerified, AiOutlineBarChart } from 'react-icons/ai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHexagonCheck} from 'react-icons/fa'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
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
    // {
    //     key: 'pillars',
    //     label: 'Pillars',
    //     path: '#',
    //     icon: <GiMucousPillar />
    // },
    {
        key: 'verification',
        label: 'Awaiting Verification',
        path: '/awaiting_verification',
        icon: (
            <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: '#fff' }}
                className="bg-[#b52a12] rounded-full border-none"
            />
        )
    },
    {
        key: 'approval',
        label: 'Awaiting Approval',
        path: '/awaiting_approval',
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#fff' }} className="bg-[#dfc30c] rounded-full" />
    },
    {
        key: 'projects',
        label: 'Approved Project',
        path: '/projects',
        icon: <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#fff' }} className="bg-[#31c110] rounded-full" />
    },
    {
        key: 'chartss',
        label: 'Chart',
        path: '/charts',
        icon: <AiOutlineBarChart />
    }
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
