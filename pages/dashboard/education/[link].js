import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { Card, CardBody, Row, Col, Collapse, CardFooter, CardHeader } from 'reactstrap'
import VideoList from '../../../components/VideoList'
import { AiOutlineArrowRight, AiOutlineYoutube, AiOutlineArrowLeft, AiFillStar } from 'react-icons/ai'
import { FaFilm, FaUserGraduate } from 'react-icons/fa'

export default function LinkVideo()
{

    const router = useRouter()
    const OpenVideoList = VideoList()
    const result = OpenVideoList.filter(p => p.link.includes(router.query.link))
    const Title = result.map(title => title.text)

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon"><FaUserGraduate className="text-vera" /> {Title}</h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/education">
                        <a>Education</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>


            {result.map(list => (
                <Row key={list.id}>
                    <Col md="10">
                        <Card className="mb-5">
                            <CardHeader className="d-flex justify-content-between">
                                <a onClick={() => window.history.back()} className="btn btn-outline-dark">
                                    <AiOutlineArrowLeft /> back
                                </a>
                                <a className="btn bg-white">
                                    Rate: &#160;
                                    <AiFillStar className="text-warning" />
                                    <AiFillStar className="text-warning" />
                                    <AiFillStar className="text-warning" />
                                    <AiFillStar className="text-warning" />
                                    <AiFillStar className="text-warning" />
                                </a>                                
                            </CardHeader>
                            <CardHeader className="p-0 bg-dark">
                                <iframe 
                                    className="you_tube_screen" 
                                    src={`${list.video}`+'?rel=0'} frameBorder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>                    
                            </CardHeader>
                            <CardBody>
                                <h3><FaFilm className="text-vera" />&#160; {Title}</h3>
                            </CardBody>
                            <CardFooter className="d-flex justify-content-between">
                                <a 
                                    href="https://www.youtube.com/channel/UCPy8BXR4yBNlSRtiZGu3MfA?sub_confirmation=1" 
                                    className="btn btn-outline-dark btn-lg"
                                    target="_blank"
                                >
                                    <AiOutlineArrowRight /> Go to channel
                                </a>
                                <a 
                                    href={'https://www.youtube.com/watch?v='+`${list.link}`} 
                                    className="btn btn-danger btn-lg"
                                    target="_blank"
                                >
                                    <AiOutlineYoutube /> Rate video
                                </a>
                            </CardFooter>
                        </Card>                        
                    </Col>
                </Row>
            ))}
            <style jsx>{`
                .btn-outline-dark:hover {color: #fff !important;}
                .you_tube_screen {
                    width:100%;
                    height:500px;
                    margin-bottom:-6px;
                }
            `}</style>
        </AdminInterface>
    )
}