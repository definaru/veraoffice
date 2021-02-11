import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { AdminInterface } from "../../components/layout/AdminInterface"
import { Card, Col, CardBody, Row, Media, Input, Badge, ModalHeader, Modal, ModalBody, Button, ModalFooter } from "reactstrap"
import { FaAward, FaBars, FaMailBulk, FaPhoneSlash, FaTelegramPlane } from 'react-icons/fa'
import { IoMdCall } from 'react-icons/io'
import { AiOutlineSetting, AiOutlinePhone, AiOutlineLayout, AiOutlineUsergroupAdd, AiOutlineBranches, AiOutlineUser, AiOutlineDelete, AiOutlineStop, AiOutlineClear } from 'react-icons/ai'
import { Scrollbars } from 'react-custom-scrollbars'
import { LoginUser } from '../../components/LoginUser'


export default function Chat()
{

    const Title = 'Chat'
    const User = LoginUser()
    const Avatar = User.map(u => u.avatar)
    const Name = User.map(n => n.first_name + ' ' + n.last_name)
    const Phone = User.map(c => c.phone) 

    const [chat, setChat] = useState(0)
    const [layout, setLayout] = useState(false)
    const [call, setCall] = useState(false)
    const isCalled = () => setCall(!call)
    const isOpen = () => setLayout(prevState => !prevState)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)

    useEffect(() => {
        window.addEventListener("mouseup", () => setDropdownOpen(false), false)
    })

    const openNav = () => {
        setChat("97%")
    }

    const closeNav = () => {
        setChat("0")
    }

    return (
        <AdminInterface title={Title}>

            <Modal isOpen={call} toggle={isCalled} className="modal-sm modal-dialog-centered">
                <ModalHeader toggle={isCalled} className="text-muted js-loon border-bottom-0">Connected...</ModalHeader>
                <ModalBody className="text-center">
                    <img src="https://randomuser.me/api/portraits/women/28.jpg" className="u-avatar--md img-fluid rounded-circle" />
                    <h2 className="mt-3">Esma Gönültaş</h2>
                </ModalBody>
                <ModalFooter className="border-top-0">
                    <Row>
                        <Col sm="6" className="text-center">
                            <Button color="success" className="btn-pill pl-3 pr-3">
                                <IoMdCall style={{marginTop: '7px', marginBottom: '7px', fontSize: '25px'}} />
                            </Button>
                        </Col>
                        <Col sm="6" className="text-center">
                            <Button color="danger" className="btn-pill pl-3 pr-3" onClick={isCalled}>
                                <FaPhoneSlash style={{marginTop: '7px', marginBottom: '7px', fontSize: '25px'}} />
                            </Button>
                        </Col>
                    </Row>                    
                </ModalFooter>
            </Modal>

            <Card className="mb-5">
                <CardBody className="p-0">
                    <Row className="defina-messenger" style={{height: '450px'}}>
                        <Col md={layout == false ? 4 : 3} className="border-md-right border-light pr-lg-0 pr-md-0">
                            <div className="list-group list-group-flush">

                                <div className="list-group-item list-group-item-action bg-white">
                                    <Media className="align-items-center">
                                        <FaBars className="mr-3 cp" style={{fontSize: '20px'}} onClick={openNav} />
                                        <Media body>
                                            <Input />
                                        </Media>
                                    </Media>
                                </div>
                                <div className="sidenav" style={{width: chat}}>
                                    <div className="closebtn cp" onClick={closeNav}>&times;</div>
                                    <a>
                                        <Media>
                                            <img 
                                                src={Avatar} 
                                                className="img-fluid rounded-circle mr-3" 
                                                style={{width: '20%'}} 
                                            />
                                            <Media body>
                                                <h4 className="m-0 pt-3">{Name}</h4>
                                                <small className="text-muted">{Phone}</small>
                                            </Media>
                                        </Media>
                                    </a>
                                    <a href="#">
                                        <AiOutlineUsergroupAdd className="text-vera" /> <small>Create group</small>
                                    </a>
                                    <a href="#">
                                        <AiOutlineBranches className="text-vera" /> <small>Create channel</small>
                                    </a>
                                    <a href="#">
                                        <AiOutlineUser className="text-vera" /> <small>Contacts</small>
                                    </a>
                                    <a onClick={isCalled} className="cp">
                                        <AiOutlinePhone className="text-vera" /> <small>Calls</small>
                                    </a>
                                    <a href="#">
                                        <AiOutlineSetting className="text-vera" /> <small>Setting</small>
                                    </a>
                                </div>

                                <a className="list-group-item list-group-item-action" href="#">
                                    <Media className="align-items-center">
                                        <img 
                                            src="https://randomuser.me/api/portraits/men/58.jpg" 
                                            className="u-avatar--sm rounded-circle mr-3 card-img" 
                                        />
                                        <Media body>
                                            <div className="d-flex align-items-center">
                                                <h4 className="mb-1 js-loon">Everett Knight</h4>
                                                <small className="text-muted ml-auto">Jan 25, 2020</small>
                                            </div>
                                            <p className="text-truncate mb-0">
                                                Brocker
                                            </p>
                                        </Media>                                        
                                    </Media>
                                </a>
                                <a className="list-group-item list-group-item-action" href="#">
                                    <Media className="align-items-center">
                                        <img 
                                            src="https://randomuser.me/api/portraits/men/69.jpg" 
                                            className="u-avatar--sm rounded-circle mr-3 card-img" 
                                        />
                                        <Media body>
                                            <div className="d-flex align-items-center">
                                                <h4 className="mb-1 js-loon">Nasim Veltman</h4>
                                                <small className="text-muted ml-auto">Feb 11, 2020</small>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="text-truncate mb-0">
                                                    Brocker
                                                </p>
                                                <Badge color="danger" className="badge-pill">2</Badge>                                               
                                            </div>

                                        </Media>                                        
                                    </Media>
                                </a>
                                <a className="list-group-item list-group-item-action" href="#">
                                    <Media className="align-items-center">
                                        <img 
                                            src="https://randomuser.me/api/portraits/women/67.jpg" 
                                            className="u-avatar--sm rounded-circle mr-3 card-img" 
                                        />
                                        <Media body>
                                            <div className="d-flex align-items-center">
                                                <h4 className="mb-1 js-loon">Megan Allen</h4>
                                                <small className="text-muted ml-auto">Aug 23, 2020</small>
                                            </div>
                                            <p className="text-truncate mb-0">
                                                Brocker
                                            </p>
                                        </Media>                                        
                                    </Media>
                                </a>
                            </div>
                        </Col>                        
                        <Col 
                            md={layout == false ? 8 : 6} 
                            className={
                                layout == false ? 
                                    "pl-lg-0 pl-md-0 ks-messages ks-messenger__messages" : 
                                    "p-0 ks-messages ks-messenger__messages"
                            }
                        >
                            <div className="ks-header">
                                <div className="ks-description">
                                    <div className="d-flex cp" onClick={isOpen}>
                                        <div>
                                            <img 
                                                src="https://randomuser.me/api/portraits/women/28.jpg" 
                                                className="u-avatar--xs img-fluid rounded-circle mr-2 card-img"
                                                alt="Esma Gönültaş"
                                            />
                                        </div>
                                        <div>
                                            <div className="ks-name">Esma Gönültaş</div>
                                            <div className="ks-amount">Was 5 minutes ago</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ks-controls">
                                    <div className="d-flex flex-row">
                                        <div className="p-3">
                                            <AiOutlinePhone onClick={isCalled} className="cp" />
                                        </div>
                                        <div className="p-3">
                                            <AiOutlineLayout onClick={isOpen} className="cp" />
                                        </div>
                                        <div className="p-3">
                                            <div className={dropdownOpen == true ? "dropdown show" : "dropdown"}>
                                                <button 
                                                    className="btn p-0 dropdown-toggle" 
                                                    data-toggle="dropdown" 
                                                    onClick={toggle}
                                                    aria-expanded={dropdownOpen}
                                                >
                                                    <AiOutlineSetting/>
                                                </button>
                                                <div className={dropdownOpen == true ? "dropdown-menu dropdown-menu-right shadow show" : "dropdown-menu dropdown-menu-right"}>
                                                    <a className="dropdown-item" href="#">
                                                        <AiOutlineStop /> Blocked this user
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        <AiOutlineClear /> Clear chat
                                                    </a>
                                                    <a className="dropdown-item text-danger" href="#">
                                                        <AiOutlineDelete /> Delete chat
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Col md="12" className="p-0" style={{background: '#fbfbfb'}}>
                            <Scrollbars 
                                autoHide
                                autoHideTimeout={1000}
                                autoHideDuration={200}
                                style={{ width: '100%', height: '312px' }}
                            >
                                <div className="ks-body">
                                    <ul className="ks-items">
                                        <li className="ks-item ks-self"> 
                                            <span className="ks-avatar ks-offline"> 
                                                <img src="https://randomuser.me/api/portraits/women/28.jpg" width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">Esma Gönültaş</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message js-loon-p">The weird future of movie theater food</div>
                                            </div>
                                        </li>
                                        <li className="ks-item ks-from"> 
                                            <span className="ks-avatar ks-online"> 
                                                <img src={Avatar} width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">{Name}</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message">The weird future of movie theater food</div>
                                            </div>
                                        </li>
                                        <li className="ks-item ks-from"> 
                                            <span className="ks-avatar ks-online"> 
                                                <img src={Avatar} width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">{Name}</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message">The weird future of movie theater food</div>
                                            </div>
                                        </li>
                                        <li className="ks-item ks-self"> 
                                            <span className="ks-avatar ks-offline"> 
                                                <img src="https://randomuser.me/api/portraits/women/28.jpg" width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">Esma Gönültaş</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message">The weird future of movie theater food</div>
                                            </div>
                                        </li>
                                        <li className="ks-item ks-from ks-unread"> 
                                            <span className="ks-avatar ks-online"> 
                                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">Brian Diaz</span> 
                                                    <span className="ks-datetime">1 minute ago</span>
                                                </div>
                                                <div className="ks-message"> The weird future of movie theater food</div>
                                            </div>
                                        </li>
                                        <li className="ks-separator">Today</li>
                                        <li className="ks-item ks-self"> 
                                            <span className="ks-avatar ks-offline"> 
                                                <img src="https://randomuser.me/api/portraits/women/28.jpg" width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">Esma Gönültaş</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message"> 
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type 
                                                    specimen book. It has survived not only five centuries, but also the leap into 
                                                    electronic typesetting, remaining essentially unchanged. It was popularised in 
                                                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software like Aldus PageMaker including 
                                                    versions of Lorem Ipsum
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ks-item ks-self"> 
                                            <span className="ks-avatar ks-offline"> 
                                                <img src="https://randomuser.me/api/portraits/women/28.jpg" width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">Esma Gönültaş</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message"> 
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type 
                                                    specimen book. It has survived not only five centuries, but also the leap into 
                                                    electronic typesetting, remaining essentially unchanged. It was popularised in 
                                                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software like Aldus PageMaker including 
                                                    versions of Lorem Ipsum
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ks-item ks-self"> 
                                            <span className="ks-avatar ks-offline"> 
                                                <img src="https://randomuser.me/api/portraits/women/28.jpg" width="36" height="36" className="rounded-circle" /> 
                                            </span>
                                            <div className="ks-body">
                                                <div className="d-flex justify-content-between"> 
                                                    <span className="ks-name">Esma Gönültaş</span> 
                                                    <span className="ks-datetime">6:46 PM</span>
                                                </div>
                                                <div className="ks-message"> 
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type 
                                                    specimen book. It has survived not only five centuries, but also the leap into 
                                                    electronic typesetting, remaining essentially unchanged. It was popularised in 
                                                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software like Aldus PageMaker including 
                                                    versions of Lorem Ipsum
                                                </div>
                                            </div>
                                        </li>
                                    </ul>                                    
                                </div>
                            </Scrollbars>
                            </Col>
                            <div className="ks-footer">
                                <textarea className="form-control" placeholder="Type something..." rows="1"></textarea>
                                <div className="ml-2 ks-controls"> 
                                    <button type="submit" className="btn btn-primary">&#160;<FaTelegramPlane />&#160;Send&#160;</button>
                                </div>
                            </div>                            
                        </Col> 
                        <Col md="3" className={layout == false ? "d-none" : "pl-0 text-center"} style={{borderLeft: '1px solid #ddd'}}>
                            <div className="mt-5 d-block p-3">
                                <img 
                                    src="https://randomuser.me/api/portraits/women/28.jpg" 
                                    className="u-avatar--md img-fluid rounded-circle" 
                                />
                                <h4 className="mt-3">Esma Gönültaş</h4>
                                <p>Brocker <FaAward className="text-success" /></p>
                                <hr />   
                                <a href="tel:+14012023366" className="btn btn-block"><IoMdCall />&#160;+1 401 202-33-66</a>                             
                                <a href="mailto:esma@example.com" className="btn btn-block m-0"><FaMailBulk />&#160;&#160;esma@example.com</a>                             
                                <Button color="outline-info" className="btn-block">View Profile</Button>
                            </div>

                        </Col>                
                    </Row>
                </CardBody>
            </Card>
            <style jsx>{`
                .list-group-flush:last-child 
                .list-group-item:last-child {
                    border-bottom: 1px solid #eaf2f9;
                }
		    `}</style>
        </AdminInterface>
    )
}