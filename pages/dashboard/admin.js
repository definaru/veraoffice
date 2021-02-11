import Link from 'next/link'
import { Card, CardBody, CardHeader, Col, Media, Row, Toast, ToastBody, ToastHeader } from 'reactstrap'
import React, { useState } from 'react'
import { GlobalDataSite } from '../../components/GlobalDataSite'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { FaConnectdevelop, FaUsers } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import { GiGoldShell } from 'react-icons/gi'
import { AiOutlineFilePdf, AiOutlineReconciliation } from 'react-icons/ai'


export default function Admin()
{
    const Title = 'Admin Panel'
    const data = GlobalDataSite()
    const Error = data == null ? true : false
    const [show, setShow] = useState(Error)
    const toggle = () => setShow(false)
    const CustomPanel = [
        {href: '/admin/users', icon: <FaUsers />, header: 'Users', text: 'All Lists user'},
        {href: '/admin/lock', icon: <FaConnectdevelop />, header: 'Test', text: 'Testing page'},
        {href: '/admin/dotloop', icon: <GiGoldShell />, header: 'DotLoop', text: 'Document Data'},
        {href: '/admin/contracts', icon: <AiOutlineFilePdf />, header: 'Contracts', text: 'Contracts and forms'},
        {href: '/admin/deals', icon: <AiOutlineReconciliation />, header: 'Deals', text: 'List of all deals and contracts.'}
    ]


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
                {CustomPanel.map((item, inx) => (
                <Col key={inx} md="4" className="mb-3">
                    <Card>
                        <CardBody className="cp">
                            <Link href={item.href}>
                                <Media className="align-items-center">
                                    <Media left>
                                        <div className="u-icon u-icon--md bg-light text-vera rounded-circle mr-2">
                                            {item.icon}
                                        </div>                                
                                    </Media>
                                    <Media body>
                                        <h4 className="mb-0">{item.header}</h4>
                                        <small className="text-muted">{item.text}</small>
                                    </Media>
                                </Media>                                
                            </Link>

                        </CardBody>
                    </Card>
                </Col>                    
                ))}
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <h4 className="js-loon m-0">Current company data</h4>
                        </CardHeader>
                        <CardBody>
                            {
                                data ? 
                                    <>
                                        <label className="font-weight-bold mt-3">Logotype</label>
                                        <div 
                                            style={{
                                                background: 'url(/img/default_grid.jpg) repeat', 
                                                width: '80%', 
                                                height: '200px'
                                            }}
                                            className="p-4"
                                        >
                                            <Row>
                                                <Col md="6">
                                                    <img 
                                                        src={data.company.logotype.blue} 
                                                        alt={data.company.name} 
                                                        style={{width: '250px'}} 
                                                    />
                                                </Col>
                                                <Col md="6">
                                                    <img 
                                                        src={data.company.logotype.white} 
                                                        alt={data.company.name} 
                                                        style={{width: '250px'}} 
                                                    />
                                                </Col>
                                            </Row>
                                        </div> 
                                        <Row>
                                            <Col md="6">
                                                <label className="font-weight-bold mt-3">Name Company</label>  
                                                <h4>{data.company.name}</h4>                                
                                                <label className="font-weight-bold mt-3">CEO</label>  
                                                <p>{data.company.CEO}</p>
                                                <label className="font-weight-bold mt-3">Address Company</label>  
                                                <p>{data.company.address}</p>
                                                <label className="font-weight-bold mt-3">Slogan Company</label> 
                                                <p>{data.company.slogan}</p>                                                
                                            </Col> 
                                            <Col md="6">
                                                <label className="font-weight-bold mt-3">Services sector</label> 
                                                <p>{data.company.service}</p>
                                                <label className="font-weight-bold mt-3">Website Company</label> 
                                                <p>{data.company.website}</p>
                                                <label className="font-weight-bold mt-3">E-mail Company</label> 
                                                <p>{data.company.email}</p>
                                                <label className="font-weight-bold mt-3">Phone Company</label> 
                                                <p>{data.company.phone}</p>                                                
                                            </Col> 
                                        </Row>
                                    </> :
                                    <>
                                        <Skeleton circle={true} width={140} height={140}  className="mb-3"/>
                                        <p className="m-0"><Skeleton variant="text" width={320} /></p>
                                        <p className="m-0"><Skeleton variant="text" width={320} /></p>
                                        <p className="m-0"><Skeleton variant="text" width={190} /></p>                                    
                                    </>
                            }
                        </CardBody>
                    </Card>    
                </Col>
            </Row>

            {/*
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>            
            */}

            

           
            {data === null || show == true ? '' : 
            <Toast className="rounded pos-right-bottom" isOpen={show} onClick={() => setShow(false)}>
                <ToastHeader className="bg-danger border-0" toggle={toggle}>
                    <strong className="font-weight-bold text-white">
                        {data.status}
                    </strong>
                </ToastHeader>
                <ToastBody className="bg-danger text-light rounded-bottom pt-0">
                    {data.message}, {data.info}
                </ToastBody>
            </Toast>}                
      
        </AdminInterface>
    )
}