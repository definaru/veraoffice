import React from 'react'
import Link from 'next/link'
import { AiOutlineBorderInner, AiOutlineProject } from "react-icons/ai";
import { AdminInterface } from "../../components/layout/AdminInterface";
import { Row, Card, CardHeader, Col } from 'reactstrap';

export default function Boardsales()
{
    const Title = 'Board Sales'
    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineProject className="text-vera" /> {Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Row>
                <Col xs="3">
                    <Card>
                        <CardHeader className="text-center cp">
                            <AiOutlineBorderInner 
                                style={{fontSize: '25px'}} 
                                className="text-vera mb-2" 
                            />
                            <h6>Add Board</h6>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
        </AdminInterface>
    )
}