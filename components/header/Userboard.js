import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dropdown, DropdownToggle, DropdownMenu, Card, CardBody, CardHeader } from 'reactstrap'
import { AiOutlineUser, AiOutlineSetting, AiOutlinePoweroff, AiOutlineControl } from 'react-icons/ai'
import { ProgressBar } from '../helper/ProgressBar'
import { FaAngleDown } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import Account from '../context/UserAccount'
import Fire from '../../config/fire-config'



export default function Userboard(props)
{

    const router = useRouter()
    const info = Account()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [controll, setControll] = useState(true)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    const photoURL = info.user.currently ? info.user.currently.photoURL : '/img/avatars/default_user.jpg'
    const displayName = info.user.currently ? info.user.currently.displayName : <Skeleton variant="text" width={100} height={20} />
    const stateAgent = '0'



    function nameStateAgent(stateAgent) {
        let Agent
        if(stateAgent <= 80) {
            Agent = 'Beginner'
        } else if(stateAgent <= 99) {
            Agent = 'Intermediate'
        } else if(stateAgent == 100) {
            Agent = 'Expert'
        }
        return Agent
    }


    function destroy()
    {
        setControll(false)
        Fire.auth().signOut()
        //.catch(function (err) {
        //    console.log('Error :', err)
        //})
    }

    useEffect(() => {

        if(!controll) {
            window.sessionStorage.clear()
            router.push('/')
        }

    }, [controll])

    return (
        <Dropdown 
            tag="div"
            isOpen={dropdownOpen}
            toggle={toggle} 
            className="ml-0"
        >
            <DropdownToggle tag="a" className="link-muted d-flex align-items-center cp">
                
                <div className="rounded-circle mr-2 avatar-bg" style={{background: `url(${photoURL}) no-repeat`}}></div>

                {/*<CardImg className="u-avatar--xs img-fluid rounded-circle mr-2" src={photoURL} />*/}
                
                <span className="text-dark d-none d-sm-inline-block">
                    {displayName}
                    <FaAngleDown tag="small" className="text-muted ml-1" />
                </span>
            </DropdownToggle>
            <DropdownMenu 
                right
                id="userboard"
                className="border-0 py-0 mt-3"
            >
                <Card>
                    <CardHeader className="py-3">
                        <div className="d-flex align-items-center">
                            <span className="h6 text-vera text-uppercase mb-0 font-weight-bold">
                                {nameStateAgent(stateAgent)}
                            </span>

                            <div className="ml-auto text-muted">
                                {
                                    stateAgent !== '100' ? 
                                        <>
                                            <strong className="text-dark">{stateAgent}%</strong> / 100%
                                        </> : 
                                        <ProgressBar progress={stateAgent} />
                                }
                            </div>
                        </div>
                        {stateAgent === '100' ? '' : <div className="mt-3"><ProgressBar progress={stateAgent} /></div>}
                    </CardHeader>
                    <CardBody>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-4">
                                <Link href="/dashboard/profile">
                                    <a className="d-flex align-items-center link-dark">
                                        <span className="h3 mb-0">
                                            <AiOutlineUser className="text-primary mr-3" />
                                        </span> 
                                        View Profile
                                    </a>                                                
                                </Link>
                            </li>
                            {
                                info.user.role ? 
                                    <>
                                    <li className="mb-4">
                                        <Link href="/dashboard/admin">
                                            <a className="d-flex align-items-center link-dark">
                                                <span className="h3 mb-0">
                                                    <AiOutlineControl className="text-primary mr-3" />
                                                </span> 
                                                Admin Panel
                                            </a>
                                        </Link>
                                    </li>                                    
                                    </> : ''
                            }                            
                            <li className="mb-4">
                                <Link href="/dashboard/settings">
                                    <a className="d-flex align-items-center link-dark">
                                        <span className="h3 mb-0">
                                            <AiOutlineSetting className="text-primary mr-3" />
                                        </span> 
                                        Settings
                                    </a>                                                
                                </Link>
                            </li>
                            <li>
                                <a className="d-flex align-items-center link-dark cp" onClick={destroy}>
                                    <span className="h3 mb-0">
                                        <AiOutlinePoweroff className="text-danger mr-3" />
                                    </span> 
                                    Sign Out
                                </a> 
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </DropdownMenu>
        </Dropdown>
    )
}