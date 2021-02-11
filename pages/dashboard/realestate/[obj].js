import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Row } from 'reactstrap'
import { FaBath, FaBed, FaCropAlt, FaMapMarkerAlt } from 'react-icons/fa'
import Loading from '../../../components/Loading'
import { CSSTransition } from 'react-transition-group';



export default function Obj()
{

    const router = useRouter()
    const { obj } = router.query
    const [data, setData] = useState([])
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(true)

    const limit = 100
    const token = process.env.TOKEN
    const Street = data.StreetDirPrefix == null ? '' : data.StreetDirPrefix
    const Title = data.StreetNumber + ' ' + Street +' '+ data.StreetName
    const price = data.ListPrice 

    useEffect(() => {
        try {
            
            const fetchData = async () => {
                const result = await fetch(`https://rets.io/api/v2/miamire/listings/${obj}?access_token=${token}`) //&limit=${limit}
                const res = await result.json()
                setData(res.bundle);
                setLoading(false)
            }
            fetchData()

        } catch (e) {
            console.error(e);
            alert(data.message)
        }

    }, [data, obj, loading])

    function imageData(e)
    {
        return e == 1 ? "d-block" : "d-none"
    }


    if(loading) {
        return (
            <AdminInterface title='Loading...'>
                <button className="btn bg-white">
                    <Loading border="#d5dee6" classes="text-dark" />
                </button>
            </AdminInterface>
        )
    }
    return (
        <AdminInterface title={`Address: ${Title}`}>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <h1 className="h2 font-weight-semibold js-loon m-0">
                        <FaMapMarkerAlt className="text-vera" /> {Title}
                    </h1>
                    <strong className="text-muted mt-3 btn-block">
                        {data.SubdivisionName == null ? '' : data.SubdivisionName + ' | '}{data.City}
                    </strong> 
                </div>
                <div className="text-right">
                    <Button color="primary" className="font-weight-bold">
                        &#160; $ {parseInt(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &#160;
                    </Button>
                    {data.LivingArea == null ? 
                        '' : 
                        <p className="text-muted mt-3 btn-block">
                            ${Math.floor(parseInt(data.ListPrice)/parseInt(data.LivingArea))} / Sqft.
                        </p>
                    }
                </div>
            </div>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/property">
                        <a>Real estate</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            {
                data.name == 'NotFoundError' ? 
                <>
                    <CSSTransition>
                        <p>{data.message}</p>
                    </CSSTransition>
                </> :
                <Row>
                    <Col md="9">
                        <Card className="mb-4">
                            <CardHeader className="real-pos-box">
                                <span className="type">
                                    <div className="d-flex justify-content-between">
                                        <div><FaCropAlt />&#160;{data.LivingArea}&#160;sqft&#160;</div>
                                        <div>&#160;<span className="text-muted">|</span>&#160;&#160;</div>
                                        <div><FaBed />&#160;{data.BedroomsTotal}&#160;</div>
                                        <div>&#160;<span className="text-muted">|</span>&#160;&#160;</div>
                                        <div><FaBath />&#160;{data.BathroomsFull}&#160;</div>
                                    </div>
                                </span>
                                <span className="imagine">{data.PhotosCount} Photos</span>

                                {data.Media.map(img => (
                                    <a 
                                        key={img.Order} 
                                        data-fancybox="gallery" 
                                        data-caption={img.ShortDescription} 
                                        id="fancybox" 
                                        href={img.MediaURL}
                                        className={imageData(`${img.Order}`)}
                                    >
                                        <img src={img.MediaURL} alt={img.ShortDescription} style={{width: '100%'}} />
                                    </a> 
                                ))}
                            </CardHeader>
                            <CardBody>                        
                                    <Row>
                                        <Col md="12">
                                            <strong className="text-vera cp">
                                                <button className="btn text-vera font-weight-bold p-0" onClick={() => setType('collapss1')}>
                                                    <u>Key Details</u>
                                                </button>                                    
                                            </strong>
                                        </Col>
                                    </Row>
                                    <div id="collapss1" className={type == 'collapss1' ? "collapse an show" : "collapse"}>
                                        <Row>
                                            <Col md="12"><hr /></Col>
                                            <Col md="4">
                                                <p><b>MLS ID:</b> {data.ListingId}</p>
                                                <p><b>Subtype:</b> {data.PropertySubType}</p>
                                            </Col>
                                            <Col md="4">
                                                <p><b>Area:</b> {data.LivingArea} Sqft.</p>
                                                <p><b>County:</b> {data.CountyOrParish}</p>
                                            </Col>
                                            <Col md="4">
                                                <p><b>Type:</b> {data.PropertyType}</p>
                                                <p><b>City:</b> {data.City}</p>
                                            </Col>
                                        </Row>                            
                                    </div>
                                </CardBody>

                            <CardFooter>
                                <Row>
                                    <Col md="12">
                                        <strong className="text-vera cp">
                                            <button className="btn text-vera font-weight-bold p-0" onClick={() => setType('collapss2')}>
                                                <u>General Information</u>
                                            </button>                                    
                                        </strong>
                                    </Col>
                                </Row>
                                <Collapse id="collapss2" className={type == 'collapss2' ? "collapse an show" : "collapse"}>
                                    <Row>
                                        <Col md="12"><hr /></Col>
                                        <Col md="6">
                                            <p><b>Address:</b> {Title}</p>
                                            <p><b>Full Baths:</b> {data.BathroomsFull}</p>  
                                            <p><b>Total Baths:</b> {data.BathroomsTotalInteger}</p>
                                            <p><b>Bedrooms:</b> {data.BedroomsTotal}</p>
                                        </Col>
                                        <Col md="6">
                                            {data.SubdivisionName == null ? '' : <p><b>Subdivision:</b> {data.SubdivisionName}</p>}
                                            <p><b>Unit #:</b> {data.UnitNumber}</p>                               
                                            <p><b>Parcel #:</b> {data.ParcelNumber}</p>
                                            <p><b>Status:</b> <span className="badge badge-success">{data.MlsStatus}</span></p>
                                        </Col>
                                    </Row>
                                </Collapse>
                            </CardFooter>

                            <CardFooter>
                                <Row>
                                    <Col md="12">
                                        <strong className="text-vera cp">
                                            <button className="btn text-vera font-weight-bold p-0" onClick={() => setType('collapss3')}>
                                                <u>Property Details</u>
                                            </button>
                                        </strong>
                                    </Col>
                                </Row>
                                <Collapse id="collapss3" className={type == 'collapss3' ? "collapse an show" : "collapse"}>
                                    <Row>                            
                                        <Col md="12"><hr /></Col>
                                        <Col md="6">
                                            {data.LotSizeArea == null ? '' : <p><b>Lot size:</b> {data.LotSizeArea} sq ft.</p>}
                                            <p><b>Year built:</b> {data.YearBuilt}</p>
                                            <p><b>Garage spaces:</b> {data.GarageSpaces}</p>
                                        </Col>
                                        <Col md="6">
                                            {data.StatusChangeTimestamp == null ? '' : <p><b>Status change date:</b> {data.StatusChangeTimestamp}</p>}
                                            <p><b>Last modified:</b> {data.ModificationTimestamp}</p>
                                            <p><b>Photos changed:</b> {data.PhotosChangeTimestamp}</p>
                                        </Col>
                                    </Row>                            
                                </Collapse>
                            </CardFooter>

                            <CardFooter>
                                <Row>
                                    <Col md="3">
                                        <strong className="text-vera">Listing Description</strong>
                                    </Col>  
                                    <Col md="9">
                                        <p>{data.PublicRemarks}</p>
                                        <p>{data.ListOfficeName}</p>
                                    </Col>                      
                                </Row>
                            </CardFooter>
                            <CardFooter>
                                <nav>
                                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0">
                                        <li>
                                            <a 
                                                onClick={() => window.history.back()} 
                                                className="btn btn-outline-dark pager-btn cp"
                                            >
                                                &#160;←&#160;back&#160;
                                            </a>
                                        </li>
                                        <li>
                                            <Link href="/dashboard/submitdeal">
                                                <a className="btn btn-primary pager-btn">&#160;+&#160;Create deal&#160;</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </CardFooter>
                        </Card>                         
                    </Col>
               
                </Row>
            }



            {/*
            <pre>
                {JSON.stringify(data, null, 4)}
            </pre>            
            */}

 

            <style global jsx>{`
                .type {
                    font-size: 18px;
                    position: absolute;
                    top: 0;
                    margin: 10px;
                    color: #fff;
                    padding: 4px 7px;
                    background: #00000094;
                    border-radius: 2px;
                    -webkit-border-radius: 2px;
                    -moz-border-radius: 2px;
                }
                .imagine {
                    font-size: 15px;
                    position: absolute;
                    bottom: 0;
                    color: #fff;
                    margin: 10px;
                    padding: 3px 12px;
                    border-radius: 2px;
                    -webkit-border-radius: 2px;
                    -moz-border-radius: 2px;
                    background: #425cbb !important;
                }

                .an {
                    transition-property: height, overflow;
                    transition-duration: 14s;
                    transition-delay: 10s;
                    height: auto;
                    overflow: none
                }
            `}</style>
        </AdminInterface>
    )
}