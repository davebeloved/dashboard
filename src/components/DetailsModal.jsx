import React, { useState } from 'react'
import axiosClient from '../store/axios'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const DetailsModal = () => {
    const [projectid, setProjectid] = useState('')
    const [indicator, setIndicator] = useState('')
    const [details, setDetails] = useState('')

    // const closeModal = () => {
    //     setIsOpen(false)
    // }

    const { id } = useParams()
    console.log('ssdddddddd', id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosClient.post('/v1/project/details/add', {
                projectid: id,
                indicator,
                details
            })
            // closeModal()
            window.location.reload()
            console.log(res)
            console.log('success')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        // <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 w-screen z-20 flex items-start justify-center">
        <div className="mb-16">
            <div className="bg-white  px-4">
                {/* <div className="flex items-center justify-between ">
                    <h2 className="font-bold text-black">Add New Project</h2> */}
                {/* <AiFillCloseCircle onClick={closeModal} size={25} className="cursor-pointer" /> */}
                {/* </div> */}
                <div className="mt-4">
                    <h2 className="text-black font-bold mb-2">Add Indicator Details</h2>

                    <div className="flex flex-col">
                        {/* <label className="text-neutral-700 pb-1">Pillar ID</label> */}
                        <input
                            onChange={(e) => setProjectid(e.target.value)}
                            name="projectid"
                            value={projectid}
                            type="hidden"
                            placeholder="enter pillar id"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        {/* <label className="text-neutral-700 pb-1">Indicator Name</label> */}
                        <input
                            onChange={(e) => setIndicator(e.target.value)}
                            name="indicator"
                            type="text"
                            placeholder="enter indicator name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        {/* <label className="text-neutral-700 pb-1">Project Details</label> */}
                        <textarea
                            onChange={(e) => setDetails(e.target.value)}
                            name="details"
                            type="text"
                            placeholder="enter project details"
                            className="w-full p-3 outline-none border text-black border-neutral-600 mb-4"
                        ></textarea>
                    </div>

                    <div className="">
                        <div className="">
                            {/* <button onClick={closeModal} className="mr-4 bg-red-700 text-white py-2 px-4">
                                Cancel
                            </button> */}
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
