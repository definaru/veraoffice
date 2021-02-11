import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { GetUserDataAPI } from '../../../components/GetUserDataAPI'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { FaBan, FaPhoneAlt, FaTelegramPlane, FaUserCircle } from 'react-icons/fa'
import { Card, CardBody, Row, Col, Collapse, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { AiOutlineCheck } from 'react-icons/ai'
import { LoadRole } from '../../../components/helper/LoadRole'


export default function User()
{

    const router = useRouter()
    const data = GetUserDataAPI()
    const { api } = router.query
    const result = data ? data.filter(p => p.api.includes(api)) : null
    const Title = result === null ? 'Loading...' : result.map(h => h.username + ' ' + h.lastname)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const Lang = (data) => {
        let str = data
        let arr = str.split(', ') 
        return arr
    }

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <FaUserCircle className="text-vera" /> {Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/admin">
                        <a>Admin Panel</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/admin/users">
                        <a>A list of users</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Card style={{marginBottom: '100px'}}>
                <CardBody>
                    {result ? 
                        <>
                            {result.map(pl => (
                                <Row key={pl.id}>
                                    <Col md={'4'} className="border-md-right border-light text-center pt-3">
                                        {
                                            pl.photo === '' ?
                                                <div className="d-flex justify-content-center">
                                                    <span 
                                                        className="rounded-circle border mr-3 d-block text-center bg-primary mb-3"
                                                        style={{
                                                            color: '#fff', 
                                                            paddingTop: '19px', 
                                                            fontSize: '30px',
                                                            width: '84px', 
                                                            height: '84px'
                                                        }}
                                                    >
                                                        {`${pl.username[0]}${pl.lastname[0]}`}
                                                    </span>
                                                </div> : 
                                                <>
                                                    <img 
                                                        src={pl.photo} 
                                                        alt={pl.username} 
                                                        onClick={toggle}
                                                        className="img-fluid rounded-circle mb-3 cp"
                                                        style={{
                                                            width: '84px', 
                                                            height: '84px'
                                                        }}
                                                    />  

                                                    <Modal isOpen={modal} toggle={toggle}>
                                                        <ModalHeader toggle={toggle}>{`${pl.username} ${pl.lastname}`}</ModalHeader>
                                                        <ModalBody className="p-0">
                                                            <img src={pl.photo} style={{width: '100%'}} />
                                                        </ModalBody>
                                                    </Modal>                                             
                                                </>

                                        }
                                        <h2 className="mb-2 js-loon">{`${pl.username} ${pl.lastname}`}</h2>
                                        <h5 className="text-muted mb-2 js-loon">{pl.rank}</h5>
                                        <strong 
                                            className="badge badge-primary" 
                                            style={{
                                                fontSize: '15px', 
                                                textTransform: 'uppercase'
                                            }}>
                                            <LoadRole roles={pl.level} />
                                        </strong>
                                        <div className="btn-block mt-2 mb-3">
                                        {
                                            pl.phone === '' || pl.phone === null ? 
                                                <span className="badge badge-light text-muted">
                                                    ( no data )
                                                </span> :
                                                <>
                                                    <a href={`tel:${pl.phone}`} style={{fontSize: '25px'}}>
                                                        <span className="badge badge-light">
                                                            <FaPhoneAlt />&#160; {pl.phone}
                                                        </span>
                                                    </a>
                                                </>
                                        }                                            
                                        </div>
                                        <a href={`mailto:${pl.email}`}><u>{pl.email}</u></a>
                                        <div className="input-group mt-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">API key</span>
                                            </div>
                                            <input 
                                                type="text" 
                                                defaultValue={pl.api}
                                                className="form-control" 
                                                placeholder={`API KEY USER - ${pl.username} ${pl.lastname}`} 
                                            />
                                        </div>
                                    </Col>
                                    <Col md={'8'}>
                                        <Row>
                                            <Col lg={'12'}>
                                                <h3 className="card-title js-loon">About me</h3>
                                                <p className="mb-5 js-loon-p">{pl.descript ? pl.descript : '( no data )'}</p>
                                            </Col>
                                            <Col lg={'3'} className="mb-5 mb-lg-0">
                                                <h4 className="h3 mb-3 js-loon">License</h4>
                                                {
                                                    pl.license_number ? 
                                                    <>
                                                        <div className="mb-1 js-loon">
                                                            <span className="text-dark js-loon-p" style={{fontSize: '1.1em'}}>
                                                                # {pl.license_number}
                                                            </span>
                                                        </div>
                                                        <p className="btn btn-sm btn-success mb-0"><AiOutlineCheck /> Verified</p>                                                    
                                                    </> : 
                                                    <>
                                                        <div className="mb-1 js-loon">
                                                            <span className="text-muted js-loon-p">
                                                                No license
                                                            </span>
                                                        </div>
                                                        <p className="btn btn-sm btn-danger mb-0"><FaBan /> No Verified</p>
                                                    </>
                                                }
                        
                                            </Col>
                                            <Col lg={'3'}>
                                                <h4 className="h3 mb-3 js-loon">Country</h4>
                                                <p><img src="/flags/us.svg" style={{width: '60px'}} alt="en" /><br/> Miami, FL, USA</p>
                                            </Col>
                                            <Col lg={'6'}>
                                                <h4 className="h3 mb-4 js-loon">Knowledge of languages</h4>
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <div>
                                                        {
                                                            Lang(pl.languages).map((item, i) => (
                                                                <span key={item + i} className="bg-light text-muted rounded py-2 px-3 mb-2 mr-2">
                                                                    {item}
                                                                </span>
                                                            ))
                                                        }
                                                        {/*<pre>{JSON.stringify(Lang(pl.languages), null, 2)}</pre>*/}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row> 
                                        <Row>
                                            <Col md={12}>
                                                <a className="btn btn-primary" href={`https://5guys.ru/v1/mail/send?name=${pl.username} ${pl.lastname}&email=${pl.email}&subject=Service newsletter&base=${pl.api}`} target="_blank">
                                                    &#160;&#160;<FaTelegramPlane />&#160;Send Invitation&#160;&#160;
                                                </a>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            ))}                        
                        </> :
                        <Row>
                            <Col md={'4'} className="border-md-right border-light text-center pt-3">
                                <Skeleton circle={true} width={84} height={84} />
                            </Col>
                            <Col md={'8'}>'Loading...'</Col>
                        </Row>
                    }
                    {/*

                    <Skeleton />
                    <pre>
                        {result ? JSON.stringify(result, null,2) : 'Loading...'}
                    </pre>                    
                    */}
                    

                </CardBody>
            </Card>
        </AdminInterface>
    )
}