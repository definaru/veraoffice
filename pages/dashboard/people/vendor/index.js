import Link from 'next/link'
import { Row, Card, Col, CardBody } from 'reactstrap'
import { AdminInterface } from "../../../../components/layout/AdminInterface"
import UserList from '../../../../components/UserList'
import { FaPhoneAlt, FaArrowRight } from 'react-icons/fa'

export default function IndexVend()
{

    const Title = 'List Of Venders'
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
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Row>
                {UserList().map( vender => (
                    <Col md="3" className="mb-5" key={vender.id}>
                        <Card className="text-center">
                            <Link href="/dashboard/people/vendor/[uuid]" as={`/dashboard/people/vendor/${vender.uuid}`}>
                                <a>
                                    <img 
                                        src={vender.photo} 
                                        alt={vender.name} 
                                        className="img-fluid rounded-circle mb-1 mt-5 card-img"
                                        style={{width: '50%'}} 
                                    />                                
                                </a>
                            </Link>
                            <CardBody>
                                <h4>{vender.name}</h4>
                                <p className="text-muted">{vender.position}</p>
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <a 
                                            href={'tel:'+`${vender.phone}`}
                                            className="btn btn-primary mr-2"
                                        >
                                            &#160;<FaPhoneAlt />&#160; 
                                            Call&#160;
                                        </a>
                                    </div>
                                    <div>
                                        <Link href="/dashboard/people/vendor/[uuid]" as={`/dashboard/people/vendor/${vender.uuid}`}>
                                            <a className="btn btn-dark">
                                                &#160;<FaArrowRight />&#160;
                                                Viev Profile&#160;
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </AdminInterface>
    )
}