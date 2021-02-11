import React, { useState, useEffect } from 'react'
import { Col, Jumbotron, Row } from "reactstrap";
import { FaDesktop, FaFacebookSquare, FaInstagram } from "react-icons/fa";


export function BusinessCardBack(props)
{

    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')

    function changeInstagram(e)
    {
        setInstagram(e.target.value)
        window.localStorage.setItem('instagram', e.target.value)
    }

    function changeFacebook(e)
    {
        setFacebook(e.target.value)
        window.localStorage.setItem('facebook', e.target.value)
    }

    useEffect(() => {
        setInstagram( window.localStorage.getItem('instagram'))
        setFacebook(  window.localStorage.getItem('facebook') )
    }, [instagram, facebook])

    return (
        <Jumbotron 
            key={'1'} 
            id={props.theme}
            className="pt-3 pb-3 border shadow d-print-block"
            style={{width: '440px'}}
        >
            <Row>
                <Col md="5">
                    <img 
                        src={
                            props.theme == 'dark' ? 
                                '/img/visit-white.png' : 
                                '/img/visit.png'
                        } 
                        className="mt-4"
                        style={{width: '100%'}} 
                    />
                </Col>
                <Col md="7" className="pt-4 font-weight-bold">
                    <p>
                        <FaDesktop style={{fontSize: '25px'}} />
                        &#160; https://verarealty.com
                    </p>
                    <p>
                        <FaFacebookSquare style={{fontSize: '27px'}} />
                        &#160; 
                        <input 
                            type="text" 
                            name="facebook" 
                            placeholder="your facebook page name" 
                            className="input__vera"
                            onChange={changeFacebook}
                            defaultValue={facebook}
                        />
                    </p>
                    <p>
                        <FaInstagram style={{fontSize: '29px'}} />
                        &#160; 
                        <input 
                            type="text" 
                            name="instagram" 
                            placeholder="your instagram page name" 
                            className="input__vera"
                            onChange={changeInstagram}
                            defaultValue={instagram}
                        />
                    </p>
                    <img 
                        src={
                            props.theme == 'dark' ? 
                                "/img/qrcode-white.svg" : 
                                "/img/qrcode.svg"
                            } 
                        style={{width: '93px'}} 
                    />
                </Col>
            </Row>
            <style jsx>{`
                .input__vera {
                    width: 80%;
                    background: transparent;
                    border: none;
                    font-weight: bold;
                }
                .input__vera:focus {
                    outline:none;
                }
            `}</style>
        </Jumbotron>
    )
}