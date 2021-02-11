import React, { useState } from 'react'
import Link from 'next/link'
//import { FaRegBell, FaSlidersH, FaRegSave } from  'react-icons/fa'
import { 
    Media, Row, Col, Card, CardBody, 
    CardText, CardHeader,
    Modal, ModalHeader, ModalBody, 
    ModalFooter, Button
} from 'reactstrap'
import { AiFillPlusCircle, AiOutlineSetting } from 'react-icons/ai'
import { AdminInterface } from '../../components/layout/AdminInterface'

export default function Vendors()
{
    const Title = 'Vendors'
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const VendorsList = [
        { id: '1', img: 'https://randomuser.me/api/portraits/women/21.jpg', text: 'Alexis Wilson', tog: 'toggle' },
        { id: '2', img: 'https://randomuser.me/api/portraits/women/19.jpg', text: 'Dani Bull', tog: '' },
        { id: '3', img: 'https://randomuser.me/api/portraits/women/69.jpg', text: 'Vildan Koçyiğit', tog: '' },
        { id: '4', img: 'https://randomuser.me/api/portraits/women/27.jpg', text: 'Reno Mendes', tog: '' },
        { id: '5', img: 'https://randomuser.me/api/portraits/women/85.jpg', text: 'Florence Taylor', tog: '' },
        { id: '6', img: 'https://randomuser.me/api/portraits/women/92.jpg', text: 'Marie Madsen', tog: '' },
    ]
    const OpenVendorList = [
        { id: '1', photo: 'https://randomuser.me/api/portraits/men/48.jpg', name: 'Felix Mortensen', phone: '+1 401 445-076-11', email: 'felix.mortensen@example.com', position: 'Brocker', uuid: '48520d72-b1cd-4e69-bcf5-78670c2c1597'},
        { id: '2', photo: 'https://randomuser.me/api/portraits/women/33.jpg', name: 'Nieves Delgado', phone: '+1 401 950-770-84', email: 'nieves.delgado@example.com', position: 'Designer', uuid: 'b3c53064-93e7-4fee-8b34-6ff7590cc1d6'},
        { id: '3', photo: 'https://randomuser.me/api/portraits/women/22.jpg', name: 'Elsa Roy', phone: '+1 401 102-410-14', email: 'elsa.roy@example.com', position: 'Manager', uuid: '4f6e80e5-539e-4c64-ac8e-aee734547202'},
        { id: '3', photo: 'https://randomuser.me/api/portraits/women/92.jpg', name: 'Marie Madsen', phone: '+1 101 202-410-14', email: 'marie.roy@example.com', position: 'Manager', uuid: '4f6e80e5-539e-4c64-ac8e-aee734547202'},
    ]

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">{Title}</h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader className="d-flex align-items-center">
                            <h2 className="h3 card-header-title">Local Service Providers</h2>
                            <ul className="list-inline ml-auto mb-0">
                                <li className="list-inline-item">
                                    <a className="link-muted h3" href="#!">
                                        <AiOutlineSetting />
                                    </a>
                                </li>
                            </ul>
                        </CardHeader>
                        <CardBody>
                            <p>Connect with these service providers so you have more option</p>
                            <Row>
                            { VendorsList.map( ven  => (
                                <Col md="2" key={ven.id}>
                                    <Card className="shadow-sm" onClick={ toggle } data-id={ven.id} >
                                        <img width="100%" src={ven.img} alt={ven.text} />
                                        <CardBody className="p-2 text-center">
                                            <CardText>{ven.text}</CardText>
                                        </CardBody>
                                    </Card>
                                    {
                                        ven.tog == '' ? 
                                            '' :
                                            <Modal isOpen={modal} toggle={toggle} className="modal-lg modal-dialog-centered">
                                                <ModalHeader toggle={toggle}>List Of Venders</ModalHeader>
                                                <ModalBody className="bg-light pb-0">
                                                    <Row>
                                                    {OpenVendorList.map(people => (
                                                        <Col md="4" className="mb-3" key={people.id}>
                                                            <Media className="border p-3 rounded bg-white">
                                                                <Media left>
                                                                    <Link href="/dashboard/people/vendor/[uuid]" as={`/dashboard/people/vendor/${people.uuid}`}>
                                                                        <a>
                                                                            <img 
                                                                                src={people.photo} 
                                                                                alt={people.name} 
                                                                                className="mr-3 rounded-circle" 
                                                                                style={{width: "50px"}}
                                                                            />                                                                        
                                                                        </a>
                                                                    </Link>
                                                                </Media>
                                                                <Media body>
                                                                    <Link href="/dashboard/people/vendor/[uuid]" as={`/dashboard/people/vendor/${people.uuid}`}>
                                                                        <a><Media heading className="m-0 pt-2">{people.name}</Media></a>
                                                                    </Link>
                                                                    <small>{people.position}</small>  
                                                                    <div className="d-flex justify-content-end">
                                                                        <AiFillPlusCircle 
                                                                            className="text-success" 
                                                                            style={{fontSize: '25px'}}
                                                                        />
                                                                    </div>                                                      
                                                                </Media>
                                                            </Media>
                                                        </Col>
                                                        ) 
                                                    )}
                                                    </Row>
                                                </ModalBody>
                                            </Modal>                                    
                                    }
                                </Col>
                                )
                            )}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </AdminInterface>
    )
}