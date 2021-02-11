import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Alert, Col, Row } from 'reactstrap'
import { Default } from '../components/layout/Default'
import { AiOutlineCheckCircle } from 'react-icons/ai'
//import Fire from '../config/fire-config'

export default function Offer()
{

    const Title = 'You have successfully registered'
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(true)
    const onDismiss = () => setVisible(false)
    //const Ref = Fire.database().ref("users/3adfa52afb3f8cf2ccf6d95886b0") // yiyTCzpQlkbm2B2dddcAPfdxEMj2

    useEffect(() => {

        //Ref.remove() // Delete on link
        // status: "I'm online."
        //Ref.update({
        //    first_name: 'Marina',
        //    photo: 'https://randomuser.me/api/portraits/women/82.jpg'
        //})

        //const UUID = window.localStorage.getItem('uuid')
        //const users = async() => await Fire.database().ref('users')
        //    .once('value')
        //    .then(function(snapshot) {
        //        const name = snapshot.child(UUID).val()
        //        setUser(name)
        //    })
        //    users()

        if(window.sessionStorage.getItem('user') !== null) {
            setData(JSON.parse(window.sessionStorage.getItem("user")))
        }
    }, [])

    return (
        <Default title={Title}>
            <Row id="offer">
                <Col className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
                    <Alert color="success" isOpen={visible} toggle={onDismiss} className="mt-5 mb-5">
                        <AiOutlineCheckCircle />&#160; {Title}
                    </Alert>
                    <div></div>
                    <h2 className="mt-5 text-vera btn-block mb-3">
                        Welcome to "Vera Office"
                    </h2>
                    <strong>Hello, {data ? data.first_name + ' ' + data.last_name : '...'}</strong>
                    <p>We Are your send message to email: <u className="text-vera">{data ? data.email : ''}</u></p>
                    <p>Please activate your account during this day. Empty accounts are deleted automatically.</p>

                    <Link href="/">
                        <a className="btn btn-outline-success btn-sm">&#160;Login&#160;</a>
                    </Link>
                </Col>
            </Row>
        </Default>
    )
}