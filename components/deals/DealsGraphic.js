import { Doughnut } from 'react-chartjs-2'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { Card, Col, Row } from 'reactstrap'

export function DealsGraphic()
{

    const TOTAL_SALES = {
        labels: ['Total Sales',''],
        datasets: [{
            data: [65, 35],
            backgroundColor: ['#36A2EB', '#f6f9fc'],
            borderWidth: 0
        }]
    }

    const SPENDINGS = {
        labels: ['Spendings',''],
        datasets: [{
            data: [35, 65],
            backgroundColor: ['#fab633', '#f6f9fc'],
            borderWidth: 0
        }]
    }

    const INCOME = {
        labels: ['Income',''],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['#0dd157', '#f6f9fc'],
            borderWidth: 0
        }]
    }

    const CANCELS = {
        labels: ['Cancels',''],
        datasets: [{
            data: [25, 85],
            backgroundColor: ['#fb4143', '#f6f9fc'],
            borderWidth: 0
        }]
    }

    return (
        <Row>
            <Col sm="6" xl="3" className="mb-4">
                <Card>
                    <div className="card-body media align-items-center px-xl-3">
                        <div className="mr-3" style={{width: '70px', height: '70px'}}> 
                            <Doughnut 
                                data={TOTAL_SALES} 
                                width={70} 
                                height={70} 
                                options={{ cutoutPercentage: 92, legend: {display:false} }}
                            /> 
                            <div className="u-doughnut__label text-info">65</div>
                        </div>
                        <div className="media-body">
                            <h5 className="h6 text-muted text-uppercase mb-2 js-loon">
                                Total Sales 
                                <FaArrowUp className="text-success ml-1" />
                            </h5>
                            <span className="h2 mb-0 js-loon-title">$560,400</span>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col sm="6" xl="3" className="mb-4">
                <Card>
                    <div className="card-body media align-items-center px-xl-3">
                        <div className="mr-3" style={{width: '70px', height: '70px'}}> 
                            <Doughnut 
                                data={SPENDINGS} 
                                width={70} 
                                height={70} 
                                options={{ cutoutPercentage: 92, legend: {display:false} }}
                            /> 
                            <div className="u-doughnut__label text-warning">35</div>
                        </div>
                        <div className="media-body">
                            <h5 className="h6 text-muted text-uppercase mb-2 js-loon">
                                Spendings 
                                <FaArrowDown className="text-danger ml-1" />
                            </h5>
                            <span className="h2 mb-0 js-loon-title">$6,700</span>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col sm="6" xl="3" className="mb-4">
                <Card>
                    <div className="card-body media align-items-center px-xl-3">
                        <div className="mr-3" style={{width: '70px', height: '70px'}}> 
                            <Doughnut 
                                data={INCOME} 
                                width={70} 
                                height={70} 
                                options={{ cutoutPercentage: 92, legend: {display:false} }}
                            /> 
                            <div className="u-doughnut__label text-success">60</div>
                        </div>
                        <div className="media-body">
                            <h5 className="h6 text-muted text-uppercase mb-2 js-loon">
                                Income 
                                <FaArrowUp className="text-success ml-1" />
                            </h5>
                            <span className="h2 mb-0 js-loon-title">$38,200</span>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col sm="6" xl="3" className="mb-4">
                <Card>
                    <div className="card-body media align-items-center px-xl-3">
                        <div className="mr-3" style={{width: '70px', height: '70px'}}> 
                            <Doughnut 
                                data={CANCELS} 
                                width={70} 
                                height={70} 
                                options={{ cutoutPercentage: 92, legend: {display:false} }}
                            /> 
                            <div className="u-doughnut__label text-danger">25</div>
                        </div>
                        <div className="media-body">
                            <h5 className="h6 text-muted text-uppercase mb-2 js-loon">
                                Cancels 
                                <FaArrowUp className="text-danger ml-1" />
                            </h5>
                            <span className="h2 mb-0 js-loon-title">$3,400</span>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}