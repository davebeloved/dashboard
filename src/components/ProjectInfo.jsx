import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { projectInfo } from '../data'
import DetailsModal from './DetailsModal'
import { useStateContext } from '../context/contextProvider'
import axiosClient from '../store/axios'
import axios from 'axios'
import Loader from './Loader'
import { getPillar1 } from '../utils/getPillars'
import Priority from './Priority'
import { FaAngleRight } from 'react-icons/fa'

const ProjectInfo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { projectDetail, pillars, userToken } = useStateContext()
    const [projectid, setProjectid] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [singleDetails, setSingleDetails] = useState([])
    const [projectComments, setProjectComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [singlePillarProject, setSinglePillarProject] = useState([])
    const [details, setDetails] = useState([])
    const [Base64Image, setBase64Image] = useState('')
    const [getId, setGetId] = useState([])
    const [iconics, setIconics] = useState('')
    
    const [nameOfPillar, setNameOfPillar] = useState([])
    // console.log('detailssss', projectDetail)
    const { id } = useParams()

    // const singleProject = pillars.find((item) => item.id === Number(id))

    // const openModal = () => {
    //     setIsOpen(!isOpen)
    // }
    const closeModal = () => {
        setIsOpen(false)
    }

    const pills = pillars.map((x) => x)
    console.log('pillllllll', pills)

    // https://spms.telexcoresources.com.ng/api/v1/project/pillar/4/view

    const fetchId = async () => {
        try {
            if (userToken) {
                setLoading(true)
                const res = await axios.get(
                    `https://spms.telexcoresources.com.ng/api/v1/project/view/all`,

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                console.log('kingdaveeeeesssss ', res.data.data)
                setGetId(res.data.data.find((X) => X.id === Number(id)))

                setLoading(false)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }
    const setPill = () => {
        const n = pillars.find((a) => a.id === getId.pillarid)
        console.log('nnnnnnnnnn', n)
        return n
    }

    useEffect(() => {
        setPill()
    }, [getId.pillarid])

    // useEffect(() => {
    //     fetchId()
    // }, [userToken])
    // const newId = getId.pillarid

    const fetchSinglePillar = async () => {
        try {
            await fetchId()

            if (userToken && getId.pillarid) {
                setLoading(true)

                const res = await axios.get(
                    `https://spms.telexcoresources.com.ng/api/v1/project/pillar/${getId.pillarid}/view`,

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                console.log('newdataaafrom dave', res.data.data)
                setSinglePillarProject(res.data.data.find((X) => X.id === Number(id)))

                setLoading(false)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }
    const fetchPillars = async () => {
        try {
            await fetchId()

            if (userToken && getId.pillarid) {
                setLoading(true)

                const res = await axios.get(
                    `https://spms.telexcoresources.com.ng/api/v1/pillar/view/all`,

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                // console.log('newdataaafrom dave', res.data.data)
                setNameOfPillar(res.data.data.find((X) => X.id === getId.pillarid))

                setLoading(false)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }

    useEffect(() => {
        fetchSinglePillar()
        fetchPillars()
    }, [userToken, getId.pillarid])

    // const newp = singlePillarProject.map((x) => x)
    console.log('singgggggg', singlePillarProject)
    console.log('daveidddddddd', getId)

    // setDetails(newp.find((a) => a.id === Number(id)))
    //    console.log('dddavvvvvvv', details)
    //    console.log('dddavvvvvvv', projectDet)

    // for (let i = 0; i < newp.length; i++) {
    //     if (newp[i].id === Number(id)) {
    //         const n = newp.find((a)=>a.id === Number(id))
    //         console.log('davidson', n)

    //         break
    //         setProjectDet(n)
    //     } else {
    //         console.log('nothhng')
    //     }
    // }
    // console.log('sussssssss2', id)

    const uploadUrl = `https://spms.telexcoresources.com.ng/uploads/`

    const fetchSingleDetails = async () => {
        try {
            if (userToken) {
                setLoading(true)
                const res = await axios.get(
                    `https://spms.telexcoresources.com.ng/api/v1/project/details/${id}/view`,

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                console.log('dave', res.data.data)
                setSingleDetails(res.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }
    useEffect(() => {
        fetchSingleDetails()
    }, [userToken])

    const fetchComments = async () => {
        try {
            if (userToken) {
                setLoading(true)
                const res = await axios.get(
                    `https://spms.telexcoresources.com.ng/api/v1/comments/${id}/view`,

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                // console.log('newdataaa1111', res.data.data)
                setProjectComments(res.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }
    useEffect(() => {
        fetchComments()
    }, [userToken])

    console.log('sssssss', singleDetails)

    const addComment = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosClient.post('v1/comments/add', {
                projectid: id,
                name,
                comment
            })
            window.location.reload()
            setComment('')
            setName('')
            console.log(res)
            console.log('success')
        } catch (error) {
            console.log(error)
        }
    }

    const [isToggled, setIsToggled] = useState(getId.iconic === 'yes' ? true : false)

    const togglePriority = async (e) => {
        try {
            if (getId.iconic === 'no') {
                const res = await axios.post(
                    `https://spms.telexcoresources.com.ng/api/v1/project/${getId.id}/priority`,
                    {
                        iconic: 'yes'
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                setIsToggled(true)
                window.location.reload()

                console.log(res)
                console.log('success')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const togglePriorityOff = async (e) => {
        try {
            if (getId.iconic === 'yes') {
                const res = await axios.post(
                    `https://spms.telexcoresources.com.ng/api/v1/project/${getId.id}/priority`,
                    {
                        iconic: 'no'
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                setIsToggled(false)
                window.location.reload()

                console.log(res)
                console.log('success')
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log('thhhsisi---', projectComments)

    const handleToggle = (e) => {
        setIconics(e.target.value)
        if (getId.iconic === 'no') {
            setIsToggled(true)
            togglePriority()
        }
        if (getId.iconic === 'yes') {
            setIsToggled(false)

            togglePriorityOff()
        }
    }

    useEffect(() => {
        if (getId.iconic === 'yes') {
            setIsToggled(true)
        }
        if (getId.iconic === 'no') {
            setIsToggled(false)
        }
    }, [iconics])
 
    const {pathname} = useLocation()
    const activePath = pathname === `/project_info/${id}`

    console.log('mmmmmmmmmmm', activePath)
    return (
        <>
            {/* {isOpen ? (
                <DetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (

            )} */}
            <div className="relative bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <div className="flex items-center gap-x-2 mb-8">
                    <Link
                        className="flex items-center gap-x-1 text-gray-400 text-lg hover:text-gray-800 transition-all duration-300 hover:no-underline"
                        to="/"
                    >
                        Dashboard <FaAngleRight />{' '}
                    </Link>
                    <Link
                        className="flex items-center gap-x-1 text-gray-400 text-lg hover:text-gray-800 transition-all duration-300 hover:no-underline"
                        to={`/pillars/${getId.pillarid}`}
                    >
                        {nameOfPillar.pillarname} <FaAngleRight />{' '}
                    </Link>
                    <Link
                        className={`${
                            activePath
                                ? 'flex items-center gap-x-1 text-gray-800 text-lg  hover:no-underline'
                                : 'flex items-center gap-x-1 text-gray-400 text-lg hover:text-gray-800 transition-all duration-300 hover:no-underline'
                        }`}
                        to=""
                    >
                        {singlePillarProject.projectname}{' '}
                    </Link>
                </div>
                <h2 className="text-gray-900 font-bold text-xl">Project Details</h2>
                <div className="flex justify-end mb-8">
                    {/* <Priority togglePriority={togglePriority} iconic={iconic} setIconic={setIconic}/> */}
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isToggled}
                                onChange={handleToggle}
                                value={iconics}
                                name="iconics"
                            />
                            <div className="toggle-switch__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                            <div
                                className={`toggle-switch__dot absolute -top-1 w-6 h-6 ${
                                    getId.iconic === 'yes' ? 'bg-[#31c110]' : 'bg-gray-300'
                                } rounded-full shadow-md transform ${
                                    getId.iconic === 'yes' ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            ></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium ml-3">Set Priority</div>
                    </label>
                </div>
                <div className="flex flex-col gap-x-5">
                    <div className="flex  gap-x-5 mb-7">
                        <div className="w-full h-[300px]">
                            <img
                                src={`${uploadUrl}${singlePillarProject.image}`}
                                alt="image"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="h-[300px] w-full">
                            <video
                                src={`${uploadUrl}${singlePillarProject.video}`}
                                controls
                                className="w-full h-full object-cover object-center"
                            ></video>
                        </div>
                    </div>
                    <div className="mb-10  p-4 gap-5 grid grid-cols-3">
                        <h2 className="text-gray-400 bg-white shadow-lg p-3 font-sans rounded-md font-semibold text-sm uppercase flex flex-col items-center">
                            project name{' '}
                            <span className="font-semibold text-xl text-gray-800">
                                {singlePillarProject.projectname}
                            </span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 rounded-md font-semibold text-sm uppercase flex flex-col items-center">
                            contractor{' '}
                            <span className="text-xl font-semibold text-gray-800">
                                {singlePillarProject.contractor}
                            </span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 rounded-md font-semibold text-sm uppercase flex flex-col items-center">
                            local government area{' '}
                            <span className="text-xl font-semibold text-gray-800">{singlePillarProject.lga}</span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 py-6 rounded-md font-semibold text-sm uppercase flex flex-col items-center">
                            project status{' '}
                            <span
                                className={
                                    singlePillarProject.projectstatus === 'approved'
                                        ? 'text-xl font-semibold text-green-700'
                                        : 'text-xl font-semibold text-gray-800'
                                }
                            >
                                {singlePillarProject.projectstatus}
                            </span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 py-6 rounded-mdfont-semibold text-sm uppercase flex flex-col items-center">
                            weight{' '}
                            <span className="text-xl font-semibold text-gray-800">{singlePillarProject.weight}</span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 py-6 rounded-mdfont-semibold text-sm uppercase flex flex-col items-center">
                            amount:{' '}
                            <span className="text-xl font-semibold text-gray-800">{singlePillarProject.amount}</span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 py-6 rounded-mdfont-semibold text-sm uppercase flex flex-col items-center">
                            award date{' '}
                            <span className="text-xl font-semibold text-gray-800">
                                {singlePillarProject.award_date}
                            </span>
                        </h2>
                        <h2 className="text-gray-400 font-sans bg-white shadow-lg p-3 py-6 rounded-mdfont-semibold text-sm uppercase flex flex-col items-center">
                            delivery date{' '}
                            <span className="text-xl font-semibold text-gray-800">
                                {singlePillarProject.delivery_date}
                            </span>
                        </h2>
                    </div>
                </div>

                {/* <strong className="text-gray-700 font-bold">Projects Outcome</strong> */}
                <div className="border-x border-gray-200 rounded-sm mt-3 grid grid-cols-2 gap-x-10">
                    <div>
                        <table className="w-full text-gray-700">
                            <thead>
                                <tr>
                                    <th>Indicators</th>
                                    <th>Details</th>
                                </tr>
                                {/* <button
                                    onClick={openModal}
                                    className="text-white bg-green-700 px-6 py-2 absolute right-3 top-16"
                                >
                                    Add Details
                                </button> */}
                            </thead>
                            {loading ? (
                                <Loader />
                            ) : (
                                <tbody>
                                    {singleDetails.map((detail) => {
                                        const { id, indicator, details } = detail
                                        return (
                                            <tr key={id} className="">
                                                <td>{indicator}</td>
                                                <td>{details}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            )}
                        </table>
                        <DetailsModal />
                    </div>
                    <div className="px-6 py-4 -mt-10">
                        <div className="mt-7 mb-5 ">
                            <h2 className="bg-[#F5F5F5] py-3 pl-2 font-bold text-black mb-3">
                                Project Comments ({projectComments.length})
                            </h2>

                            {loading ? (
                                <Loader />
                            ) : (
                                <>
                                    {projectComments.map((comment) => {
                                        return (
                                            <div className="bg-neutral-100 mb-3 p-3">
                                                <h3 className="font-bold text-lg text-black"> {comment.name}</h3>
                                                <p className="italic text-gray-600">{comment.comment}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                        <div className="">
                            <label className="font-bold pb-9 text-black ">Add a Comment</label>
                            <input
                                type="hidden"
                                name="projectid"
                                value={projectid}
                                placeholder="projectid"
                                className="w-full p-3 outline-none border border-neutral-600 mt-7 mb-3 text-black"
                                onChange={(e) => setProjectid(e.target.value)}
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your Name"
                                className="w-full p-3 outline-none border text-black border-neutral-600 mb-3"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <textarea
                                type="text"
                                name="comment"
                                placeholder="Enter your comment"
                                className="w-full p-3 outline-none border text-black border-neutral-600 mb-4"
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button onClick={addComment} className="bg-gray-600 py-2 px-5 text-white">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectInfo
