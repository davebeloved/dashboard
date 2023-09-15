import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/contextProvider'
import { ColorRing } from 'react-loader-spinner'
import Progress from './Progress'
import { toast } from 'react-toastify'

const Verify = () => {
    const [loading, setLoading] = useState(false)
    const [projectstatus, setProjectstatus] = useState('')
    const [dataVerify, setDataVerify] = useState([])
    const { userToken } = useStateContext()

    const navigate = useNavigate()

    // awaiting verification
    const fetchAwaitingVerify = async () => {
        try {
            const res = await axios.post(
                'https://spms.telexcoresources.com.ng/api/v1/project/pillar',
                {
                    projectstatus: 'awaiting verification'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            // console.log('verifyyy', res.data.data)
            setDataVerify(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    //  verify project
    const verifyProject = async () => {
        try {
            const projectId = dataVerify.find((item) => item.id)
            console.log(projectId)
            const res = await axios.post(
                `https://spms.telexcoresources.com.ng/api/v1/project/${projectId.id}/active`,
                {
                    projectstatus: 'awaiting approval'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            toast.success(`${projectId.projectname} has been verified successfully`, { position: 'bottom-center' })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            // console.log('verifyyy', res.data.data)
            // setDataVerify(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAwaitingVerify()
    }, [])
    return (
        <div>
            <div className="relative pl-44 lg:pl-0 bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <h2 className="text-gray-900 font-bold text-xl pl-2 mb-10 "></h2>
                <input
                    type="hidden"
                    value={projectstatus}
                    name="projectstatus"
                    onChange={(e) => setProjectstatus(e.target.value)}
                />
                <strong className="text-gray-700 pl-2 font-bold">Awaiting Verification</strong>
                <div className=" lg:pl-0 border-x border-gray-200 rounded-sm mt-3 ">
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
                                {dataVerify.map((project) => (
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
                                            <td className="grid grid-cols-3 space-x-2">
                                                <button
                                                    onClick={verifyProject}
                                                    className=" bg-blue-700 text-white py-1 px-3"
                                                >
                                                    Verify
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/project_info/${project.id}`)}
                                                    className="bg-green-700 text-white py-1 px-3"
                                                >
                                                    Edit
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
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Verify
