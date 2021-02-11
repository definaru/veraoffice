import Link from 'next/link'
import { AdminInterface } from '../../components/layout/AdminInterface'
import VideoList from '../../components/VideoList'
import { Card, CardBody, Col, Row, CardFooter, CardHeader } from 'reactstrap'
import { AiOutlineYoutube, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai'
import { FaFilm } from 'react-icons/fa'

export default function Education()
{

    const Title = 'Education'
    const videoList = VideoList()


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
            { videoList.map( v  => (
                <Col md="4" key={v.id}>
                    <Card className="mb-5 shadow-sm">
                        <CardHeader className="p-0 bg-light">
                            <Link href="/dashboard/education/[link]" as={`/dashboard/education/${v.link}`}>
                                <a className="d-flex justify-content-center youtube">
                                    <div className="play">
                                        <AiOutlineYoutube />
                                    </div>
                                </a>
                            </Link>    
                            <div className="you_tube_screen text-center">
                                <img src="/img/Logo-blue.png" className="pt-5" style={{width: '50%'}} alt={v.text} />
                                <h5>{Title}</h5>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <strong><FaFilm className="text-vera" />&#160; {v.text}</strong>
                        </CardBody>
                        <CardFooter className="d-flex justify-content-between">
                            <a className="btn">
                                <AiFillStar className="text-warning" />
                                <AiFillStar className="text-warning" />
                                <AiFillStar className="text-warning" />
                                <AiFillStar className="text-warning" />
                                <AiFillStar className="text-warning" />
                            </a>   
                            <Link href="/dashboard/education/[link]" as={`/dashboard/education/${v.link}`}>
                                <a className="btn btn-primary"> 
                                    &#160;<AiOutlineArrowRight /> Cast a look &#160; 
                                </a>
                            </Link>                                                                                
                        </CardFooter>
                    </Card>
                </Col>
            ))}
            </Row>            
            <style jsx>{`
                .youtube {
                    position: absolute;
                    z-index: 10;
                    width: 100%;
                    height: 54%;
                    background: rgb(202 201 201 / 26%);
                }
                .youtube:hover {
                    background: rgb(0 0 0 / 66%);
                }
                .youtube .play {color: #4054b2;}
                .youtube:hover .play{
                    color: #fb4143;
                }
                .play {
                    position: absolute;
                    font-size:80px;
                    padding-top: 33px;
                }
                .you_tube_screen {
                    width:100%;
                    height:200px;
                    opacity:0.5;
                }
                .you_tube_screen h5 {
                    margin-top: 37px;
                    font-size: 15px;
                    margin-left: 17px;
                    -webkit-letter-spacing: 15px;
                    -moz-letter-spacing: 15px;
                    -ms-letter-spacing: 15px;
                    letter-spacing: 8px;
                    color: #455694;
                }
            `}</style>
        </AdminInterface>
    )
}