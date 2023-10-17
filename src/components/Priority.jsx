import React, { useState } from 'react'

// {{live}}/api/v1/project/57/priority 

const Priority = ({ togglePriority, iconic, setIconic }) => {
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = (e) => {
        setIconic(e.target.value)
        if (isToggled){
            togglePriority()
        }
        setIsToggled(!isToggled)
    }
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" className="hidden" checked={isToggled} onChange={handleToggle} value={iconic} name='iconic'/>
                <div className="toggle-switch__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div
                    className={`toggle-switch__dot absolute -top-1 w-6 h-6 bg-black rounded-full shadow-md transform ${
                        isToggled ? 'translate-x-4' : ''
                    }`}
                ></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium ml-3">Set Priority</div>
        </label>
    )
}

export default Priority
