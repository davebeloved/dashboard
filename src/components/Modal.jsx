import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { projectInfo, projectStatus } from '../data'
import axiosClient from '../store/axios'
import { useParams } from 'react-router-dom'

const Modal = ({ setIsOpen }) => {
    const [projectname, setProjectname] = useState('')
    const [pillarid, setPillarid] = useState('')
    const [contractor, setContractor] = useState('')
    const [amount, setAmount] = useState('')
    const [status, setStatus] = useState('')
    const [award_date, setAward_date] = useState('')
    const [delivery_date, setDelivery_date] = useState('')

    const closeModal = () => {
        setIsOpen(false)
    }

    const { id } = useParams()
    console.log('myyyyyyyyy', id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axiosClient.post('/v1/project/add', {
                projectname,
                pillarid: id,
                contractor,
                amount,
                status,
                award_date,
                delivery_date
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
                        {/* <label className="text-neutral-700 pb-1">Pillar ID</label> */}
                        <input
                            onChange={(e) => setPillarid(e.target.value)}
                            name="pillarid"
                            value={pillarid}
                            type="hidden"
                            placeholder="enter pillar id"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                        <label className="text-neutral-700 pb-1">Project Name</label>
                        <input
                            onChange={(e) => setProjectname(e.target.value)}
                            name="projectname"
                            type="text"
                            placeholder="enter project name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                        <label className="text-neutral-700 pb-1">Contractor Name</label>
                        <input
                            onChange={(e) => setContractor(e.target.value)}
                            name="contractor"
                            type="text"
                            placeholder="Contractor Name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                        <label className="text-neutral-700 pb-1"> Amount</label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            name="amount"
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4"
                        />
                    </div>
                    <label className="text-neutral-700 pb-1">Status</label>
                    <br></br>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        name="status"
                        id="status"
                        className="border border-neutral-700 p-2 w-48 outline-none mb-5"
                    >
                        {projectStatus.map((status) => {
                            const { value } = status

                            return <option>{value}</option>
                        })}
                    </select>
                    <div className="flex items-center gap-x-5 mb-10">
                        <div>
                            <label>Award Date</label>
                            <input
                                onChange={(e) => setAward_date(e.target.value)}
                                name="award_date"
                                type="date"
                                placeholder="Award Date"
                                className="w-full outline-none border border-neutral-500 p-3 mb-4"
                            />
                        </div>
                        <div>
                            <label>Delivery Date</label>
                            <input
                                onChange={(e) => setDelivery_date(e.target.value)}
                                name="delivery_date"
                                type="date"
                                placeholder="Delivery Date"
                                className="w-full outline-none border border-neutral-500 p-3 mb-4"
                            />
                        </div>
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

export default Modal
