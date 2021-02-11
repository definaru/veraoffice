import React from 'react'
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper'
import { Input, FormGroup, Label, CustomInput, Row, Col } from 'reactstrap'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { FaTelegramPlane } from 'react-icons/fa'
Swiper.use([Navigation, Pagination, Scrollbar])

export default class FormTest extends React.Component 
{

    constructor(props) 
    {
        super(props)
        this.state = ''
        //this.handleClick = this.handleClick.bind(this)
    }
    

    componentDidMount() {
        this.mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            scrollbar: {
                draggable: false,
                snapOnRelease: false
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            hashNavigation: {
                replaceState: true,
            },
            observer: false,
            observeParents: false
        });
    }
    

    // ref={div => this.carouselRef = div}

    render() {
        return (
            <>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide" data-hash="slide1">
                        <FormGroup style={{width: '60%', textAlign: 'left'}}>
                            <Label>deposit</Label>
                            <Input type="number" name="deposit" placeholder="deposit value" />
                        </FormGroup>
                    </div>
                    <div className="swiper-slide" data-hash="slide2">
                        <FormGroup style={{width: '60%', textAlign: 'left'}}>
                            <Label for="exampleSelect">Select</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value="Generate your own personal">Generate your own personal</option>
                                <option value="Use pregenerated randomization">Use pregenerated randomization</option>
                                <option value="On a nicely formatted web page">On a nicely formatted web page</option>
                                <option value="As a bare-bones text document">As a bare-bones text document</option>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className="swiper-slide" data-hash="slide3">
                    <FormGroup style={{width: '60%', textAlign: 'left'}}>
                        <Label>Radios</Label>
                        <Row>
                            <Col md="6">
                                <CustomInput type="radio" id="radio1" name="customRadio" label="Select this custom radio" />
                            </Col>
                            <Col md="6">
                                <CustomInput type="radio" id="radio2" name="customRadio" label="Or this one" />
                            </Col>
                        </Row>
                    </FormGroup>
                    </div>
                    <div className="swiper-slide" data-hash="slide4">
                    <FormGroup style={{width: '60%', textAlign: 'left'}}>
                        <Label>Information</Label>
                        <Input type="text" name="info" placeholder="new value" />
                        <div className="d-flex flex-row-reverse mt-4">
                            <button className="btn btn-lg btn-primary"><FaTelegramPlane /> Submit Data</button>
                        </div>
                    </FormGroup>
                    </div>
                </div>
                <hr style={{ marginTop: '-66px', zIndex: '10', position: 'relative' }} />
                <div className="nav_s">
                    <div className="swiper-button-prev">
                        <button className="btn btn-outline-dark btn-block"><AiOutlineArrowLeft /> Prev</button>
                    </div>
                    <div className="swiper-button-next">
                        <button className="btn btn-outline-dark btn-block">Next <AiOutlineArrowRight /></button>
                    </div>                    
                </div>
            </div>
            <style global jsx>{`
                .swiper-container {
                    height: 350px;
                    width: 100%;
                }
                .swiper-button-next, .swiper-button-prev {
                    color: transparent;
                    width: 50%;
                }
                .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
                    opacity: 0;
                    cursor: auto;
                    pointer-events: none;
                }
                .swiper-slide {
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    background: #fff;
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
                    justify-content: center !important;
                }	
                .nav_s {
                    display: block;
                    width: 100%;
                    position: absolute;
                    bottom: 33px;
                }	    
            `}</style>
            </>
        )
    }
}