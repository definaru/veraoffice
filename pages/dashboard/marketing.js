import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineLineChart, AiOutlinePrinter } from 'react-icons/ai'
import { Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row } from 'reactstrap'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { BusinessCardBack } from '../../components/marketing/BusinessCardBack'
import { BusinessCardFront } from '../../components/marketing/BusinessCardFront'
import Skeleton from 'react-loading-skeleton'
import Account from '../../components/context/UserAccount'


export default function Marketing()
{
    const Title = 'Marketing'
    const info = Account()
    const login = info.user.login ? info.user.login : ''
    const [theme, setTheme] = useState('')


    function selectChange(e)
    {
        setTheme(e.target.value)
    }

    return (
        <AdminInterface title={Title}>

            <h1 className="h2 font-weight-semibold mb-4 js-loon d-print-none">
                <AiOutlineLineChart className="text-vera" /> {Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0 d-print-none">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>

            <Card>
                <CardHeader className="d-print-none">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="m-0">
                                Create Business Card
                            </h3>                            
                        </div>
                        <div>
                            <h3 className="m-0">
                                <small className="text-vera" style={{textTransform: 'capitalize'}}>
                                    {theme}
                                </small>
                            </h3>
                        </div>
                    </div>

                </CardHeader>
                <CardBody className="d-print-none">
                    <FormGroup>
                        {
                            login ?
                            <select 
                                className="form-control" 
                                name={theme}
                                defaultValue="Select a theme"
                                onChange={selectChange}
                            >
                                <option disabled>Select a theme</option> 
                                <option value="standart">Standart theme</option>
                                <option value="personal">Personal theme</option>
                                <option value="dark">Dark theme</option>
                            </select> : 
                            <Skeleton variant="text" height={30} />                         
                        }

                    </FormGroup>
                </CardBody>
                {
                    theme.length ? 
                    <>
                        <CardHeader>
                            <Row>
                                <Col md="6">
                                    <BusinessCardFront data={login} theme={theme} />  
                                    <div className="d-none d-print-block">
                                        <BusinessCardFront data={login} theme={theme} />
                                        <BusinessCardFront data={login} theme={theme} />
                                        <BusinessCardFront data={login} theme={theme} />
                                    </div>                     
                                </Col>
                                <Col md="6">
                                    <BusinessCardBack theme={theme} />
                                    <div className="d-none d-print-block">
                                        <BusinessCardBack theme={theme} /> 
                                        <BusinessCardBack theme={theme} /> 
                                        <BusinessCardBack theme={theme} /> 
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p className="m-0">
                                        <sup className="text-danger">*</sup><b>C:</b> This is your personal phone number, it changes in your 
                                        &#160;<Link href="/dashboard/profile"><a><u>personal account</u></a></Link>.
                                    </p>
                                </Col>
                            </Row>
                        </CardHeader>    
                        <CardFooter className="d-print-none border-top-0">
                            <button onClick={() => window.print()} className="btn btn-primary">
                                &#160;&#160; <AiOutlinePrinter /> PRINT &#160;&#160;
                            </button>
                        </CardFooter>                                         
                    </> : ''
                }
            </Card>
            {/*
            <pre>
                {JSON.stringify(login, null, 2)}
            </pre>            
            */}
            
        </AdminInterface>
    )
}