import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap'
import { FaBath, FaBed, FaCropAlt, FaMapMarkerAlt } from 'react-icons/fa'
import Estate from './Estate'


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default function Realestate()
{

    const Onslide = Estate()
    
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={20}
            navigation={{
                clickable: false
            }}
            pagination={{ 
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }}
            breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10
                },
                380: {
                  slidesPerView: 1,
                  spaceBetween: 10
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 2
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 3  
                },
                1366: {
                  slidesPerView: 3,
                  spaceBetween: 20
                }
            }}
            //scrollbar={{ draggable: false }}
            //onSwiper={(swiper) => console.log(swiper)}
            //onSlideChange={() => console.log('slide change')}
        >
            {Onslide.map(r => (
            <SwiperSlide key={r.id}>
                <Card>
                    <CardHeader className="p-0" className="real-pos-box">
                        <span className="type">{r.type}</span>
                        <span className="price">
                            ${r.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            {r.type == 'For Rent' ? '/mo' : ''}
                        </span>
                        <Link href="/dashboard/realestate/[obj]" as={`/dashboard/realestate/${r.obj}`}>
                            <a>
                                <img src={r.image} alt={r.header} className="real-img" />
                            </a>
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <h5 className="js-loon">{r.header}</h5>
                        <small className="text-muted">
                            <FaMapMarkerAlt /> {r.adress}
                        </small>
                    </CardBody>
                    <CardFooter>
                        <div className="d-flex justify-content-between">
                            <div><FaCropAlt />&#160;<span className="text-muted">&#160;{r.area}&#160;sqft&#160;</span></div>
                            <div><FaBed />&#160;<span className="text-muted">&#160;{r.beds}</span></div>
                            <div><FaBath />&#160;<span className="text-muted">&#160;{r.baht}</span></div>
                        </div>
                    </CardFooter>
                </Card>
            </SwiperSlide>
            ))}
            <style global jsx>{`
                .swiper-container {
                    width: 100%;
                    height: 500px;
                }
                .swiper-slide {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    -webkit-justify-content: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    -webkit-align-items: center;
                    align-items: center;
                }
                .type {
                    font-size: 10px;
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
                .swiper-button-next, .swiper-button-prev {color: transparent !important;}
            `}</style>
        </Swiper>
    )  
}