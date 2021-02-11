import React, { useState } from 'react'
import Link from 'next/link'
import { Dropdown, DropdownToggle, DropdownMenu, Card, CardHeader, CardBody, CardImg, CardFooter } from 'reactstrap'
import ActiveList from '../ActiveList'
import { FaRegBell } from 'react-icons/fa'

export default function Activities()
{

    const OpenActiveList = ActiveList()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [clearAll, setClearAll] = useState(true)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    const clear = () => setClearAll(false)
    const count = <span className="badge badge-soft-danger mx-1">{Object.keys(OpenActiveList).length}</span>

    const indicator = <span className="u-indicator u-indicator-top-right u-indicator--xxs bg-danger"></span>
    const listActive = (
        <>
        <CardBody className="p-0">
            <div className="list-group list-group-flush">
            {OpenActiveList.map(a => (
                <Link key={a.id} href="/dashboard/activities/[href]" as={`/dashboard/activities/${a.href}`}>
                    <a className="list-group-item list-group-item-action" >
                        <div className="media align-items-center">
                            <CardImg src={a.avatar} className="u-avatar--sm rounded-circle mr-3" />
                            <div className="media-body">
                                <div className="d-flex align-items-center">
                                    <h4 className="mb-1 js-loon">{a.name}</h4>
                                    <small className="text-muted ml-auto">{a.date}</small>
                                </div>
                                <p className="text-truncate mb-0" style={{maxWidth: '250px'}}>{a.text}</p>
                            </div>
                        </div>
                    </a>                                 
                </Link>
            ))}
            </div>
        </CardBody>
        <CardFooter className="py-3">
            <Link href="/dashboard/activities">
                <a className="btn btn-block btn-outline-primary m-0 font-weight-bold">
                    View all activities
                </a>                            
            </Link>
        </CardFooter>
        </>
    )

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} tag="div" className="mr-4">
            <DropdownToggle tag="a" className="link-muted cp" aria-expanded={dropdownOpen}>
                <span className="h3">
                    <FaRegBell />
                </span>
                {OpenActiveList.length && clearAll == true ? indicator : ''}
            </DropdownToggle>
            <DropdownMenu 
                right
                className="border-0 py-0 mt-4" 
                style={{
                    width: '360px',
                    position: 'absolute',
                    willChange: 'transform',
                    top: '0px', 
                    left: '0px',
                    transform: 'translate3d(-333px, 20px, 0px)'
                }}
            >
                <Card>
                    <CardHeader className="d-flex align-items-center py-3">
                        <h2 className="h4 card-header-title js-loon">
                            {
                                OpenActiveList.length && clearAll == true ? 
                                <>Activities {count}</> : 
                                'No new events yet'
                            }
                        </h2>
                        <a className={clearAll == false ? "d-none" : "ml-auto cp"} onClick={clear}>Clear all</a>
                    </CardHeader>
                    {
                        OpenActiveList.length && clearAll == true ? listActive : ''
                    }

                </Card>
            </DropdownMenu>
        </Dropdown>
    )
}