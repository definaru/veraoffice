import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineFileProtect } from 'react-icons/ai'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import ListDeals from '../../../components/ListDeals'

export default function DealFull()
{

    const router = useRouter()
    const { href } = router.query
    const Data = ListDeals()
    const result = Data.filter(p => p.href.includes(href))
    const Title = result.map(title => title.name)

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineFileProtect className="text-vera" /> {Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/deals">
                        <a>My Deals</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            {result.map(s => (
            <Row key={s.id}>
                <Col md="12" className="mb-3">
                    <Card>
                        <CardHeader>
                            <h3 className="h3 card-header-title">Transaction details</h3>
                        </CardHeader>
                        <CardBody>
                            ...
                        </CardBody>
                        <CardFooter>
                            ...
                        </CardFooter>
                    </Card>
                </Col>

                <Col md="4" className="mb-3">
                    <Card>
                        <CardHeader>
                            <h3 className="h3 card-header-title">Agent</h3>
                        </CardHeader>
                        <CardFooter>
                            {s.agent}
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="4" className="mb-3">
                    <Card>
                        <CardHeader>
                            <h3 className="h3 card-header-title">Landlord <small>Seller Name</small></h3>
                        </CardHeader>
                        <CardBody>...</CardBody>
                        <CardFooter>
                            tjryj7ku
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="4" className="mb-3">
                    <Card>
                        <CardHeader>
                            <h3 className="h3 card-header-title">Tenant / Buyer Name</h3>
                        </CardHeader>
                        <CardBody>...</CardBody>
                        <CardFooter className="text-center">
                            <img src="/img/avatars/default_user.jpg" 
                            className="img-fluid rounded-circle mb-3 card-img" style={{width: '84px'}} />
                            <h2 className="mb-2 js-loon">{s.client}</h2>
                            
                        </CardFooter>
                    </Card>
                </Col>

                <Col md="12" className="mb-3">
                    <Card>
                        <CardHeader>
                            <h3 className="h3 card-header-title">Documents</h3>
                            <p>Anything you add is private until shared.</p>
                        </CardHeader>
                        <CardBody>...</CardBody>
                        <CardFooter>
                            dfhrtjyjykj
                        </CardFooter>
                    </Card>
                </Col>
            </Row>                
            ))}

        </AdminInterface>
    )
}