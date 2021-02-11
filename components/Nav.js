import React, { useState } from 'react'
import Link from 'next/link'
import { FaCubes, FaAngleRight, FaGraduationCap } from 'react-icons/fa'
import { AiOutlineBank, AiOutlineQuestionCircle, AiOutlineFileProtect, AiOutlineLineChart, AiOutlineSwap, AiOutlineDeploymentUnit, AiOutlineUsergroupAdd, AiOutlineUser, AiOutlineProject } from 'react-icons/ai'

export default function Nav(props)
{

    const [stat, setStat] = useState(false)
    
    function toggle(e){
        e.preventDefault()
        setStat(prevState => !prevState)
        const navStatus = stat ? 'u-sidebar-nav-menu__item' : 'u-sidebar-nav-menu__item u-sidebar-nav--opened'
        document.querySelector("#"+e.target.dataset.target).className = navStatus === null ? 'u-sidebar-nav-menu__item' : navStatus
    }  
    
	function activeClass(link) {
		return props.links == link ? "u-sidebar-nav-menu__link active cp" : "u-sidebar-nav-menu__link cp"
	}


    const MenuList = [
        { id: '1', href: '/dashboard', icon: <FaCubes className="u-sidebar-nav-menu__item-icon"/>, text: 'Dashboard', sub: false },
        { id: '2', href: '/dashboard/profile', icon: <AiOutlineUser className="u-sidebar-nav-menu__item-icon"/>, text: 'Account', sub: true },
        { id: '3', href: '/dashboard/boardsales', icon: <AiOutlineProject className="u-sidebar-nav-menu__item-icon"/>, text: 'Board Sales', sub: false },
        { id: '4', href: '/dashboard/property', icon: <AiOutlineBank className="u-sidebar-nav-menu__item-icon"/>, text: 'Property', sub: false },
        { id: '5', href: '/dashboard/deals', icon: <AiOutlineFileProtect className="u-sidebar-nav-menu__item-icon"/>, text: 'My Deals', sub: false },
        { id: '6', href: '/dashboard/marketing', icon: <AiOutlineLineChart className="u-sidebar-nav-menu__item-icon"/>, text: 'Marketing', sub: false },
        { id: '7', href: '/dashboard/education', icon: <FaGraduationCap className="u-sidebar-nav-menu__item-icon"/>, text: 'Education', sub: false },
        { id: '8', href: '/dashboard/vendors', icon: <AiOutlineSwap className="u-sidebar-nav-menu__item-icon"/>, text: 'Vendors', sub: false },
        { id: '9', href: '/dashboard/manager', icon: <AiOutlineDeploymentUnit className="u-sidebar-nav-menu__item-icon"/>, text: 'Office Manager', sub: false },
        { id: '10', href: '/dashboard/friends', icon: <AiOutlineUsergroupAdd className="u-sidebar-nav-menu__item-icon"/>, text: 'Recruiting', sub: false },
        { id: '11', href: '/dashboard/help', icon: <AiOutlineQuestionCircle className="u-sidebar-nav-menu__item-icon"/>, text: 'Help Desk', sub: false },
    ]     

    return (
        <>
            <nav className="u-sidebar-nav d-print-none">
                <ul className="u-sidebar-nav-menu u-sidebar-nav-menu--top-level">
                    {MenuList.map(menu => (
                        <li 
                            id={'subMenu'+`${menu.id}`}
                            className="u-sidebar-nav-menu__item"
                            key={menu.id}
                        >
                        {
                            menu.sub == true ? 
                            <>
                                <a className={activeClass(`${menu.href}`)} 
                                    value={menu.id}
                                    data-target={'subMenu'+`${menu.id}`}
                                    onClick={toggle}
                                >
                                    {menu.icon}
                                    <span className="u-sidebar-nav-menu__item-title">{menu.text}</span>
                                    <FaAngleRight className="u-sidebar-nav-menu__item-arrow" />
                                    <span className="u-sidebar-nav-menu__indicator"></span>
                                </a>
                                <ul id={'subMenu'+`${menu.id}`} 
                                    className="u-sidebar-nav-menu u-sidebar-nav-menu--second-level" 
                                    style={stat == false ? { display:'none' } : {display:'block'} }
                                >
                                    <li className="u-sidebar-nav-menu__item">
                                        <Link href="/dashboard/profile">
                                            <a className="u-sidebar-nav-menu__link">
                                                <span className="u-sidebar-nav-menu__item-icon">.</span>
                                                <span className="u-sidebar-nav-menu__item-title">Profile</span>
                                            </a>                                                
                                        </Link>
                                    </li>
                                    <li className="u-sidebar-nav-menu__item">
                                        <a className="u-sidebar-nav-menu__link" href="/dashboard/recover">
                                            <span className="u-sidebar-nav-menu__item-icon">.</span>
                                            <span className="u-sidebar-nav-menu__item-title">Recover Password</span>
                                        </a>
                                    </li>
                                </ul>
                            </> 
                            : 
                            <>
                                <Link href={menu.href}>
                                    <a className={activeClass(`${menu.href}`)}>
                                        {menu.icon}
                                        <span className="u-sidebar-nav-menu__item-title">{menu.text}</span>
                                    </a>                                        
                                </Link>
                            </>
                        }
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}