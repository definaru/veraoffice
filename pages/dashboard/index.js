import Link from 'next/link'
import React, { useState } from 'react'
import Homelist from '../../components/Homelist'
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { DealsGraphic } from '../../components/deals/DealsGraphic'
import Account from '../../components/context/UserAccount'
import Skeleton from 'react-loading-skeleton'
import { FaTimes } from 'react-icons/fa'
//import UseContext from '../../components/context/UseContext'


export default function Dashboard() 
{

    const Title = 'Admin Panel'
    const data = Homelist()
    const info = Account()
    const [state, setState] = useState(true)
    //const info = React.useContext(UseContext)

    //useEffect(() => {
    //    https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
    //    window.addEventListener('resize', () => setWidths(window.innerWidth), false)
    //}, [widths])

 
    return (
        <AdminInterface title={Title}>
            <DealsGraphic />
            <Row>
                <Col md="12">
                    {/*{info ? <pre>{JSON.stringify(info, null, 2)}</pre> : <p>...</p>} */}   
                </Col>
                <Col md="12" className={state ? "text-center mt-4 mb-5" : "d-none"}>
                    <Card>
                        <CardHeader 
                            className="bg__index" 
                            style={{
                                background: `url(/img/20180223145435675364077o.jpg) no-repeat`
                            }}
                        >
                            <div className="btn btn-sm bg-white float-right" onClick={() => setState(false)}>
                                <FaTimes />
                            </div>
                        </CardHeader>
                        <CardBody>
                            {
                                info.user.currently ?
                                <div className="d-flex justify-content-center" style={{
                                    position: 'relative', 
                                    top: '-17px', 
                                    marginTop: '-48px'
                                }}>
                                    <div 
                                        className="avatar-bg-index rounded-circle border border-white" 
                                        style={{
                                            background: info.user.currently.photoURL ? `url(${info.user.currently.photoURL}) no-repeat` : `linear-gradient(180deg, #161d6f, #455694)`,
                                            borderWidth: '5px !important'
                                        }}
                                    />
                                </div> : ''                               
                            }
                           
                            <h4 className="text-vera">
                                {info.user.currently ? `Hello, ${info.user.currently.displayName}` : <Skeleton variant="text" width={120} height={30} className="mr-2" />}.&#160;
                                {info.user.session ? `Welcome To ${info.user.session}` : <Skeleton variant="text" width={100} height={30} />}                                  
                            </h4> 

                            <h2>Vera Office - ONLINE OFFICE</h2>
                            <hr />
                            <p>
                                `Vera Office` Agents, welcome to your online office.
                                Here you can complete all your paperwork under <u><Link href="/dashboard/deals"><a>my deals</a></Link></u>.  
                                <br/>
                                Create a complete Marketing Suite under <u><Link href="/dashboard/marketing"><a>marketing</a></Link></u>. 
                                Utilize amazing resources under <u><Link href="/dashboard/education"><a>education</a></Link></u> 
                                &#160;and <u><Link href="/dashboard/vendors"><a>vendor</a></Link></u>.  
                                <br/>
                                Utilize our <u><Link href="/dashboard/manager"><a>office manager</a></Link></u> as 
                                your source of information about our brokerage and fulfill all your needs to increase your productivity.
                            </p>                            
                        </CardBody>
                    </Card>

                </Col>
                {data.map(h => (
                <Col key={h.id} md={h.size} className="mb-4">
                    <Card>
                        <Link href={h.href}>
                            <a>
                                <img className="card-img-top" src={h.img} alt={h.header} />
                            </a>
                        </Link>
                        <CardBody className="text-center">
                            <h4 className="mb-4">{h.header}</h4>
                            <Link href={h.href}>
                                <a className="btn btn-outline-primary btn-block col-md-8 offset-md-2 mb-2">Click Here</a>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>                    
                ))}
            </Row>
        </AdminInterface>
    )
}