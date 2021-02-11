import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import { MainInterface } from '../components/layout/MainInterface'
import { Maintenance } from '../components/layout/Maintenance'


export default function HomePage() 
{
    
    const Title = 'Vera Office | Broker platform'
    const [uuid, setUuid] = useState('')

    useEffect(() => {
        const startUuid = ([1e7]+1e3+8e3+1e11).replace(/[018]/g, c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16))
        if(window.localStorage.getItem('uuid') == null ) {
            setUuid(window.localStorage.setItem('uuid', startUuid))
        } 
    }, [uuid])

    

    if (process.env.STATUS === '0') {
        return (
            <Maintenance>
                <p>Please check back later</p>
            </Maintenance>
        )
    }
    return (
        <MainInterface title={Title}>
            <Container fluid>
                <Row className="logo">
                    <Col md="12" className="text-center">
                        <h1 className="font-weight-normal">
                            <img src="/img/logo_white.png" className="logotype" alt="Vera Office | Real Estate"/>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="text-center p-0">
                        <Jumbotron className="florida xh-100">
                            <div className="bg">
                                <h2 className="display-4 pt-5 pb-5 text-white text-shadow">
                                    FLORIDA
                                </h2>
                                <Link href="/login/[name]" as="/login/Florida">
                                    <a className="btn btn-vera font-weight-bold btn-lg btn-shadow"> 
                                        &#160;&#160; Login &#160;&#160; 
                                    </a>                                      
                                </Link>
                            </div>
                        </Jumbotron>
                    </Col>
                    <Col md="6" className="text-center p-0">
                        <Jumbotron className="illinois xh-100">
                            <div className="bg">
                                <h2 className="display-4 pt-5 pb-5 text-white text-shadow">
                                    GEORGIA
                                </h2>
                                <Link href="/login/[name]" as="/login/Georgia">
                                    <a className="btn btn-vera font-weight-bold btn-lg btn-shadow"> 
                                        &#160;&#160; Login &#160;&#160; 
                                    </a>                                    
                                </Link>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <style global jsx>{`
                .logotype {
                    width:250px;
                }
                .btn-vera:hover {
                    color:#fff;
                    background-color: #30049a;
                }
                .btn-shadow {
                    box-shadow: 0 5px 10px #000;
                }
                .text-shadow {
                    text-shadow: 0 10px 20px #000;
                }
				.florida {
                    background: url(/img/florida.jpg) no-repeat fixed !important;
                    background-size: 50% !important;
                    background-position: left bottom !important;
                }
				.illinois {
					background: url(/img/georgia.jpg) no-repeat fixed !important;
					background-size: cover !important;
					background-position: center center !important;
                }
                .jumbotron {
                    padding: 0;
                    margin-bottom: 0;
                    border-radius: 0;
                }
                .bg {
                    background: rgb(0 0 0 / 29%);
                    height:100%;
                    padding: 200px 0;
                }
                .logo {
                    position: fixed;
                    top: 15px;
                    z-index: 100;
                    left: calc(50% - 120px);
                    color: #fff;
                    font-weight: bold;
                }
                .logo svg, h1, small {text-shadow: 0 0 12px #000;}
                .logo_sub__title {
                    font-size: 53%;
                    font-weight: 100;
                    font-family: 'Abel',sans-serif;
                    -webkit-letter-spacing: 11px;
                    -moz-letter-spacing: 11px;
                    -ms-letter-spacing: 11px;
                    letter-spacing: 11px;
                    top: -20px;
                    left: 4px;
                    position: relative;
                }
                @media screen and (min-width:768px) and (max-width:991px) {
                    .florida {background-size: cover !important;}
                }
                @media screen and (max-width:767px) {
                    .florida {background-size: cover !important;}
                }
		  `}</style>
        </MainInterface>
    )
}