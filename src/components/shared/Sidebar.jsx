import React, { useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'
import { IoMdArrowDropdown } from 'react-icons/io'
import SubMenu from '../SubMenu'
import { useStateContext } from '../../context/contextProvider'
const linkClass =
    'flex items-center relative gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    const navigate = useNavigate()
    const { userToken, _setUserToken } = useStateContext()
    const logout = () => {
        if (userToken) {
            _setUserToken('')
            localStorage.removeItem('TOKEN')
            navigate('/login')
        }
    }
    return (
        <div className="bg-neutral-900 w-20  lg:w-60 fixed top-0 left-0 bottom-0  h-screen p-3 flex flex-col z-10">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} className="text-4xl lg:text-xl" />
                <span className="hidden lg:inline-block text-neutral-200 text-lg">Admin</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5   border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <button onClick={logout} className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout className="text-4xl lg:text-xl" />
                    </span>
                    <span className="hidden lg:inline-block">Logout</span>
                </button>
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)

    return (
        <>
            {link.childrens ? (
                <div className={open && 'content open transition-all duration-200'}>
                    <Link
                        to={link.path}
                        className={classNames(
                            pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                            linkClass
                        )}
                    >
                        <span className="text-xl">{link.icon}</span>
                        <span className="hidden lg:inline-block">{}</span>

                        <span className="absolute right-0">
                            <IoMdArrowDropdown
                                onClick={() => setOpen(!open)}
                                className="open-icon transition-all duration-300"
                            />
                        </span>
                    </Link>
                    <div className="text-white  text-sm ml-3 py-1 h-0 overflow-hidden open-sub">
                        {link.childrens.map((item, i) => (
                            <SubMenu key={i} item={item} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={open && 'content open'}>
                    <Link
                        to={link.path}
                        className={classNames(
                            pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                            linkClass
                        )}
                    >
                        <span className="text-4xl lg:text-xl">{link.icon}</span>
                        <span className="hidden lg:inline-block">{link.label}</span>
                    </Link>
                </div>
            )}
        </>
    )
}
