import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { projectInfo } from '../data'

const Modal = ({ setIsOpen }) => {
    const [projects, setProjects] = useState({ projectName: '', progress: '' })

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleChange = (e) => {
        setProjects({ ...projects, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 w-screen z-20 flex items-start justify-center">
            <div className="bg-white w-96 rounded-md px-4 py-5 mt-5 ml-44">
                <div className="flex items-center justify-between ">
                    <h2>Add New Project</h2>
                    <AiFillCloseCircle onClick={closeModal} size={25} className="cursor-pointer" />
                </div>
                <div className="mt-8">
                    <div className="flex flex-col">
                        <label className="text-neutral-700 pb-1">Project Name</label>
                        <input
                            onChange={handleChange}
                            name="projectName"
                            type="text"
                            placeholder="enter project name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                    </div>
                    <label className="text-neutral-700 pb-1">Project Progress</label>
                    <br></br>
                    <select
                        value={projects.progress}
                        onChange={handleChange}
                        name="progress"
                        id="project"
                        className="border border-neutral-700 p-2 w-48 outline-none mb-10"
                    >
                        <option>0</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                        <option>60</option>
                        <option>70</option>
                        <option>80</option>
                        <option>90</option>
                        <option>100</option>
                    </select>
                    <div className="flex justify-end">
                        <div className="">
                            <button onClick={closeModal} className="mr-4 bg-red-700 text-white py-2 px-4">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} className="bg-green-900 py-2 px-4 text-white">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
