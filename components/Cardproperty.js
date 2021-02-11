import Link from 'next/link'
import { FaBath, FaBed, FaCropAlt, FaMapMarkerAlt, FaPhotoVideo } from 'react-icons/fa'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap'

export default function Cardproperty(props)
{

    function noData(e) {
        return e == '' || e == '0' || e == null ? 'no data' : e
    }
        

    return (
        <Card>
            <CardHeader className="p-0" className="real-pos-box">
                <span className="type">{props.params.PropertyType}</span>
                <span className="photos_count"><FaPhotoVideo />&#160;{props.params.PhotosCount}</span>
                <span className="price">
                    ${props.params.ListPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {props.params.PropertyType == 'For Rent' ? '/mo' : ''}
                </span>
                <Link href="/dashboard/realestate/[obj]" as={`/dashboard/realestate/${props.params.ListingKey}`}>
                    <a>
                        <div style={{
                            background: `url(${props.params.Media[0].MediaURL}) no-repeat`,
                            width: '100%',
                            height: '250px',
                            backgroundPosition: 'center',
                            backgroundSize: '170%',
                            borderRadius: '5px 5px 0px 0px'
                        }}></div>
                    </a>
                </Link>
            </CardHeader>
            <CardBody>
                <h5 className="js-loon">
                    {props.params.City + ' ' +props.params.StateOrProvince}
                    &nbsp;&middot;&nbsp;
                    {props.params.CountyOrParish}
                </h5>
                <small className="custom_header_object text-muted">
                    <FaMapMarkerAlt /> {props.params.UnparsedAddress}
                </small>
            </CardBody>
            <CardFooter>
                <div className="d-flex justify-content-between">
                    <div><FaCropAlt />&#160;<span className="text-muted">&#160;{noData(props.params.LivingArea)}&#160;sqft&#160;</span></div>
                    <div><FaBed />&#160;<span className="text-muted">&#160;{noData(props.params.BedroomsTotal)}</span></div>
                    <div><FaBath />&#160;<span className="text-muted">&#160;{noData(props.params.BathroomsTotalDecimal)}</span></div>
                </div>
            </CardFooter>
            <style jsx>{`
                .type {
                    font-size: 11px;
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
                .photos_count {
                    font-size: 11px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin: 10px;
                    color: #fff;
                    padding: 4px 7px;
                    background: #00000094;
                    border-radius: 2px;
                    -webkit-border-radius: 2px;
                    -moz-border-radius: 2px;
                }
                .price {
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
            `}</style>
        </Card>
    )
}