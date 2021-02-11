import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { AiOutlineBank } from 'react-icons/ai'
import { Col, FormFeedback, FormGroup, Input, Row, Toast, ToastBody, ToastHeader } from 'reactstrap'
import Cardproperty from '../../components/Cardproperty'
import { AdminInterface } from '../../components/layout/AdminInterface'
import Loading from '../../components/Loading'


export default function Property({ stars, totals }) 
{

    const Title = 'List of properties'

    //const [limit, setLimit] = useState(6)
    const [obj, setObj] = useState([])
    const [total, setTotal] = useState('')
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(true)
    const toggle = () => setShow(false)


    //function limitChange(e)
    //{
    //    setLimit(e.target.value)
    //}

    useEffect(() => {
        try {
            setObj(stars)
            setTotal(totals)
            setLoading(false)
        } catch (e) {
            console.error(e)
        }
        //const fetchData = async () => {
        //    const token = process.env.TOKEN
        //    const result = await fetch(`https://rets.io/api/v2/miamire/listings?access_token=${token}&limit=100`)
        //    const res = await result.json()
        //    setTotal(res.total);
        //}
        //fetchData()
        //setTotal(stars.total)
    }, [obj, loading, total])

    // bundle
    return (
        <AdminInterface title={Title}>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">
                        <AiOutlineBank className="text-vera" />&#160;
                        {Title}
                    </h1>
                </div>
                <div>
                    <strong>Total objects:&#160; 
                    {total == '' ? 
                        <Loading /> :
                        totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }   
                    </strong>
                </div>
            </div>

            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <FormGroup>
                <Input type="text" name="object" id="search" placeholder="Enter the address of the object..." />
                <FormFeedback>Search form doesn't work</FormFeedback>
            </FormGroup>
            
            
            <Row>
                {obj ? stars.map(post => (
                <Col md="4" className="mb-4" key={post.ListingKey}>
                    <Cardproperty params={post} />
                </Col>
                )) : <Loading classes="text-dark" />}  

            </Row> 
           
            {/*
            <input type="number" min="1" value={limit} onChange={limitChange} />
           <pre>
               {JSON.stringify(totals, null, 2)}
           </pre>             
            */}
            {
                obj.name == 'RateLimitError' ?
                <Toast className="rounded pos-right-bottom" isOpen={show} onClick={() => setShow(false)}>
                    <ToastHeader className="bg-danger border-0" toggle={toggle}>
                        <strong className="font-weight-bold text-white">
                            Error
                        </strong>
                    </ToastHeader>
                    <ToastBody className="bg-danger text-light rounded-bottom pt-0">
                        {obj.message}
                    </ToastBody>
                </Toast> : ''           
            }
        </AdminInterface>
    )
}

Property.getInitialProps = async (ctx) => {
    const token = process.env.TOKEN
    const limit = 100
    const res = await fetch(`https://rets.io/api/v2/miamire/listings?access_token=${token}&limit=${limit}`)
    const json = await res.json()
    return { stars: json.bundle, totals: json.total }
}