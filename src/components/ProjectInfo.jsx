import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projectInfo } from '../data'
import DetailsModal from './DetailsModal'
import { useStateContext } from '../context/contextProvider'
import axiosClient from '../store/axios'
import axios from 'axios'
import Loader from './Loader'
import { getPillar1 } from '../utils/getPillars'
import Priority from './Priority'

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

    // console.log('detailssss', projectDetail)
    const { id } = useParams()

    const singleProject = pillars.find((item) => item.id === Number(id))

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

    useEffect(() => {
        fetchSinglePillar()
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

    // console.log('immmmmmmm', singlePillarProject.image)

    return (
        <>
            {/* {isOpen ? (
                <DetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (

            )} */}
            <div className="relative bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <h2 className="text-gray-900 font-bold text-xl mb-10">Project Details</h2>
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
                    <div className="mb-5">
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            project name:{' '}
                            <span className="font-semibold text-xl">{singlePillarProject.projectname}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            contractor: <span className="text-xl font-semibold">{singlePillarProject.contractor}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            local government area:{' '}
                            <span className="text-xl font-semibold">{singlePillarProject.lga}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            project status:{' '}
                            <span className="text-xl font-semibold">{singlePillarProject.projectstatus}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            weight: <span className="text-xl font-semibold">{singlePillarProject.weight}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            award date: <span className="text-xl font-semibold">{singlePillarProject.award_date}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            delivery date:{' '}
                            <span className="text-xl font-semibold">{singlePillarProject.delivery_date}</span>
                        </h2>
                        <h2 className="text-gray-600 font-sans font-semibold text-lg uppercase">
                            amount: <span className="text-xl font-semibold">{singlePillarProject.amount}</span>
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
                            <h2 className="bg-[#F5F5F5] py-3 pl-2 font-bold text-black">
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
