import { AiFillCodeSandboxCircle } from 'react-icons/ai'

import { MdOutlineAgriculture } from 'react-icons/md'

import { SiXdadevelopers, SiRelianceindustrieslimited } from 'react-icons/si'
import { AiOutlinePartition } from 'react-icons/ai'
import { RiGovernmentFill } from 'react-icons/ri'

export const projectInfo = [
    {
        id: '1',
        title: ' Youth Development and Job Creation',
        label: [
            {
                name: 'Information and Technology Hub at Ado-Ekit',
                progress: 50
            }
        ],
        path: '/pillars',
        bgColor: '#FFBB28',
        no_trained: 80,
        no_employed: 30,
        solutions: 10,
        icon: <AiFillCodeSandboxCircle size={70} className="" />
    },
    {
        id: '2',
        title: '  Human Capital Development',
        label: [
            {
                name: 'Provision of free books to primary school students',
                progress: 40
            }
        ],
        path: 'human_capital',
        bgColor: '#1c4e8d',
        no_trained: 70,
        no_employed: 30,
        solutions: 10,
        icon: <SiXdadevelopers size={70} />
    },
    {
        id: '3',
        title: 'Agricultural and Rural Development',
        label: [
            {
                name: 'Free land cultivation service to registered farmers',
                progress: 90
            }
        ],
        path: '/agriculture',
        bgColor: '#ff4b2b',
        no_trained: 80,
        no_employed: 30,
        solutions: 10,
        icon: <MdOutlineAgriculture size={70} />
    },
    {
        id: '4',
        title: ' Infrastructure and Industralization',
        label: [
            {
                name: 'Construction of Ado-Adramoko road',
                progress: 30
            }
        ],
        path: '/infrastructure',
        bgColor: '#00C49F',

        no_trained: 80,
        no_employed: 30,
        solutions: 10,
        icon: <SiRelianceindustrieslimited size={70} />
    },
    {
        id: '5',
        title: 'Arts Culture and Tourism',
        label: [
            {
                name: 'Rehabitation and beautification of ijinle resort',
                progress: 50
            }
        ],
        path: '/arts',
        bgColor: '#FF8042',
        no_trained: 80,
        no_employed: 30,
        solutions: 10,
        icon: <AiOutlinePartition size={70} />
    },
    {
        id: '6',
        title: 'Governance',
        label: [
            {
                name: 'Governance',
                progress: 60
            }
        ],
        path: '/governance',
        bgColor: '#6a1b9a',
        no_trained: 80,
        no_employed: 30,
        solutions: 10,
        icon: <RiGovernmentFill size={70} className="text-white" />
    }
]
