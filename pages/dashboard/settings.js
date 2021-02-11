import Link from 'next/link'
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { ListSettings } from '../../components/helper/ListSettings'


export default function Settings()
{
    // ListSettings
    const Title = 'Settings'
    const List = ListSettings()


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
            <Card className="mb-4">
                <CardHeader className="text-right border-bottom-0">
                    <a onClick={() => window.history.back()} href="java:;">✖</a>
                </CardHeader>
                <CardBody>
                    <Row>
                        { List.map(s => (
                            <Col key={s.id} md="4" className="text-center mb-4" >
                                <Link href="/dashboard/settings/[href]" as={`/dashboard/settings/${s.href}`}>
                                    <a className="btn">
                                        <p className="s-icon">{s.icon}</p>
                                        <h4 className="text-vera">{s.header}</h4>
                                        <p className="text-muted">{s.text}</p>
                                    </a>
                                </Link>                            
                            </Col>
                            )
                        )}
                    </Row>
                </CardBody>
            </Card>
            <style jsx>{`
                .s-icon {
                    color: #999;
                    font-size: 80px;
                    opacity: 0.3;
                    margin: 0;
                }
            `}</style>
        </AdminInterface>
    )
}