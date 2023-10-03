import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projectInfo } from '../data'
import DetailsModal from './DetailsModal'
import { useStateContext } from '../context/contextProvider'
import axiosClient from '../store/axios'
import axios from 'axios'
import Loader from './Loader'

const ProjectInfo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { projectDetail, pillars, userToken } = useStateContext()
    const [projectid, setProjectid] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [singleDetails, setSingleDetails] = useState([])
    const [projectComments, setProjectComments] = useState([])
    const [loading, setLoading] = useState(false)

    console.log('detailssss', projectDetail)
    const { id } = useParams()

    const singleProject = pillars.find((item) => item.id === Number(id))

    const openModal = () => {
        setIsOpen(!isOpen)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

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
                console.log('newdataaa', res.data.data)
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
                console.log('newdataaa', res.data.data)
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
    console.log('thhhsisi---', projectComments)

    return (
        <>
            {isOpen ? (
                <DetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
                <div className="relative bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                    <h2 className="text-gray-900 font-bold text-xl mb-10">Project Details</h2>
                    <strong className="text-gray-700 font-bold">Projects Outcome</strong>
                    <div className="border-x border-gray-200 rounded-sm mt-3 grid grid-cols-2 gap-x-10">
                        <div>
                            <table className="w-full text-gray-700">
                                <thead>
                                    <tr>
                                        <th>Indicators</th>
                                        <th>Details</th>
                                    </tr>
                                    <button
                                        onClick={openModal}
                                        className="text-white bg-green-700 px-6 py-2 absolute right-3 top-16"
                                    >
                                        Add Details
                                    </button>
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
                        </div>
                        <div className="px-6 py-4">
                            <div>
                                <label className="font-bold mb-6 text-black">Add a Comment</label>
                                <input
                                    type="hidden"
                                    name="projectid"
                                    value={projectid}
                                    placeholder="projectid"
                                    className="w-full p-3 outline-none border border-neutral-600 mt-5 mb-3 text-black"
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
                            <div className="mt-7 ">
                                <h2 className="font-bold text-black">Project Comments ({projectComments.length})</h2>

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
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProjectInfo
