import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { projectInfo, projectStatus } from '../data'
import axiosClient from '../store/axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'

const Modal = ({ setIsOpen }) => {
    const [projectname, setProjectname] = useState('')
    const [pillarid, setPillarid] = useState('')
    const [contractor, setContractor] = useState('')
    const [amount, setAmount] = useState('')
    const [lga, setLga] = useState('')
    const [status, setStatus] = useState('')
    const [award_date, setAward_date] = useState('')
    const [delivery_date, setDelivery_date] = useState('')
    const [weight, setWeight] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [iconic, setIconic] = useState('')
    const [loading, setLoading] = useState(false)

    // const [data, setData] = useState({
    //     projectname: '',
    //     pillarid: '',
    //     contractor: '',
    //     amount: '',
    //     status: '',
    //     award_date: '',
    //     delivery_date: '',
    //     weight: '',
    //     image: '',
    //     video: '',
    //     iconic: ''
    // })

    const closeModal = () => {
        setIsOpen(false)
    }
    console.log('imagggggggg', image)

    console.log('imageeeee', image)
    console.log('imageeeee', video)
    const { id } = useParams()
    console.log('myyyyyyyyy', id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Create a child reference for the file upload
            // if (image === null) return alert('no image')
            // const imageRef = ref(storage, ` images/ ${image.name + v4()}`)

            // Upload the imageUrl file to Firebase Storage
            // await uploadBytes(imageRef, image)

            // Get the download URL for the uploaded file
            // const downloadURL = await getDownloadURL(imageRef)
            // console.log('urllllll', downloadURL)

            // if (image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            //     alert('good')
            // }
            setLoading(true)
            const idx = {
                pillarid: id
            }

            const formData = new FormData()
            formData.append('pillarid', idx.pillarid)
            formData.append('projectname', projectname)
            formData.append('contractor', contractor)
            formData.append('amount', amount)
            formData.append('lga', lga)
            formData.append('weight', weight)
            formData.append('image', image)
            formData.append('video', video)
            formData.append('iconic', iconic)
            formData.append('status', status)
            formData.append('award_date', award_date)
            formData.append('delivery_date', delivery_date)
            const resp = Object.fromEntries(formData)
            const payload = JSON.stringify(resp)
            // const newData = { ...resp, pillarid: id }

            console.log('neewwwww', resp)
            console.log('neewwwww', payload)

            // const config = {
            //     headers: {
            //         'Content-Type': 'multiplepart/form-data'
            //     }
            // }
            console.log('lllll', ...formData)

            const res = await axiosClient.post(
                '/v1/project/add',

                formData
            )
            closeModal()

            toast.success('Added a new Project Successfully', { position: 'bottom-center' })
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            console.log(res)
            console.log('success')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 w-screen z-20 flex items-start justify-center">
            <div className="bg-white overflow-scroll h-[600px] w-[480px] rounded-md px-4 py-5 ml-44">
                <div className="flex items-center justify-between ">
                    <h2 className="font-bold">Add New Project</h2>

                    <AiFillCloseCircle onClick={closeModal} size={25} className="cursor-pointer" />
                </div>
                <div className="mt-8">
                    <div className="flex flex-col">
                        {/* <label className="text-neutral-700 pb-1">Pillar ID</label> */}
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setPillarid(e.target.value)}
                            name="pillarid"
                            value={pillarid}
                            type="hidden"
                            placeholder="enter pillar id"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1">Project Name</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setProjectname(e.target.value)}
                            name="projectname"
                            type="text"
                            value={projectname}
                            placeholder="enter project name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1">Contractor Name</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setContractor(e.target.value)}
                            name="contractor"
                            type="text"
                            value={contractor}
                            placeholder="Contractor Name"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1"> Amount</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setAmount(e.target.value)}
                            name="amount"
                            type="number"
                            value={amount}
                            placeholder="Enter Amount"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1"> LGA</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setLga(e.target.value)}
                            name="lga"
                            type="text"
                            value={lga}
                            placeholder="Enter Amount"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1"> Weight</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setWeight(e.target.value)}
                            name="weight"
                            type="number"
                            value={weight}
                            placeholder="Enter weight"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1"> Upload Image</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }}
                            name="image"
                            accept="image/*"
                            multiple
                            type="file"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1"> Upload Video</label>
                        <input
                            // onChange={handleChange}
                            onChange={(e) => setVideo(e.target.files[0])}
                            name="video"
                            accept="video/mp4,video/x-m4v,video/*"
                            type="file"
                            className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                        />
                        <label className="text-neutral-700 pb-1">Iconic</label>
                        <select
                            // onChange={handleChange}
                            onChange={(e) => setIconic(e.target.value)}
                            name="iconic"
                            value={iconic}
                            className="border border-neutral-700 p-2 w-48 outline-none mb-5 text-black"
                        >
                            <option>select</option>
                            <option>yes</option>
                            <option>no</option>
                        </select>
                    </div>
                    <label className="text-neutral-700 pb-1">Status</label>
                    <br></br>
                    <select
                        // onChange={handleChange}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        name="status"
                        id="status"
                        className="border border-neutral-700 p-2 w-48 outline-none mb-5 text-black"
                    >
                        {projectStatus.map((status) => {
                            const { value } = status

                            return <option className="text-black">{value}</option>
                        })}
                    </select>
                    <div className="flex items-center gap-x-5 mb-10">
                        <div>
                            <label>Award Date</label>
                            <input
                                // onChange={handleChange}
                                onChange={(e) => setAward_date(e.target.value)}
                                name="award_date"
                                value={award_date}
                                type="date"
                                placeholder="Award Date"
                                className="w-full outline-none border border-neutral-500 p-3 mb-4 text-black"
                            />
                        </div>
                        <div>
                            <label>Delivery Date</label>
                            <input
                                // onChange={handleChange}
                                onChange={(e) => setDelivery_date(e.target.value)}
                                name="delivery_date"
                                value={delivery_date}
                                type="date"
                                placeholder="Delivery Date"
                                className="w-full outline-none border border-neutral-500 p-3 mb-4"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="grid grid-cols-2">
                            <button onClick={closeModal} className="mr-4 bg-red-700 text-white py-2 px-4">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-green-900 w-20 flex items-center justify-center py-2 px-4 text-white"
                            >
                                {loading ? (
                                    <ColorRing
                                        visible={true}
                                        height="20"
                                        width="30"
                                        ariaLabel="blocks-loading"
                                        wrapperClass="blocks-wrappers"
                                        colors={['#e15b64', '#ffff', '#f8b26a', '#abbd81', '#849b87']}
                                    />
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
