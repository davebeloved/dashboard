import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { projectInfo } from '../data'

const ProjectInfo = ({ title, project, trainee, trainer }) => {
    const { id } = useParams()
    console.log(id)
    const singleInfo = projectInfo.find((item) => item.id === id)

    return (
        <div className="relative bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <h2 className="text-gray-900 font-bold text-xl mb-10">{singleInfo.title}</h2>
            <strong className="text-gray-700 font-bold">Projects Outcome</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3 ">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>NO of People Trained</th>
                            <th>No of Trainer Employed</th>
                            <th>No of Solution Developed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{singleInfo.no_trained}</td>
                            <td>{singleInfo.no_employed}</td>
                            <td>{singleInfo.solutions}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectInfo
