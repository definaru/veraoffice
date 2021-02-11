import Link from 'next/link'
import React, { useState } from 'react'
import { AdminInterface } from '../../components/layout/AdminInterface'
// import FormTest from '../../components/FormTest'
import { Card, Row, Col, CardBody, Form, Alert, CardHeader, CardFooter, Input, Button, InputGroup, InputGroupAddon, Label, Media } from 'reactstrap'
import { AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai'
import { FaTelegramPlane, FaYoutube } from 'react-icons/fa'

export default function Deposits()
{
    const Title = 'Wire / Escrow / Deposit instruction'
    const [visible, setVisible] = useState(true);
    const [visibleAlert, setVisibleAlert] = useState(true);
    const [visibleAlertWarn, setVisibleAlertWarn] = useState(true);
    const onDismiss = () => setVisible(false)
    const onDismissAlert = () => setVisibleAlert(false)
    const onDismissAlertWarn = () => setVisibleAlertWarn(false)

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
            <Card className="mb-4 p-0">
                <CardBody className="p-0">
                    <div className="bg-dark p-5 btn-block text-center">
                        <p className="mt-5"><FaYoutube style={{fontSize: '150px'}} /></p>
                        <p>No video</p>
                    </div>
                </CardBody>
                <CardBody>
                    <h3 className="text-danger">IMPORTANT:</h3>
                    <ol className="importa pl-3">
                        <li>Make sure checks includes customer name and property address, in the MEMO section of the check.</li>
                        <li>
                            Take a picture of the Check, Money Order or Cashier’s Check. We cannot accept CASH in the Escrow! No CASH please. <br/>
                            <small>(Wire: Please have customer confirm wire instructions by phone before wiring Via 305-833-3303 or WhatsApp at 954-661-8185)</small>
                        </li>
                        <li>Deposit at Chase Bank, utilizing the correct account number</li>
                        <li>
                            Take a picture of the Deposit Receipt<br/>
                            5.a. Fill the ESCROW FORM if the deposit an escrow.<br/>
                            5.b. Fill in the COMMISSION REQUEST FORM if the deposit is a commission.
                        </li>
                        <li>Make sure to upload all the pertinent documentation and pictures, as requested.</li>
                    </ol>
                    <Alert color="info" isOpen={visible} toggle={onDismiss} fade={true}>
                        <AiOutlineInfoCircle style={{fontSize: '25px'}} /> &#160;
                        If any questions don’t hesitate to call or email us
                        Phone:&#160; <a href="tel:+1-305-833-3303" className="alert-link"><u>+1-305-833-3303</u></a> &#160; | &#160;
                        Email:&#160; <a href="mailto:escrow@verarealty.com" className="alert-link"><u>escrow@verarealty.com</u></a> &#160; | &#160;
                        WhatsApp at:&#160; <a href="https://wa.me/19546618185" target="_blank" className="alert-link"><u>+1-954-661-8185</u></a>
                    </Alert>
                </CardBody>
            </Card>  
            <Row>
                <Col md="6" className="mb-4">
                    <Card>
                        <CardHeader className="d-flex justify-content-between">
                            <h4 className="m-0">ESCROW FUNDS ONLY</h4>
                            <a href="/docs/vera_office_escrow_funds_only.pdf" download>
                                <img src="/icon/pdf.svg" style={{width: '20px'}} alt="ESCROW FUNDS ONLY" />
                            </a>
                        </CardHeader>
                        <CardBody>
                            <p>
                                <b>Account Number:</b> 876238952<br/>
                                <b>Routing Number:</b> 267084131<br/>
                                <b>Account Name:</b> VERA REALTY, LLC<br/>
                                <br/>
                                <b>SWIFT Account:</b> CHASUS33<br/>
                                <small className="text-muted">
                                    (For international wires only)<br/>
                                    * Please include wiring fee in the sum of wire transfer                                    
                                </small>
                                <br/>
                                <b>Bank name:</b><br/>
                                JPMorgan Chase Bank, N.A.<br/>
                                4 NEW YORK PLAZA, FLOOR 15<br/>
                                NEW YORK, NY 10004<br/>
                                <br/>
                                <b>Business address:</b><br/>
                                1920 E Hallandale Beach Blvd, Suite 801<br/>
                                Hallandale Beach, FL 33009<br/>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6" className="mb-4">
                    <Card>
                        <CardHeader className="d-flex justify-content-between">
                            <h4 className="m-0">COMMISSION FUNDS ONLY</h4>
                            <a href="/docs/Vera_Realty_Operating_Wiring_Instructions.pdf" download>
                                <img src="/icon/pdf.svg" style={{width: '20px'}} alt="COMMISSION FUNDS ONLY" />
                            </a>
                        </CardHeader>
                        <CardBody>
                            <p>
                                <b>Account Number:</b> 709393255<br/>
                                <b>Routing Number:</b> 267084131<br/>
                                <b>Account Name:</b> VERA REALTY, LLC<br/>
                                <br/>
                                <b>SWIFT Account:</b> CHASUS33<br/>
                                <small className="text-muted">
                                    (For international wires only)<br/>
                                    * Please include wiring fee in the sum of wire transfer                                    
                                </small>
                                <br/>
                                <b>Bank name:</b><br/>
                                JPMorgan Chase Bank, N.A.<br/>
                                4 NEW YORK PLAZA, FLOOR 15<br/>
                                NEW YORK, NY 10004<br/>
                                <br/>
                                <b>Business address:</b><br/>
                                1920 E Hallandale Beach Blvd, Suite 801<br/>
                                Hallandale Beach, FL 33009<br/>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row> 

            <Alert color="warning" isOpen={visibleAlertWarn} toggle={onDismissAlertWarn} fade={true}>
                <p className="m-0 text-white">
                    <b>Warning:</b> &#160;
                    Please add wiring fee of your institutions to your wire. 
                    Otherwise if will be deducted and we will receive partial wire only.                         
                </p>
            </Alert> 

            <Alert color="danger" isOpen={visibleAlert} toggle={onDismissAlert} fade={true} className="mb-4">
                <Media>
                    <Media left>
                        <div className="warn_icon">
                            <AiOutlineWarning />
                        </div> 
                    </Media>
                    <Media body>
                        <p className="m-0 text-white">
                            IMPORTANT NOTICE: <u>Never trust wiring instructions sent via email.</u> &#160;
                            Cyber criminals are hacking email accounts and sending emails with fake wiring instructions. 
                            These emails are convincing and sophisticated. 
                            <u>Always</u> independently confirm wiring instructions in person or via a telephone call to 
                            a trusted and verified phone number. <u>Never</u> wire money without double-checking that the 
                            wiring instructions are correct.
                        </p>
                    </Media>
                </Media>
            </Alert> 

            <Card>
                <CardHeader>
                    <h4 className="m-0">SEND ESCROW INSTRUCTION TO YOUR CLIENT IN 1 SECOND</h4>
                </CardHeader>
                <CardBody>
                    <p>Escrow deposit instruction will be send to your customer automatic.</p>
                    <Form className="mb-5">
                        <Label className="font-weight-bold">Customer E-mail</Label>
                        <InputGroup>
                            
                            <Input name="cutomer" placeholder="Customer E-mail" />
                            <InputGroupAddon addonType="append">
                                <Button type="submit" color="primary">
                                    &#160;&#160;<FaTelegramPlane /> Send &#160;&#160;
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </CardBody>
            </Card>          
            <style jsx>{`
                .warn_icon {
                    font-size: 50px;
                    margin-right: 15px;
                }
                .importa li {
                    margin-bottom:20px;
                }
		    `}</style>
        </AdminInterface>
    )
}