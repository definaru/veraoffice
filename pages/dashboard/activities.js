import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { Row, Card, CardBody, Col, Alert } from 'reactstrap'
import ActiveList from '../../components/ActiveList'
import { AiOutlineBell } from 'react-icons/ai'

export default function Active() 
{

    const Title = 'Event List'
    const data = ActiveList()
    const [list, setList] = useState(data)
    const read = <span className="badge badge-soft-success mx-1">read</span>
    const news = <span className="badge badge-soft-danger mx-1">new</span>

    const card = (
        <Card className="shadow">
            <CardBody className="p-0">
                <div className="list-group list-lg-group list-group-flush">
                {list.map(a => (
                    <div key={a.id} className="list-group-item list-group-item-action">
                        <div className="media">
                            <Link href="/dashboard/activities/[href]" as={`/dashboard/activities/${a.href}`}>
                                <a>
                                    <img className="u-avatar rounded-circle mr-3" src={a.avatar} alt={a.name} />
                                </a>
                            </Link>
                            <div className="media-body">
                                <div className="d-md-flex align-items-center">
                                    <Link href="/dashboard/activities/[href]" as={`/dashboard/activities/${a.href}`}>
                                        <a className="text-dark" onClick={() => toggleActive(a.id)}>
                                            <h4 className="mb-1">
                                                {a.name} {a.complited == false ? news : read}
                                            </h4>                                                            
                                        </a>
                                    </Link>
                                    <small className="text-muted ml-md-auto">
                                        {a.date}
                                        <button 
                                            className="btn text-danger pb-0 pt-0"
                                            onClick={() => deleteActive(a.id)}
                                        >
                                            &times;
                                        </button>
                                    </small>
                                </div>
                                <p className="mb-0">{a.text}</p>
                            </div>
                        </div>
                    </div>                                
                ))}			
                </div>
            </CardBody>
        </Card>
    )

    function deleteActive(id)
    {
        setList(list.filter(i => i.id !== id))
    }

    function toggleActive(id)
    {
        setList(
            list.map(a => {
                if(a.id === id){
                    a.complited = !a.complited
                } return a
            })
        )
    }

    useEffect(() => {

    }, [list])


    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">{Title}</h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Row>
                <Col md="10">
                    {
                        list.length ? card : 
                        <Alert color="info">
                            <strong><AiOutlineBell />Info:</strong>&#160; No new events yet
                        </Alert>               
                    }
                </Col>               
            </Row>
        </AdminInterface>
    )
}