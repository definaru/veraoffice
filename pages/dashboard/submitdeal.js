import React, { useState, useEffect, useRef } from 'react'
import { AdminInterface } from '../../components/layout/AdminInterface'
import Link from 'next/link'
import { Card, CardHeader, CardText, CardBody, Row, Col, FormGroup, Label, Input, Media, Modal, ModalHeader, ModalBody, Button, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap'
import { FaTelegramPlane } from 'react-icons/fa'
import Dealfile from '../../components/material/Dealfile'
import DatePicker from 'react-datepicker'
import { AiOutlineCalendar, AiOutlineCloudDownload } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import User from '../../components/User'



export default function Submitdeal()
{

    const Title = 'Submit deal / New listing'
    const user = User()
    const [email, setEmail] = useState('')
    const result = user.filter(p => p.email.includes(email))
    const auth = result.map(u => u.first_name + ' ' + u.last_name)
    const start = 10
    const [price, setPrice] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [step, setStep] = useState(1)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all"
    })


    const onSubmit = formData => {
        console.log(formData)
        //alert(JSON.stringify(formData))
    }

    useEffect(() => {
        setEmail(window.sessionStorage.getItem('access'))
        setPrice(price)
    }, [price, email])

    function prev()
    {
        step !== 1 ? setStep(step-1) : 1
    }

    function next()
    {
        step !== start ? setStep(step+1) : start
    }

    function card(s)
    {
        return s === step ? "" : "d-none"
    }

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

                <CardHeader className={card(1)}>
                    <CardText tag="h2" className="js-loon text-vera pt-5 pb-4">
                        Submit Deal
                    </CardText>
                    <CardText tag="p">
                        Hello {auth}, please fill out and submit this form.
                    </CardText>
                    <CardText tag="span" className="text-muted">
                        {start} Questions
                    </CardText>
                </CardHeader>
                
                <form onSubmit={handleSubmit(onSubmit)}>

                    <CardHeader className={card(2)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                            Choose type of contract
                        </CardText>
                        <Row>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio1" ref={register} />&#160;
                                    Listing contract
                                </Label>
                            </Col>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio1" ref={register} />&#160;
                                    Purchase Offer
                                </Label>
                            </Col>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio1" ref={register} />&#160;
                                    Lease Offer
                                </Label>
                            </Col>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio1" ref={register} />&#160;
                                    Executed contract
                                </Label>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardHeader className={card(3)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                            Transaction Type
                        </CardText>
                        <Row>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio2" ref={register} />&#160;
                                    Sale
                                </Label>
                            </Col>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio2" ref={register} />&#160;
                                    Rental
                                </Label>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardHeader className={card(4)}>
                        <CardText tag="h4" className="js-loon text-dark pt-2 pb-4 error_star">
                            Did you upload any documents before for the same deal ? 
                        </CardText>
                        <Row>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio3" ref={register} />&#160;
                                    No
                                </Label>
                            </Col>
                            <Col sm="6">
                                <Label className="bg-light p-3 btn btn-block mb-4" check>
                                    <Input type="radio" name="radio3" ref={register} />&#160;
                                    Yes
                                </Label>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardHeader className={card(5)}>
                        <div className="d-flex justify-content-between">
                            <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                                Sale price
                            </CardText>     
                            <Media tag="h3">
                                {price == '' ? '' : '$ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Media>                       
                        </div>

                        <FormGroup>
                            <input
                                className={errors.prices ? "is-invalid form-control" : "form-control"}
                                ref={register({required: true, maxLength: 20 })}
                                type="number" 
                                min="0" 
                                name="prices" 
                                value={price || ''} 
                                placeholder="ex: 23" 
                                onChange={(e)=> setPrice(e.target.value)}
                            />
                            { errors.prices &&
                                <>
                                    { errors.prices?.type === "required" && <FormFeedback>Title is required</FormFeedback> }
                                    { errors.prices?.type === "maxLength" && <FormFeedback>Max length of title is 20 characters!</FormFeedback> }
                                </>
                            }
                        </FormGroup>
                    </CardHeader>

                    <CardHeader className={card(6)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                            Closing Date
                        </CardText>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{marginRight: '-3px',zIndex: 2}}>
                                <InputGroupText className="bg-white" style={{borderRight: 0}}>
                                    <AiOutlineCalendar />
                                </InputGroupText>
                            </InputGroupAddon>
                            <DatePicker
                                ref={register} 
                                selected={startDate}
                                className="form-control controlThis"
                                onChange={date => setStartDate(date)}
                                minDate={new Date()}
                                isClearable
                                dateFormat="MMMM d, yyyy"
                                showMonthDropdown
                                showDisabledMonthNavigation
                                placeholderText="Date Picker Here"
                            />
                        </InputGroup>

                    </CardHeader>

                    <CardHeader className={card(7)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                            Property Address
                        </CardText>
                        <FormGroup>
                            <Input type="text" name="addr_line1" ref={register}  placeholder="Street Address" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="addr_line2" ref={register}  placeholder="Street Address Line 2" />
                        </FormGroup>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Input type="text" name="city" ref={register}  placeholder="City" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="postal" ref={register}  placeholder="Postal / Zip Code" />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Input type="text" name="state" ref={register}  placeholder="State / Province" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardHeader className={card(8)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                            Tenant / Buyer Name
                        </CardText>
                        <FormGroup>
                            <Input type="text" name="tenant" ref={register}  />
                        </FormGroup>
                    </CardHeader>

                    <CardHeader className={card(9)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4 error_star">
                            Landlord / Seller Name
                        </CardText>
                        <FormGroup>
                            <Input type="text" name="seller" ref={register}  />
                        </FormGroup>
                    </CardHeader>

                    <CardHeader className={card(10)}>
                        <CardText tag="h2" className="js-loon text-vera pt-2 pb-4">
                            Upload all necessary documents
                        </CardText>
                        <CardText tag="p">
                            Please click to the link to see all the require packages:&#160;
                            <u className="cp" onClick={toggle}>view more</u>
                        </CardText>

                        <Label className="drop_n_drops">
                            <Media>
                                <Media left>
                                    <AiOutlineCloudDownload className="mr-3" style={{fontSize: '80px'}} />
                                </Media>
                                <Media body>
                                    <FormGroup>
                                        <strong className="font-weight-bold btn-block mt-3">Drag and drop files here</strong>
                                        <p>Max. file size: 29.5MB</p>
                                        <Input type="file"  style={{display: 'none'}} name="file" ref={register}  />
                                    </FormGroup>                                
                                </Media>
                            </Media>
                        </Label>

                    </CardHeader>
                
                    <CardBody>
                        <nav>
                            <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0">
                                <li>
                                    <div onClick={prev} className={step > 1 ? "btn btn-primary pager-btn" : "btn btn-primary pager-btn disabled"}>
                                        <span className="mr-1">←</span> Previous
                                    </div>
                                </li>
                                <li>
                                    <span className="text-muted">
                                        <span className="d-none d-sm-inline-block">Page</span> 
                                        &#160;{step} of {start}
                                    </span>
                                </li>
                                <li>
                                    {step !== start ? <>
                                        <div onClick={next} className="btn btn-primary pager-btn">
                                            Next <span className="ml-1">→</span>
                                        </div>
                                    </> : <>
                                        <Button type="submit" color="success"> 
                                            &#160; <FaTelegramPlane /> Submit &#160; 
                                        </Button>
                                    </>
                                    }
                                </li>
                            </ul>
                        </nav>
                    </CardBody>
                </form>

            </Card>
            <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                <ModalHeader toggle={toggle}>Require packages</ModalHeader>
                <ModalBody className="p-0">
                    <Dealfile />
                </ModalBody>
            </Modal>
        </AdminInterface>
    )
}