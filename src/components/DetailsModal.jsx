import React, { useState } from 'react'
import axiosClient from '../store/axios'
import { AiFillCloseCircle } from 'react-icons/ai'

const DetailsModal = ({ setIsOpen }) => {
    const [projectid, setProjectid] = useState('')
    const [indicator, setIndicator] = useState('')
    const [details, setDetails] = useState('')

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosClient.post('/v1/project/details/add', {
                projectid,
                indicator,
                details
            })
            closeModal()
            window.location.reload()
            console.log(res)
            console.log('success')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 w-screen z-20 flex items-start justify-center">
            <div className="bg-white w-[480px] rounded-md px-4 py-5 ml-44">
                <div className="flex items-center justify-between ">
                    <h2 className="font-bold">Add New Project</h2>
                    <AiFillCloseCircle onClick={closeModal} size={25} className="cursor-pointer" />
                </div>
                <div className="mt-8">
                    <div className="flex flex-col">
                        <label className="text-neutral-700 pb-1">Pillar ID</label>
                        <input
                            onChange={(e) => setProjectid(e.target.value)}
                            name="pillarid"
                            type="text"
                            placeholder="enter pillar id"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                        <label className="text-neutral-700 pb-1">Indicator Name</label>
                        <input
                            onChange={(e) => setIndicator(e.target.value)}
                            name="indicator"
                            type="text"
                            placeholder="enter indicator name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                        <label className="text-neutral-700 pb-1">Project Details</label>
                        <input
                            onChange={(e) => setDetails(e.target.value)}
                            name="details"
                            type="text"
                            placeholder="enter project details"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                    </div>

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

export default DetailsModal
