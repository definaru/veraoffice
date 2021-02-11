import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Alert, Col, Media, Row } from 'reactstrap'
import { Default } from '../components/layout/Default'
import { FaRegCheckCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function Login()
{
    const router = useRouter()
    const { token } = router.query
    const { cartId } = router.query
    const [login, setLogin] = useState(null)
    const [emailEncoded, setEmailEncoded] = useState('')
    const [emailDecoded, setEmailDecoded] = useState(null)
    const Title = token ? 'Account activation' : 'You are logged out'

    useEffect(() => {
        const MyAccount = token ? token : ''
        setEmailEncoded(window.btoa('nick@verarealty.com'))
        setEmailDecoded(window.atob(MyAccount))
        if(window.sessionStorage.getItem('access') !== null) {
            setLogin(window.sessionStorage.getItem('access'))
        }
    }, [login])

    return ( // Cart Id: {cartId}
        <Default title={Title}>
            <Row>
                <Col className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
                    <h3 className="text-center mt-5 pt-5 mb-4">
                        <Link href="/">
                            <a>
                                <img 
                                    src="/img/logo.png" 
                                    className="d-flex justify-content-center mb-3" 
                                    style={{width: '200px', margin: 'auto'}} 
                                />                  
                            </a>
                        </Link>
                        {Title}
                    </h3>
                    {
                        token ? 
                            <Alert color="success">
                                <Media>
                                    <Media left className="mr-3">
                                        <FaRegCheckCircle style={{fontSize: '67px', opacity: '0.4'}} />
                                    </Media>
                                    <Media body>
                                        <strong className="text-white mt-2 btn-block">Successfully!</strong>
                                        <p className="text-light m-0">
                                            Your account {emailDecoded} has been successfully activated!
                                        </p>
                                    </Media>
                                </Media>
                            </Alert> :                        
                            <Alert color="info">
                                <Media>
                                    <Media left className="mr-3">
                                        <FaRegCheckCircle style={{fontSize: '67px', opacity: '0.4'}} />
                                    </Media>
                                    <Media body>
                                        <strong className="text-white mt-2 btn-block">Exit successful</strong>
                                        <p className="text-light m-0">
                                            Click here to &#160;
                                            <Link href="/">
                                                <a><u className="text-light">login</u></a>
                                            </Link>
                                        </p>
                                    </Media>
                                </Media>
                            </Alert>                        
                    }

                </Col>
            </Row>
        </Default>
    )
}