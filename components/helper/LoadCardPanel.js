import Skeleton from 'react-loading-skeleton'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'

export function LoadCardPanel()
{
    return (
        <Col md="4">
            <Card className="mb-4">
                <CardHeader>
                    <Row>
                        <Col xs="6">
                            <Skeleton variant="rect" width={15} height={15} />
                        </Col>
                        <Col xs="6">
                            <div className="d-flex justify-content-end">
                                <div className="pl-3">
                                    <Skeleton variant="circle" className="rounded-circle" width={20} height={20} />                                        
                                </div>
                                <div className="pl-3">
                                    <Skeleton variant="circle" className="rounded-circle" width={20} height={20} />                                        
                                </div>
                                <div className="pl-3">
                                    <Skeleton variant="circle" className="rounded-circle" width={20} height={20} />                                        
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="text-center">
                    <Skeleton variant="circle" className="rounded-circle mb-3" width={84} height={84} /> 
                    <Skeleton variant="text" className="mb-2" height={25} />
                    <div className="btn-block">
                        <Skeleton variant="text" className="mb-2" style={{width: '50%'}} height={15} />
                    </div>
                    <div className="btn-block">
                        <Skeleton variant="text" className="mb-3" style={{width: '20%'}} height={16} />
                    </div>
                    <div className="btn-block">
                        <Skeleton variant="text" style={{width: '65%'}} height={12} />
                    </div>
                    <div className="btn-block m-0">
                        <Skeleton variant="text" className="mb-2" style={{width: '65%'}} height={12} />
                    </div>
                </CardBody>
                <CardFooter className="p-0 border-top-0">
                    <div style={{height: '51px'}}></div>
                </CardFooter>
            </Card>
        </Col>
    )
}