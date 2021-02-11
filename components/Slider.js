import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav'
import Activities from './header/Activities'
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa'
import { Col, Button, Form, Input, Row } from 'reactstrap'
import Userboard from './header/Userboard'
import Content from './layout/Content'


export default function Slider(props) 
{

    const [state, setState] = useState(true)
    const isToggleOn = () => setState(prevState => !prevState)
    const [scrollposition, setScrollposition] = useState(0)

    useEffect(() => {
        const Scroll = () => setScrollposition(window.scrollY)
        window.addEventListener('scroll', Scroll, false)
        if(scrollposition == 0) {
            window.removeEventListener('scroll', Scroll, true)
        }
    }, [scrollposition])

    useEffect(() => {
        const bodyClass = state ? 'desktop-mode' : 'desktop-mode side-nav-on-action'
        const asideClass = state ? 'u-sidebar d-print-none' : 'u-sidebar d-print-none toggled action mini'
        document.querySelector("body").className = bodyClass
        document.querySelector("#sidebar").className = asideClass
    }, [state])


    return (
        <>
        <header className={scrollposition >= 60 ? "to-fix-header u-header d-print-none" : "u-header d-print-none"}>
            <div className="u-header-left">
                <Link href="/dashboard">
                    <a className="u-header-logo">
                        <img className="u-logo-desktop" src="/img/logo.png" width="160" alt="Vera Office" />
                        <img className="img-fluid u-logo-mobile" src="/img/logo-mobile.png" width="50" alt="Vera Office" />
                    </a>                        
                </Link>
            </div>
            <Col tag="div" className="u-header-middle">
                <a 
                    onClick={isToggleOn}                
                    className="js-sidebar-invoker u-sidebar-invoker cp"
                    data-is-close-all-except-this="true"
                    data-target="#sidebar"
                >
                    <FaBars className="u-sidebar-invoker__icon--open" /> 
                    <FaTimes className="u-sidebar-invoker__icon--close" />
                </a>
                <Col tag="div" className="u-header-search"
                    data-search-mobile-invoker="#headerSearchMobileInvoker"
                    data-search-target="#headerSearch"
                >
                    {/*
                        <a 
                            id="headerSearchMobileInvoker" 
                            className="btn btn-link input-group-prepend u-header-search__mobile-invoker cp"
                        >
                            <FaSearch /> 
                        </a>                    
                    */}
                    <Col tag="div" id="headerSearch" className="u-header-search-form">
                        <Form>
                            <Col tag="div" className="input-group">
                                <Button className="btn-link input-group-prepend u-header-search__btn" type="submit">
                                    <FaSearch />
                                </Button>
                                <Input type="search" className="form-control u-header-search__field" placeholder="Type to search..." />
                            </Col>
                        </Form>
                    </Col>
                </Col>
            </Col>
            <div className="u-header-right d-print-none">
                <Activities access={props.access} login={props.login} />
                <Userboard  access={props.access} login={props.login} />
            </div>
        </header>
        <main className="u-main" role="main">
            <aside 
                id="sidebar"
                className="u-sidebar d-print-none"
            >
                <div className="u-sidebar-inner">
                    <header className="u-sidebar-header">
                        <a className="u-sidebar-logo" href="/dashboard">
                            <img className="img-fluid" src="/img/logo.png" width="124" />
                        </a>
                    </header>
                    <Nav links={props.link}/>
                </div>
            </aside>
            <Content content={props.content} />
        </main>
      </>
    )
}