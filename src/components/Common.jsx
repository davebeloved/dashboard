import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from './Modal'
import Progress from './Progress'
import { projectInfo } from '../data'
import { useStateContext } from '../context/contextProvider'
import axios from 'axios'
import Loader from './Loader'
import { ColorRing } from 'react-loader-spinner'

const Common = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { projects, pillars, userToken } = useStateContext()
    const [singlePillar, setSinglePillar] = useState([])
    const [loading, setLoading] = useState(false)
    // console.log('myprojectssss', projects)

    const navigate = useNavigate()

    const openModal = () => {
        setIsOpen(!isOpen)
    }
    const { id } = useParams()

    const fetchSinglePillar = async () => {
        try {
            if (userToken) {
                setLoading(true)
                const res = await axios.get(
                    `https://spms.telexcoresources.com.ng/api/v1/project/pillar/${id}/view`,

                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                // console.log('newdataaa', res.data.data)
                setSinglePillar(res.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log('errorrrrrrrrrff', error)
        }
    }
    useEffect(() => {
        fetchSinglePillar()
    }, [userToken])

    // const singleProject = singlePillar.find((item) => item.id === Number(id))
    console.log('snngle', typeof singlePillar)

    // console.log(pillars)

    return (
        <>
            {isOpen ? (
                <Modal setIsOpen={setIsOpen} />
            ) : (
                <div className="relative pl-44 lg:pl-0 bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                    <h2 className="text-gray-900 font-bold text-xl pl-2 mb-10 "></h2>
                    <strong className="text-gray-700 pl-2 font-bold">Current Projects</strong>
                    <div className=" lg:pl-0 border-x border-gray-200 rounded-sm mt-3 ">
                        <button
                            onClick={openModal}
                            className="text-white bg-green-700 px-6 py-2 absolute right-3 top-16"
                        >
                            Add New Project
                        </button>
                        <table className="w-full text-gray-700 mt-9">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Contractor Name</th>
                                    <th> Amount</th>
                                    <th>Award Date</th>
                                    <th>Delivery Date</th>
                                    <th>Project Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <p className="flex items-center justify-end w-full py-20 pl-20 mr-96">
                                    <ColorRing
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="blocks-loading"
                                        wrapperClass="blocks-wrapper"
                                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                    />
                                </p>
                            ) : (
                                <tbody>
                                    {singlePillar.map((project) => (
                                        <>
                                            <tr key={project.id} className=" w-full">
                                                <td className="">
                                                    <Link
                                                        to={`/project_info/${project.id}`}
                                                        className="text-neutral-600 hover:no-underline"
                                                    >
                                                        {project.projectname}
                                                    </Link>
                                                </td>
                                                <td> {project.contractor}</td>
                                                <td> {project.amount}</td>
                                                <td> {project.award_date}</td>
                                                <td> {project.delivery_date}</td>

                                                <td>{<Progress completed={project.status} />}</td>
                                                <td className="space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/project_info/${project.id}`)}
                                                        className=" bg-blue-700 text-white py-1 px-3"
                                                    >
                                                        Add Comment
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/project_info/${project.id}`)}
                                                        className="bg-green-700 text-white py-1 px-3"
                                                    >
                                                        Edit Status
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/project_info/${project.id}`)}
                                                        className="bg-[#FF0000] text-white py-1 px-3"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default Common
