import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { convertTimestamp } from '../../../components/helper/convertTimestamp'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { FaHeadset, FaTelegramPlane } from 'react-icons/fa'
import { AiOutlineCalendar } from 'react-icons/ai'
import { GiReactor } from 'react-icons/gi'
import { Card, CardHeader, Media, Jumbotron, Row, Col, Button } from 'reactstrap'
import { ModalTicket } from '../../../components/helper/modal/ModalTicket'
import { ToastAlert } from '../../../components/alert/ToastAlert'
import Fire from '../../../config/fire-config'
import Account from '../../../components/context/UserAccount'


export default function OpenTicket()
{

    const router = useRouter()
    const { href } = router.query
    const info = Account()

    const [login, setLogin] = useState(null)
    const [modal, setModal] = useState(false)
    const [event, setEvent] = useState(false)

    const toggle = () => setModal(!modal)

    const Title = `Question No. # ${href}`
    const current = login ? login.count : 0


    if(info.user.currently) {
        Fire.database().ref('ticket/' + info.user.currently.uid + '/' + href)
            .once('value')
            .then(function(snapshot) {
                setLogin(snapshot.val())
            })
    }

    function isNotAnswer()
    {
        setEvent(true)
        setTimeout(() => {router.push('/dashboard/helps')}, 550) 
    }

    function isYesAnswer()
    {
        if(info.user.currently) {
            Fire.database().ref('ticket/' + info.user.currently.uid + '/' + href).update({
                resolution: "true"
            })    
            setTimeout(() => {router.push('/dashboard/helps')}, 250)         
        }
    }


    return (
        <AdminInterface title={Title}>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">
                        <GiReactor className="text-vera" /> {Title}
                    </h1>
                    <ol className="breadcrumb bg-transparent small p-0">
                        <li className="breadcrumb-item">
                            <Link href="/dashboard">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/dashboard/helps">
                                <a>Help Desk</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{Title}</li>
                    </ol>                    
                </div>
                <div>
                    <button className="btn bg-vera btn-sm text-white"><b>Total:</b> {current} answers</button>
                </div>
            </div>
            <Row style={{marginBottom: '100px'}}>
                <Col md={10}>
                    {
                        info.user.currently && login  ? 
                        <Card className="mb-4">
                            <CardHeader className="border-bottom-0">
                                <Media>
                                    <Media left href="#">
                                        <img 
                                            src={info.user.currently.photoURL} 
                                            alt={info.user.currently.displayName} 
                                            className="mr-3 rounded-circle" 
                                            style={{width: '60px', height: '60px'}} 
                                        />
                                    </Media>
                                    <Media body>
                                        {
                                            login.resolution === "false" ? 
                                                <span className="badge badge-warning float-right">pending</span> : 
                                                <span className="badge badge-success float-right">complited</span>
                                        }
                                        <Media heading className="m-0 pt-2 js-loon">
                                            {info.user.currently.displayName} 
                                        </Media>
                                        <small className="text-muted">{info.user.login.rank}</small>
                                    </Media>
                                </Media>
                                <Jumbotron className="mt-4 mb-0 p-0 bg-white">
                                    <h3>{login.tickets}</h3>
                                    <pre>{login.message}</pre>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <small className="text-muted">
                                                <AiOutlineCalendar /> {login.date}
                                            </small>
                                        </div>
                                        <div>
                                            <div className="text-dark cp" onClick={toggle}>
                                                <FaTelegramPlane />&#160;Reply
                                            </div>
                                        </div>
                                    </div>
                                </Jumbotron>                              
                            </CardHeader>
                        </Card> : ''                
                    }
                    
                    {
                        login ? 
                        <>
                            {Object.values(login.chat).map((tag, idx) => (
                                <Card key={idx} className="mb-4 offset-md-1">    
                                    <CardHeader>
                                        <Media>
                                            <Media left href="#">
                                                <div
                                                    className="mr-3 rounded-circle bg-vera text-white text-center pt-3" 
                                                    style={{width: '60px', height: '60px'}} 
                                                >
                                                    <FaHeadset style={{fontSize: '30px', opacity: '0.6'}} />
                                                </div>
                                            </Media>
                                            <Media body>
                                                <Media heading className="m-0 pt-2 js-loon">
                                                    VeraOffice Support
                                                </Media>                                        
                                                <small className="text-muted">{login.tickets}</small>
                                            </Media>
                                        </Media> 
                                        <Jumbotron className="mt-1 mb-0 pt-2 pb-0 pl-0 pr-0 bg-white">
                                            <p>{tag.answer}</p>
                                                <hr />
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <small className="text-muted">
                                                        <AiOutlineCalendar /> 
                                                        &#160;{convertTimestamp(tag.date.slice(0,-3))}
                                                    </small>
                                                </div>
                                                <div>
                                                    <Link href="/dashboard">
                                                        <a className="text-dark">
                                                            <FaTelegramPlane />&#160;Reply
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>                                            
                                        </Jumbotron>   
                                    </CardHeader>   
                                </Card>
                            ))}
                        </>
                        : ''    
                    }
                    {
                        login ?
                        <>
                            {
                                login.resolution === "false" && 
                                <Card className="mb-4">
                                    <CardHeader className="border-bottom-0 bg-light">
                                        <Row>
                                            <Col md={8}>
                                                <h4 className="btn js-loon">Have you solved your question ?</h4>
                                            </Col>
                                            <Col md={4} className="text-lg-right text-md-right text-center">
                                                <Row>
                                                    <Col md={6}>
                                                        <Button onClick={() => isYesAnswer()} color="success" className="btn-block">
                                                            YES
                                                        </Button>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Button onClick={() => isNotAnswer()} color="danger" className="btn-block">
                                                            NO
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                </Card>
                            }
                        </> : ''
                    }

                    


                    <ModalTicket 
                        href={href} 
                        keycart={info.user.currently ? info.user.currently.uid : ''}
                        current={current} 
                        toggle={toggle}
                        setModal={setModal}
                        modal={modal}
                    />  

                {
                    event ?
                        <ToastAlert 
                            header="Good!" 
                            text="We took into account your situation, we will continue to resolve your issue." 
                            color="info" 
                            headerColor="text-white" 
                            textColor="text-light" 
                        /> : ''
                }
                </Col>
            </Row>
        </AdminInterface>
    )
}