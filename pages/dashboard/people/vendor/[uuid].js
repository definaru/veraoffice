import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FaRegEnvelope, FaPhoneAlt, FaStar } from  'react-icons/fa'
import { MdChat } from 'react-icons/md'
import { AdminInterface } from '../../../../components/layout/AdminInterface'
import { Card, CardBody, Row, Col, Collapse } from 'reactstrap'
import UserList from '../../../../components/UserList'
import { AiOutlineCheck } from 'react-icons/ai'

export default function Vend()
{
    
    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen)
    const router = useRouter()
    const { uuid } = router.query
    const OpenVendorList = UserList()
    const result = OpenVendorList.filter(p => p.uuid.includes(uuid))
    const Title = result.map(title => title.name)

    return (
        <AdminInterface title={Title}>
            
            <h1 className="h2 font-weight-semibold mb-4 js-loon">{Title}</h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/people">
                        <a>People</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/people/vendor">
                        <a>Vendor</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Card className="mb-5">
                <CardBody>
                    {result.map(pl => (
                    <Row key={pl.id}>
                        <Col md={'3'} className="border-md-right border-light text-center pt-3">
                            <img 
                                src={pl.photo} 
                                alt={pl.name} 
                                className="img-fluid rounded-circle mb-3"
                                style={{width: '135px'}}
                            />
                            <h2 className="mb-2 js-loon">{pl.name}</h2>
                            <h5 className="text-muted mb-4 js-loon">{pl.position}</h5>
                            <Row>
                                <Col md={'10'} className="offset-md-1">
                                    <div className="mb-2">
                                        <a className="btn btn-primary btn-block mb-2" href={'mailto:'+`${pl.email}`}>
                                            &#160; <FaRegEnvelope />&#160; Send E-mail &#160;
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <a className="btn btn-success btn-block mb-2" href={'tel:'+`${pl.phone}`}>
                                            &#160; <FaPhoneAlt />&#160; Call Now &#160;
                                        </a>
                                    </div>                                    
                                </Col>
                            </Row>
                        </Col>
                        <Col md={'9'}>
                            <div className="ml-lg-5 ml-md-4 ml-sm-1 ml-0">
                                <h3 className="card-title pt-3 js-loon cp" onClick={toggle}>
                                    <u className="text-vera">About me</u>
                                </h3>
                                <Collapse isOpen={isOpen}>
                                    <p className="mb-5 js-loon-p">
                                        In this digital generation where information can be easily obtained 
                                        within seconds, business cards still have retained their importance 
                                        in the achievement of increased business exposure and business sales. 
                                        If your business already has a bunch of printed cards distributed to 
                                        a number of potential customers and yet you do not see any improvement 
                                        in your market reach, then it’s high time to revamp your old business card. 
                                        Take out your business card and look at it in an objective point of view. 
                                        If you were the customer, would you want to keep the card, or throw it away
                                    </p>
                                </Collapse>
                                <Row>
                                    <Col className="col-sm-3 mb-5 mb-lg-0">
                                        <h4 className="h3 mb-3 js-loon">License</h4>
                                        <div className="mb-1 js-loon">
                                            <span className="text-dark js-loon-p" style={{fontSize: '1.1em'}}># 457-0067-111</span>
                                        </div>
                                        <p className="btn btn-sm btn-success mb-0"><AiOutlineCheck /> Verified</p>
                                    </Col>
                                    <Col sm={'5'} className="col-6">
                                        <h4 className="h3 mb-3 js-loon">Knowledge of languages</h4>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <span className="bg-light text-muted rounded py-2 px-3 mb-2 mr-2">English</span>
                                            <span className="bg-light text-muted rounded py-2 px-3 mb-2 mr-2">German</span>
                                            <span className="bg-light text-muted rounded py-2 px-3 mb-2 mr-2">Chinese</span>
                                        </div>
                                    </Col>
                                    <Col sm={'4'} className="col-12">
                                        <h4 className="h3 mb-3 js-loon">Communication</h4>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <Link href="/dashboard/chat">
                                                <a className="btn btn-secondary rounded btn-block">
                                                    <MdChat />&#160;
                                                    Chat Message
                                                </a>                                                
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    ))} 
                </CardBody>
            </Card>
        </AdminInterface>
    )
}