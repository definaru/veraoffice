import { Col, Jumbotron, Row } from 'reactstrap'


export function BusinessCardFront(props)
{

    const color = {color: '#4054b2'}

    return (
        <Jumbotron 
            key={props.data.id}
            id={props.theme}
            className="pt-3 pb-3 border shadow d-print-block"
            style={{width: '440px'}}
        >
            <Row>
                {
                    props.theme == 'personal' ? 
                    <Col md="6">
                        <div className="rounded-circle mt-3" style={{                        
                            background: `url(${props.data.photo}) no-repeat`, 
                            backgroundSize: 'cover',
                            width: '150px', 
                            height: '150px'
                        }} />
                    </Col> : ''
                }
                <Col md={props.theme == 'personal' ? '6' : '12'} className={props.theme == 'personal' ? "text-left" : "text-center"}>
                    <img 
                        src={
                            props.theme == 'dark' ? 
                                '/img/Logo-white.png' : 
                                '/img/Logo-blue.png'
                        } 
                        style={props.theme == 'personal' ? {marginTop: '5px', width: '90%'} : {width: '50%'}} 
                    />
                    <h3 className="mt-3 mb-0">{`${props.data.username} ${props.data.lastname}`}</h3>
                    <p className="m-0">{props.data.rank}</p>
                    <small>
                        1920 E Hallandale Beach Blvd STE 801 Hallandale Beach FL 33009
                    </small>
                </Col>
                <Col md="6">
                    <p className="m-0 font-weight-bold">C: {props.data.phone}</p>
                    <p className="m-0 font-weight-bold">W: +1 (305) 833-3303</p>
                </Col>
                <Col md="6">
                    <p className="m-0 font-weight-bold">https://verarealty.com</p>
                    <p className="m-0 font-weight-bold">{props.data.email}</p>
                </Col>
            </Row>
        </Jumbotron>
    )
}