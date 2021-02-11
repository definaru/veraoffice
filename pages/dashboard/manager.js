import Link from 'next/link'
import { AiFillFolderOpen } from 'react-icons/ai'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { Row, Col, Card, CardBody, Media } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'

export default function Manager()
{

    const Title = 'Office Manager'
    const Rent = [
        {
            id: '1', 
            image: '/img/Rental-Application.jpg', 
            href: 'https://www.rentapplication.net/apply/verarealty/',
            title: 'Rent Application',
            text: 'Screen Your Tenants Fast.<br/><small>With Instant Online Applications and Background Checks</small>'
        },
        {
            id: '2', 
            image: '/img/C6GLNo-VAAA92Rp.jpg', 
            href: 'https://www.rentspree.com/verarealty/',
            title: 'RentSpree',
            text: 'Premier Rental Application and <br/><small>Screening Suite for Vera Realty members.</small>'
        }
    ]

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
            <Row>
                {Rent.map(r => (
                <Col key={r.id} md="6">        
                    <Card className="mb-3">
                        <CardBody className="p-0">
                            <Media>
                                <Media left>
                                    <a 
                                        href={r.href} 
                                        className="imageCreateForOffice rounded-left"
                                        target="_blank" 
                                        rel="nofollow" 
                                        style={{
                                            background: `url(${r.image}) no-repeat`,
                                        }}
                                    >
                                        <AiFillFolderOpen className="iconCreateForOffice" />
                                    </a>
                                </Media>
                                <Media body className="p-4">
                                    <a href={r.href} target="_blank" rel="nofollow" className="float-right btn btn-default border">
                                        <BsBoxArrowInUpRight />
                                    </a>
                                    <a href={r.href} target="_blank" rel="nofollow">
                                        <h3 className="title">{r.title}</h3>
                                    </a>
                                    <p className="text-muted m-0" dangerouslySetInnerHTML={ {__html: r.text} }></p>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>    
                ))}
            </Row>
        </AdminInterface>
    )
}