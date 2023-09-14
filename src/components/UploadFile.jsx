import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

function UploadFile() {
    const [files, setFiles] = useState([])

    const onDrop = (acceptedFiles) => {
        // Create a FormData object
        const formData = new FormData()

        // Append each accepted file to the FormData object
        acceptedFiles.forEach((file) => {
            formData.append('files', file)
        })

        // Send the FormData object to your server or perform further actions
        // For demonstration, we're logging the FormData object here
        console.log(formData)
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, video/*' // Accept both image and video files
    })

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div>
                <h4>Uploaded Files</h4>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UploadFile
