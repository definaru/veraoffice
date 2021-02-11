import React, { useState } from 'react'
import Link from 'next/link'
import { FaAngleDown, FaMailBulk, FaPhoneAlt, FaUsers, FaWhatsapp } from  'react-icons/fa'
import { Tooltip, Row, Col, Card, CardBody, CardHeader, Button, Collapse, Jumbotron } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { Div } from '../../components/helper/CustomTag'
import { IoMdArrowForward } from 'react-icons/io'
import Faq from '../../components/Faq'
import Account from '../../components/context/UserAccount'

export default function Help()
{

    const questions = Faq() 
    const info = Account()
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const [list, setList] = useState(questions)
    const Title = 'Help Desk'
    const toggle = () => setTooltipOpen(!tooltipOpen)



    const Help = (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">{Title}</h1>
                </div>
                <div>
                    <Link href="/dashboard/helps">
                        <button className="btn btn-primary">
                            &#160; + Add Ticket &#160;
                        </button>
                    </Link>
                </div>
            </div>

            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>

            <Jumbotron className="full_image" style={{background: 'url(/img/helper.jpg) no-repeat #222'}}>
                {
                    info.user.currently ? 
                        <>
                            <Div tag="h1" className="m-0 text-white">
                                Hello, {info.user.currently.displayName}
                            </Div>      
                            <p className="text-light">Your questions and new answers here.</p>
                            <Link href='/dashboard/helps'>
                                <Button color="dark" className="border border-dark">
                                    &#160;&#160;<IoMdArrowForward /> Learn More&#160;&#160;
                                </Button>                                 
                            </Link>
                        </> : 
                        <Div tag="h1" className="m-0 text-white">Loading...</Div>
                }



            </Jumbotron>

            <Row>
                <Col md="12" className="mt-4 mb-4">
                    <h3 className="p-2">F.A.Q.</h3>
                    {list.map(q => (
                        <Card key={q.id} className="shadow">
                            <CardHeader>
                                <Button color="default" className="font-weight-bold p-0 text-left btn-block" 
                                    onClick={() => toggleActive(q.id)}
                                >
                                    <u className={q.open ? "text-vera" : ""}>{q.questions}</u>
                                    <div className="float-right" style={{transform: q.open ? 'rotate(90deg)' : ''}}>
                                        <FaAngleDown />
                                    </div>
                                </Button>
                            </CardHeader>
                            <Collapse isOpen={q.open}>
                                <CardBody className="bg-light">
                                    {q.text}
                                </CardBody>                                
                            </Collapse>
                        </Card>                        
                    ))}
                </Col>
            </Row>
            <Row>
                <Col md="12" className="mt-4">
                    <h3 className="p-2">Still have questions?</h3>
                </Col>
            </Row>
            <Row>
                <Col md="4">
                    <Card className="text-center shadow">
                        <CardHeader>
                            <strong>Make a phone call</strong>
                        </CardHeader>
                        <CardBody>
                            <a href="tel:+1449123355">
                                <FaPhoneAlt className="moon" /> 
                                <p>+1 44 9123355</p>
                            </a>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="text-center shadow">
                        <CardHeader>
                            <strong>Write to email</strong>
                        </CardHeader>
                        <CardBody>
                            <a href="mailto:info@veraoffice.com">
                                <FaMailBulk className="moon" /> 
                                <p>info@veraoffice.com</p>
                            </a>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="text-center shadow">
                        <CardHeader>
                            <strong>VeraOffice community</strong>
                        </CardHeader>
                        <CardBody>
                            <a href="https://verarealty.ru/community" target="_blank">
                                <FaUsers className="moon" /> 
                                <p>Go to page</p>
                            </a>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12" className="mt-4 text-center">
                    <a 
                        id="WhatsApp"
                        href="https://chat.whatsapp.com/LMIGclCHbXtArfmck5ieDh" 
                        className="btn btn-success"
                        target="_blank"
                    >
                        <FaWhatsapp /> WhatsApp Group
                    </a>
                    <Tooltip 
                        placement="top" 
                        isOpen={tooltipOpen} 
                        target="WhatsApp" 
                        toggle={toggle}
                    >
                        Join us on WhatsApp
                    </Tooltip>
                </Col>
            </Row>
        </>
    )

    function toggleActive(id)
    {
        setList(
            list.map(q => {
                if(q.id === id){
                    q.open = !q.open
                } else if(q.id !== id) {
                    q.open = false
                }
                return q
            })
        )
    }



    return (
        <AdminInterface title={Title}>
            { Help }
        </AdminInterface>
    )
}