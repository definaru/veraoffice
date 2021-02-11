import React from 'react'
import Head from 'next/head'
import Slider from '../../components/Slider'
import { useRouter } from 'next/router'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Context } from '../context/Context'
import Account from '../context/UserAccount'
import Fire from '../../config/fire-config'


// макет страницы панели управления
export function AdminInterface({ children, title = 'Admin DachBoard' })
{

    const router = useRouter()
    const info = Account()

    Fire.auth().onAuthStateChanged(function(user) {
        if(user === null) {
            return router.push('/login')
        } 
    })
        
        //return ( 
        //    <Default title='You are logged out'>
        //        <Row>
        //            <Col className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
        //                <h3 className="text-center mt-5 pt-5 mb-4">
        //                    <Link href="/">
        //                        <a>
        //                            <img 
        //                                src="/img/logo.png" 
        //                                className="d-flex justify-content-center mb-3" 
        //                                style={{width: '200px', margin: 'auto'}} 
        //                            />                  
        //                       </a>
        //                    </Link>
        //                    You are logged out
        //                </h3>
        //            </Col>
        //        </Row>
        //    </Default>  
        //)          
    return (
        <Context.Provider value={{info}}>
            <SkeletonTheme color="#ddd" highlightColor="#fff">
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="keywords" content="Dashboard, Brocker, Real Estate" />
                    <meta name="description" content="Dashboard UI for bizeness" />
                    <meta name="author" content="Defina LLC" />
                </Head>
                <Slider link={router.pathname} content={children}/>
                {/* login={previousUser} access={login} */}
            </SkeletonTheme>
        </Context.Provider>
    )
}