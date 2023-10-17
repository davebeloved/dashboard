import React, { useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'
import { IoMdArrowDropdown } from 'react-icons/io'
import SubMenu from '../SubMenu'
import { useStateContext } from '../../context/contextProvider'
import { AiOutlineMenu } from 'react-icons/ai'
const linkClass =
    'flex items-center relative gap-2 font-light px-3 py-2 hover:bg-green-100 hover:no-underline active:bg-green-200 rounded-sm text-base'

export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
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
        <div>
            <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
                <div className="sidebar-title">
                    <div className="flex items-center gap-x-3">
                        <FcBullish fontSize={20} className="text-3xl lg:text-4xl" />
                        <strong className="mt-3">ADMIN</strong>
                    </div>
                    <span className="icon close_icon" onClick={OpenSidebar}>
                        X
                    </span>
                </div>
                <div className="flex flex-col justify-around h-full mb-20">
                    {/* <div className="bg-neutral-900 w-20    lg:w-60 fixed top-0 left-0 bottom-0   p-3 flex flex-col z-10"> */}
                    {/* <div className="flex items-center pl-3">
                        <FcBullish fontSize={24} className="text-4xl lg:text-xl" />
                        <strong className="sidebar-brand">Admin</strong>
                    </div> */}
                    <div className="py-8 flex flex-1 flex-col gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-0.5   border-t border-neutral-600">
                        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                            <SidebarLink key={link.key} link={link} />
                        ))}
                        <button onClick={logout} className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                            <span className="text-xl">
                                <HiOutlineLogout className="text-4xl lg:text-xl" />
                            </span>
                            <span className="">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
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
                            pathname === link.path ? 'bg-red-600 text-white' : 'text-neutral-400',
                            linkClass
                        )}
                    >
                        <span className="text-xl">{link.icon}</span>

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
                            pathname === link.path ? 'bg-green-200 text-[#263043]' : 'text-neutral-400',
                            linkClass
                        )}
                    >
                        <span className="text-4xl lg:text-xl">{link.icon}</span>
                        <span className="">{link.label}</span>
                        {/* <span className="hidden lg:inline-block">{link.label}</span> */}
                    </Link>
                </div>
            )}
        </>
    )
}
