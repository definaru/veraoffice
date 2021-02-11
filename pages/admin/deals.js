import React from 'react'
//import { useRouter } from 'next/router'
import Link from 'next/link'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { AiOutlineReconciliation } from 'react-icons/ai'
import { Card, Table, Badge } from 'reactstrap'
import { FaCalendarAlt, FaFileContract, FaFileAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { convertTimestamp } from '../../components/helper/convertTimestamp'
import { WhoAreYou } from '../../components/helper/user/WhoAreYou'


export default function Deals({ data })
{
    const Title = 'Deals'
    // aTsoHbmRcx
    //const router = useRouter()
    //const { api } = router.query 
    const DigitalNum = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

    const StatusDeal = (data) => {
        if(data === '0') {
            return <Badge color="warning">draft</Badge>
        } else if (data === '1') {
            return <Badge color="success">active</Badge>
        } else if (data === '2') {
            return <Badge color="danger">closed</Badge>
        } else {
            return <Badge>unknown</Badge>
        }
    }

    const isArchive = (data) => {
        return data === '0' ? 
            <div className="btn btn-sm btn-secondary btn-block">No</div> : 
            <div className="btn btn-sm btn-success btn-block">Yes</div>
    }


    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineReconciliation className="text-vera" /> {Title}
            </h1>
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
            <Card style={{marginBottom: '190px'}}>
                <Table responsive hover className="m-0">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Type contract</th>
                            <th>Agent</th>
                            <th className="text-center">Transaction type</th>
                            <th>Sale price</th>
                            <th>Address</th>
                            <th>Tenant</th>
                            <th>Landlord</th>
                            <th>File</th>
                            <th className="text-center">Documents before</th>
                            <th>Date create</th>
                            <th>Closing Date</th>
                            <th>Completed</th>
                            <th>Archive</th>
                        </tr>
                        {
                            data ?
                            <>
                            {data.map((item, inx) => (
                                <tr key={inx}>
                                    <td><b className="d-block" style={{width: '40px'}}>{inx+1}</b></td>
                                    <td>
                                        <Link href="/admin/deals/[number]" as={`/admin/deals/${item.number_deals}`}>
                                            <a className="d-block" style={{width: '130px'}}>
                                                <strong>{item.type}</strong>
                                            </a>
                                        </Link>
                                    </td>
                                    <td><WhoAreYou id={item.id_agent} /></td>
                                    <td className="text-center">
                                        <div className="d-block" style={{width: '120px'}}>
                                            {item.transaction_type}
                                        </div>
                                    </td>
                                    <td>
                                        <p className="font-weight-bold text-success m-0">
                                            ${DigitalNum(item.sale_price)}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="d-block" style={{width: '100px'}}>
                                            <Link href="/dashboard/realestate/[obj]" as={`/dashboard/realestate/${item.address}`}>
                                                <a className="btn btn-light btn-sm">
                                                    <FaMapMarkerAlt /> View address
                                                </a>
                                            </Link>
                                        </div>
                                    </td>
                                    <td>{item.tenant}</td>
                                    <td>{item.landlord}</td>
                                    <td>
                                        <Link href="/dashboard/filedead/[file]" as={`/dashboard/filedead/${item.file}`}>
                                            <a className="btn btn-light btn-sm"><FaFileAlt /> Open files</a>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        {
                                            item.documents_before === '0' ? 
                                                'No' : 
                                                <Link href={item.documents_before}>
                                                    <a className="d-block" style={{width: '140px'}}>
                                                        <FaFileContract style={{fontSize: '25px'}} />
                                                    </a>
                                                </Link>
                                        }
                                    </td>                                    
                                    <td>
                                        <div className="d-block" style={{width: '190px'}}>{convertTimestamp(item.date_create)}</div>
                                    </td>
                                    <td>
                                        <div className="d-block" style={{width: '150px'}}>
                                            <FaCalendarAlt className="text-muted" /> {item.closing_date}
                                        </div>
                                    </td>                                    
                                    <td>{StatusDeal(item.completed)}</td>
                                    <td style={{opacity: '0.6'}}>{isArchive(item.archive)}</td>
                                </tr>
                            ))}
                            </> : 'Loading...'
                        }
                    </tbody>
                </Table>
            </Card>
            
            {/*{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>...</p>}*/}
        </AdminInterface>
    )
}



export async function getServerSideProps() {
    
    try {
        const res = await fetch(`https://vera.fund/api/v3/data/deal/aTsoHbmRcx`)
        const data = await res.json()
        return { props: { data } }
    } catch(err) {
        console.log(err)
        const data = {result: 0, type: 'danger', message: 'Data Not Fount', code: '404'}
        return { props: { data } }
    }

}