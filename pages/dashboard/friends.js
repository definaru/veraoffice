import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import InputMask from 'react-input-mask'
import emailMask from 'text-mask-addons/dist/emailMask'
import { Row, Col, Card, CardBody, CardHeader, Button, Form, FormGroup, Label, Input, Alert, Media } from 'reactstrap'
import { AiOutlineArrowRight, AiOutlineMail } from 'react-icons/ai'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { FaRegCheckCircle } from 'react-icons/fa'


export default function Friends()
{

    const Title = 'Invite your friends'

    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [name,   setName] = useState('')
    const [count, setCount] = useState(0)
    const [sendAll, setSendAll] = useState(true)

    function changeNameValue(e) 
    {
        setName(e.target.value)
        window.localStorage.setItem('first_name', e.target.value)
    }

    function changeEmailValue(e) 
    {
        setCount(e.target.value.length)
        setEmail(e.target.value)
        window.localStorage.setItem('email', e.target.value)
    }

    function changePhoneValue(e) 
    {
        setPhone(e.target.value)
        window.localStorage.setItem('phone', e.target.value)
    }

    function handleFormSubmit(e)
    {
        e.preventDefault()
        window.localStorage.removeItem('first_name')
        window.localStorage.removeItem('email')
        window.localStorage.removeItem('phone')
        setSendAll(false)
        //const { first_name, email, phone } = useState(e)
        console.log(name + ' | ' + phone + ' | ' + email)
    }

    useEffect(() => {

        setName( window.localStorage.getItem('first_name'))
        setEmail(window.localStorage.getItem('email'))
        setPhone(window.localStorage.getItem('phone'))
        setCount(count)

        if(sendAll == true) {
            const b = document.getElementById('submit')
            if(count <= 5) {
                b.setAttribute('disabled', '')
            } else {
                b.removeAttribute('disabled', '')
            }    
        }

    }, [name, phone, email, count])


    return (
        <AdminInterface title={sendAll == true ? Title : 'Message sent successfully'}>
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
                <Col md={sendAll == true ? "6" : "12"} className={sendAll == true ? "mb-5" : "d-none"}>
                    <Card>
                        <CardHeader className="d-flex align-items-center">
                            <h2 className="h3 card-header-title">
                                Ready to save $100?
                            </h2>
                            <ul className="list-inline ml-auto mb-0">
                                <li className="list-inline-item mr-3">
                                    <div className="text-success h3">
                                        <AiOutlineArrowRight />
                                    </div>
                                </li>
                            </ul>
                        </CardHeader>
                        <CardBody className="js-loon-p">
                            <h5 className="text-vera js-loon">Refer a friend to Vera Office !</h5>
                            <p>
                                As a real estate professional, you know the value of customer referrals.
                                You also know the value of saving money. Why not do both?
                            </p> 
                            <p>
                                With Vera Office’s Referral Program, you can save $100 by 
                                recommending our Brokerage Firm to your friends and colleagues! 
                            </p>
                            <b>Here's how it works:</b>
                            <br />
                            <br />
                            <ol className="pl-3">
                                <li>Complete this form with your Friend’s Name, Email and Phone Number.</li>
                                <li>We will need to call your friend with some details about Vera Office.</li>
                                <li>If your friend signs up with Vera Office, you’ll receive a $100 credit on your account! We will apply it to your next deal!</li>
                            </ol> 
                            <p>
                                Remember, there are no limits... 
                                to how many agents you and refer.  
                                So, keep referring and we will keep paying.                                
                            </p>
                            <strong>
                                Ready to start saving? Refer a friend to Vera Office today!
                            </strong>                            
                        </CardBody>
                    </Card>
                </Col>
                <Col md={sendAll == true ? "6" : "12"} className="mb-4">
                    <Card>
                        <CardHeader className="d-flex justify-content-between">
                            <h2 className="h3 card-header-title">
                                {sendAll == true ? 'Refer a Friend - receive a $100 BONUS CHECK!' : 'Message sent successfully'}
                            </h2>
                            <a className={sendAll == false ? "btn pt-0 cp" : "d-none"} onClick={() => setSendAll(true)}>&#10006;</a>
                        </CardHeader>
                        <CardBody>
                            {
                                sendAll == true ?
                                <>
                                    <Form onSubmit={handleFormSubmit}>
                                        <FormGroup>
                                            <Label>Friend Name</Label>
                                            <Input 
                                                type="text" 
                                                name="first_name" 
                                                value={name} 
                                                onChange={changeNameValue}
                                                autoComplete="off" 
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Friend E-mail</Label>
                                            <Input 
                                                type="email" 
                                                name="email" 
                                                autoComplete="off"
                                                mask={emailMask} 
                                                value={email} 
                                                onChange={changeEmailValue} 
                                                //maskChar="@"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Friend Phone Number - {phone}</Label>
                                            <InputMask 
                                                className="form-control" 
                                                name="phone" 
                                                autoComplete="off"
                                                mask="+1 999 999-99-99" 
                                                value={phone} 
                                                //onChange={e => setPhone(e.target.value)}
                                                onChange={changePhoneValue} 
                                                maskChar=" "
                                            />
                                        </FormGroup>
                                        <Button id="submit" type="submit" color="primary" className="btn-block mt-4">
                                            <AiOutlineMail /> &#160; Invite friend
                                        </Button>
                                    </Form> 
                                </> :
                                <>
                                <Alert color="success">
                                    <Media>
                                        <Media left className="mr-3">
                                            <FaRegCheckCircle style={{fontSize: '80px', opacity: '0.4'}} />
                                        </Media>
                                        <Media body>
                                            <strong className="text-white">Successfully!</strong>
                                            <p className="text-light m-0">
                                                Your invitation has been sent to your friend {name}, <br/>by email {email}
                                            </p>
                                        </Media>
                                    </Media>

                                </Alert>
                                </>
                            }

                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <style global jsx>{`
                .js-doughnut-chart {
                    width: 70px !important;
                    height: 70px !important;
                }
                hr {
                    margin-top:1px;
                    margin-bottom:1px;
                }
		    `}</style>
        </AdminInterface>
    )
}