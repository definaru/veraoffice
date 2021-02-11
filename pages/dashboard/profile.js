import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { FaRegEnvelope, FaExclamationTriangle } from 'react-icons/fa'
import { Row, Col, Card, CardBody, CardImg, Collapse, Alert } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { AiFillEdit, AiOutlineUser, AiOutlineCheck, AiOutlineCalendar } from 'react-icons/ai'
import { TimelineLastSignIn } from '../../components/helper/TimelineLastSignIn'
import { MailContentPanel } from '../../components/profile/MailContentPanel'
import { convertTimestamp } from '../../components/helper/convertTimestamp'
import Account from '../../components/context/UserAccount'
import Fire from '../../config/fire-config'


export default function Profile()
{

    const Title = 'Profile'
    const info = Account()
    const allData = info.user.login
    const UUID = Fire.auth().currentUser
    const [mail, setMail] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const onDismiss = () => setVisible(false)
    //const {setInfo} = useContext(UseContext)
    const toggle = () => setIsOpen(!isOpen)

    const openMail = () => {
        setMail(true)
    }

    const closeMail = () => {
        setMail(false)
    }


    const ContentPanel = (
        <Row>
            <Col lg={'12'}>
                {
                    allData ? 
                        <>
                            <h3 className="card-title js-loon">About me</h3>
                            <p className="m-0">
                                <small>
                                    <b>Creation Time:</b>&#160;&#160;&#160; 
                                    <AiOutlineCalendar /> {UUID ? convertTimestamp(UUID.metadata.a.slice(0,-3)) : 'Loading...'}
                                </small>
                            </p>
                            <p>
                                <small>
                                    <b>Last Sign In Time:</b>&#160;&#160;&#160; 
                                    <AiOutlineCalendar /> { UUID ? 
                                            <u className="cp text-vera" onClick={toggle}>
                                                {convertTimestamp(UUID.metadata.b.slice(0,-3))}
                                            </u> : 'Loading...'
                                    }
                                </small>
                            </p>
                            <pre className="mb-5 js-loon-p" style={{fontSize: '17px'}}>
                                {info.user.login.descript}
                            </pre>
                        </>
                         :   
                        <div className="mb-5">
                            <Skeleton width={120} height={21} className="mb-4" variant="text" />
                            <Skeleton count={5} height={12} />  
                            <Skeleton width={290} height={12} variant="text" />    
                        </div>              
                }
            </Col>
            <Col lg={'3'} className="mb-5 mb-lg-0">
                {
                    allData ?
                        <>
                            <h4 className="h3 mb-3 js-loon">License</h4>
                            <div className="mb-1 js-loon">
                                <span className="text-dark js-loon-p" style={{fontSize: '1.1em'}}>
                                    # {info.user.login.license_number}
                                </span>
                            </div>
                            <p className="btn btn-sm btn-success mb-0"><AiOutlineCheck /> Verified</p>                        
                        </> :
                        <>
                            <Skeleton width={100} height={21} className="mb-3" variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" height={25} />
                        </>
                }
            </Col>
            <Col lg={'3'}>
            {
                    allData ?
                        <>
                            <h4 className="h3 mb-3 js-loon">Country</h4>
                            <p>
                                <img src="/flags/us.svg" style={{width: '60px'}} alt="en" />
                                <br/> Miami, FL, USA
                            </p>
                        </> :
                        <>
                            <Skeleton width={100} height={21} className="mb-3" variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" height={25} />
                        </>
            }
            </Col>
            <Col lg={'6'}>
                {
                    allData ?
                        <>
                            <h4 className="h3 mb-4 js-loon">Knowledge of languages</h4>
                            <div className="d-flex flex-wrap align-items-center">
                                {
                                    info.user.login.languages ? 
                                        info.user.login.languages.split(',').map((item, i) => (
                                            <span key={item + i} className="bg-light text-muted rounded py-2 px-3 mb-2 mr-2">
                                                {item}
                                            </span>
                                        )) : 
                                        <>
                                            <Skeleton  variant="text"  width={90} height={35} />
                                            <Skeleton  variant="text"  width={90} height={35} />
                                            <Skeleton  variant="text"  width={90} height={35} />
                                        </>
                                }  
                            </div>                              
                        </> : 
                        <>
                            <Skeleton width={190} height={21} className="mb-3" variant="text" />
                            <div className="d-inline-flex">
                                <Skeleton count={3} width={90} height={35} className="mr-2" variant="text" />
                            </div>
                        </>
                }
            </Col>
        </Row>
    )

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineUser className="text-vera" /> &#160;{Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                <div className="btn-block text-center">
                    <strong><FaExclamationTriangle /> Danger!</strong>&#160;&#160;Your license has expired 
                </div>
            </Alert>
            
            <Collapse isOpen={isOpen}>
                <Card className="mb-3">
                    <TimelineLastSignIn 
                        toggle={toggle} 
                        convertTimestamp={convertTimestamp}
                    />
                </Card>
            </Collapse>  

            <Card style={{marginBottom: '150px'}}>
                <CardBody>
                    <Row>
                        <Col md={'4'} className="border-md-right border-light text-center pt-2">
                            {
                                allData ?
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="img-fluid rounded-circle mb-3"
                                            style={{
                                                width: '84px', 
                                                height: '84px', 
                                                background: `url(${info.user.login.photo}) no-repeat`,
                                                backgroundSize: 'cover'
                                            }}
                                        />                                        
                                    </div> :
                                    <Skeleton className="mb-3" circle={true} width={84} height={84} />
                            }

                            {
                                allData ?
                                    <h2 className="mb-2 js-loon">
                                        {info.user.login.username + ' ' + info.user.login.lastname}
                                    </h2> :
                                    <div className="btn-block">
                                        <div className="d-flex justify-content-center">
                                            <Skeleton className="mb-2 mr-2" width={110} height={30} variant="text" />
                                            <Skeleton className="mb-2" width={120} height={30} variant="text" />
                                        </div>
                                    </div>
                            }
                            {
                                allData ?
                                    <h5 className="text-muted mb-4 js-loon">{info.user.login.rank}</h5> :
                                    <Skeleton variant="text" className="mb-4" width={120} height={15} />
                            }
                            <Row>
                                <Col md={'8'} className="offset-md-2">
                                    {
                                        allData ? 
                                            <>
                                                <div className="mb-2">
                                                    <button className="btn btn-primary btn-block mb-2" onClick={openMail}>
                                                    &#160; <FaRegEnvelope />&#160; Send Message &#160;
                                                    </button>
                                                </div>
                                                <div className="mb-3">
                                                    {
                                                        info.user.currently ?
                                                            <Link href="/dashboard/profile/[uuid]" as={`/dashboard/profile/${info.user.currently.uid}`}>
                                                                <a className="btn btn-outline-dark btn-block mb-2">
                                                                    &#160; <AiFillEdit />&#160; Edit profile &#160;
                                                                </a>                                            
                                                            </Link> : ''                                                        
                                                    }

                                                </div>                                             
                                            </> :
                                            <div className="btn-block">
                                                <Skeleton className="mb-2" width={198} height={40} variant="text" />
                                                <Skeleton className="mb-3" width={198} height={40} variant="text" />
                                            </div>
                                    }
                                   
                                </Col>
                            </Row>
                        </Col>
                        <Col md={'8'}>
                            { mail === false ? ContentPanel : <MailContentPanel closeMail={closeMail} /> }
                        </Col>
                    </Row>
                </CardBody>
            </Card>


            {/*
                {login ? <pre>{JSON.stringify(login, null, 2)}</pre> : <p>load</p>}
                {storage ? <pre>{storage}</pre> : <p>...</p>}
                {keycart ? keycart : '...'}
                {setInfo ? <pre>{JSON.stringify(setInfo, null, 2)}</pre> : <p>load</p>}
            */}
            
        </AdminInterface>
    )
}