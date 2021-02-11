import Link from 'next/link'
import { useRouter } from 'next/router'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import ActiveList from '../../../components/ActiveList'
import { Card, Media, CardBody } from 'reactstrap'
import { AiOutlineCalendar, AiOutlineEllipsis, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'


export default function Act()
{
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    

    const router = useRouter()
    const data = ActiveList()
    const result = data.filter(p => p.href.includes(router.query.href))
    const Title = result.map(title => title.name)
    const read = <span className="badge badge-soft-success mx-1">read</span>
    const news = <span className="badge badge-soft-danger mx-1">new</span>


    useEffect(() => {
        window.addEventListener("mouseup", () => setDropdownOpen(false), false)
    }, [dropdownOpen])



    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">{Title}</h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/activities">
                        <a>Event List</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Card className="shadow">
                {result.map(a => (
                    <CardBody key={a.id}>
                        <div className="float-right">
                            <div className={dropdownOpen == true ? "dropdown show" : "dropdown"}>
                                <button 
                                    className="btn p-0 dropdown-toggle" 
                                    data-toggle="dropdown" 
                                    onClick={toggle}
                                    aria-expanded={dropdownOpen}
                                >
                                    <AiOutlineEllipsis/>
                                </button>
                                <div className={dropdownOpen == true ? "dropdown-menu dropdown-menu-right shadow show" : "dropdown-menu dropdown-menu-right"}>
                                    <a className="dropdown-item" href="#"><AiOutlineCheck /> Read</a>
                                    <a className="dropdown-item text-danger" href="#"><AiOutlineDelete /> Delete</a>
                                </div>
                            </div>
                        </div>
                        <Media>
                            <Media left>
                                <img src={a.avatar} alt={a.name} className="u-avatar--lg img-fluid rounded-circle mr-4" />
                            </Media>
                            <Media body className="mt-2">
                                <Media tag="h3">
                                    {a.name}&#160;{a.complited == false ? news : read}
                                </Media>
                                <small className="text-muted js-loon-p">
                                    <AiOutlineCalendar /> {a.date}
                                </small>                            
                                <Media tag="p">{a.text}</Media>
                            </Media>
                        </Media>  
                        <Media tag="p" className="mt-4 text-dark">{a.fulltext}</Media>                     
                    </CardBody>
                ))}
            </Card>
        </AdminInterface>
    )
}