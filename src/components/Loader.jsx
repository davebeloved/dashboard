import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div>
            <p className="flex items-center justify-center py-20">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </p>
        </div>
    )
}

export default Loader
