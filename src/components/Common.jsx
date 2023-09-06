import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from './Modal'
import Progress from './Progress'
import { projectInfo } from '../data'

const Common = ({ title, project }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(!isOpen)
    }
    const { id } = useParams()

    // console.log(id)

    const singleProject = projectInfo.find((item) => item.id === id)
    // console.log(singleProject)

    return (
        <>
            {isOpen ? (
                <Modal setIsOpen={setIsOpen} />
            ) : (
                <div className="relative pl-32 lg:pl-0 bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                    <h2 className="text-gray-900 font-bold text-xl mb-10 ">{singleProject.title}</h2>
                    <strong className="text-gray-700 font-bold">Current Projects</strong>
                    <div className=" lg:pl-0 border-x border-gray-200 rounded-sm mt-3 ">
                        <button
                            onClick={openModal}
                            className="text-white bg-green-700 px-6 py-2 absolute right-3 top-16"
                        >
                            Add New Project
                        </button>
                        <table className="w-full text-gray-700">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {singleProject.label.map((item, idx) => (
                                        <>
                                            <td>
                                                <Link
                                                    to={`/project_info/${singleProject.id}`}
                                                    className="text-neutral-600 hover:no-underline"
                                                >
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td>
                                                <Progress completed={item.progress} />
                                            </td>
                                        </>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default Common
