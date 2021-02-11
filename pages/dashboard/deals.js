import React, { useState } from 'react'
import Link from 'next/link'
import ListDeals from '../../components/ListDeals'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { Card, CardHeader, CardBody, CardFooter, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { AiOutlineFileProtect } from 'react-icons/ai'
import { DealsTable } from '../../components/material/DealsTable'


export default function Deals()
{

    const Title = 'My Deals'

    const data = ListDeals()
    const [count, setCount] = useState(10)    
    const [types, setTypes] = useState('deals');
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    function handlerCount(e)
    {
        setCount(e.target.value)
    }

    function classnames(classes)
    {
        return activeTab == classes ? 'cp active ml-2 btn-sm' : 'cp bg-light ml-2 btn-sm'
    }


    return (
        <AdminInterface title={Title}>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">
                        <AiOutlineFileProtect className="text-vera" /> {Title}
                    </h1>
                </div>
                <div>
                    <Link href="/dashboard/submitdeal">
                        <a className="btn btn-primary">&#160; + Add Deal &#160;</a>
                    </Link>
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

            <Card style={{marginBottom: '100px'}}>
                <CardHeader className="d-flex align-items-center">
                    <h2 className="h3 card-header-title js-loon">
                        <Nav pills>
                            <li className="nav-item">
                                <span className="nav-link">Filter:</span>
                            </li>                            
                            <NavItem>
                                <NavLink
                                    className={classnames(1)}
                                    onClick={() => { 
                                        toggle('1') 
                                        setTypes('deals')
                                    }}
                                >
                                    Active
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(2)}
                                    onClick={() => { 
                                        toggle('2') 
                                        setTypes('archive')
                                    }}
                                >
                                    Archive
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </h2>
                    <ul className="list-inline ml-auto mb-0">                       
                        <li className="list-inline-item">
                            <input 
                                type="number" 
                                min="10" 
                                defaultValue={count} 
                                onChange={handlerCount}
                                style={{
                                    width: '59px', 
                                    border: '1px solid #ddd'
                                }} 
                            />
                        </li>
                    </ul>
                </CardHeader>

                <CardBody className="pt-0 pb-0">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <DealsTable data={data} type='deals' />
                        </TabPane>
                        <TabPane tabId="2">
                            <DealsTable data={data} type='archive' />
                        </TabPane>
                    </TabContent>
                </CardBody>
                <CardFooter>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-sm">
                            <nav aria-label="Bootstrap Pagination Example">
                                <ul className="pagination mb-0">
                                    <li className="page-item">
                                        <a className="page-link" href="#">←</a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">4</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">→</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-sm text-sm-right mt-3 mt-sm-0">
                            <span className="u-font-size-90 text-muted">Page 2 of 5</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <style jsx>{`
                .actions {
                    opacity:0.5;
                    transition: opacity 1s;
                }
                tr:hover .actions {
                    opacity: 1;
                }
            `}</style>
        </AdminInterface>
    )
}