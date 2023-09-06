import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const linkClass =
    'flex items-center relative font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const SubMenu = ({ item }) => {
    const { pathname } = useLocation()
    return (
        <div className=" pb-2 ">
            <Link
                to={item.path}
                className={classNames(
                    pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                    linkClass
                )}
            >
                {item.label.length > 30 ? `${item.label.substring(0, 25)}...` : item.label}
            </Link>
        </div>
    )
}

export default SubMenu
