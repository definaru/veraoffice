import { useState } from 'react'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { GetUserDataAPI } from '../../components/GetUserDataAPI'
import { LoadTableRow } from '../../components/helper/LoadTableRow'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { Card, Col, Row, Table } from 'reactstrap'
import { FaList, FaTh, FaUsers } from 'react-icons/fa'
import { GetTableRow } from '../../components/helper/GetTableRow'
import { GetCardPanel } from '../../components/helper/GetCardPanel'
import { LoadCardPanel } from '../../components/helper/LoadCardPanel'


export default function Users()
{

    const Title = 'A list of users'
    const API = GetUserDataAPI()
    const [column, setColumn] = useState('list')
    

    return (
        <AdminInterface title={Title}>
            <Row>
                <Col md="6">
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">
                        <FaUsers className="text-vera" /> {Title}
                    </h1>
                </Col>
                <Col md="6" className="text-lg-right text-md-right text-center">
                    {
                        API ? 
                        <><b>{Object.keys(API).length}</b> Peoples</> : 
                        <Skeleton variant="text" width={40} height={15} />
                    }
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <ol className="breadcrumb bg-transparent small p-0">
                        <li className="breadcrumb-item">
                            <Link href="/dashboard">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/dashboard/admin">
                                <a>Admin Panel</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{Title}</li>
                    </ol>                    
                </Col>
                <Col md="6" className="text-lg-right text-md-right text-center mb-3">
                    
                    <div className="btn-group">
                        <button className="btn btn-sm btn-default">{column}</button>
                        <button 
                            className={
                                column === 'list' ? 
                                    "btn btn-sm btn-default bg-white border" : 
                                    "btn btn-sm btn-default"
                            } 
                            onClick={() => setColumn('list')}
                        >
                            <FaList />
                        </button>
                        <button 
                            className={
                                column === 'grid' ? 
                                    "btn btn-sm btn-default bg-white border" : 
                                    "btn btn-sm btn-default"
                            } 
                            onClick={() => setColumn('grid')}
                        >
                            <FaTh />
                        </button>
                    </div>
                </Col>
            </Row>
            {
                column === 'list' ?
                <>
                    {
                        API ?
                            <GetTableRow data={API} /> :
                            <Card>
                                <Table className="m-0">
                                    <tbody>
                                        <LoadTableRow />
                                        <LoadTableRow />
                                        <LoadTableRow />                                     
                                    </tbody>
                                </Table>
                            </Card>                             
                   
                    }
                </> :
                <>
                    {
                        API ?
                            <GetCardPanel data={API} /> :
                            <Row>
                                <LoadCardPanel />
                                <LoadCardPanel />
                                <LoadCardPanel />
                            </Row>                   
                    }
                </>
            }
                
            <pre>
                {/*JSON.stringify(apis, null, 2)*/}
            </pre> 
        </AdminInterface>
    )
}