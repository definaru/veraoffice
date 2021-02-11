import Link from 'next/link'
import React from 'react'
import { AdminInterface } from '../../components/layout/AdminInterface'
import DocsList from '../../components/DocsList'
import { Card, CardBody, Table } from 'reactstrap'
//import { useRouter } from 'next/router'
import { FaRegPlayCircle } from 'react-icons/fa'
import { AiOutlineFilePdf } from 'react-icons/ai'


export default function ContactForm()
{
    const Title = 'Contracts and forms'
    //const router = useRouter()
    const Document = DocsList()

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <AiOutlineFilePdf className="text-vera" /> {Title}
            </h1>
            <div className="d-flex justify-content-between col-md-10 p-0">
                <div>
                    <ol className="breadcrumb bg-transparent small p-0">
                        <li className="breadcrumb-item">
                            <Link href="/dashboard">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{Title}</li>
                    </ol>
                </div>
                <div>
                    <p className="font-weight-bold text-dark">Total {Object.keys(Document).length} records</p>
                </div>
            </div>

            
            <Card className="col-md-10 p-0">
                <CardBody className="p-0">
                    <Table responsive hover className="m-0">
                        <tbody>
                        {Document.map(list => (
                            <tr key={list.id}>
                                <td style={{width:'20px'}}>
                                    <img src="/icon/pdf.svg" style={{width: '35px'}} />
                                </td>
                                <td>
                                    <Link href="/dashboard/contractsandforms/[href]" as={`/dashboard/contractsandforms/${list.href}`}>
                                        <a className="text-vera">
                                            <span className="btn-block crop">{list.text}</span>
                                        </a>
                                    </Link>
                                </td>
                                <td className="text-right">
                                    {
                                        list.video == '' ? 
                                        <>
                                            <button className="btn btn-secondary" disabled>
                                                <FaRegPlayCircle /> &#160; no &#160; video
                                            </button>
                                        </> 
                                        : 
                                        <>
                                        <Link href="/dashboard/contractsandforms/video/[video]" as={`/dashboard/contractsandforms/video/${list.video}`}>
                                            <a className="btn btn-primary">
                                                <FaRegPlayCircle />&#160; play video
                                            </a>
                                        </Link>
                                        </>
                                    }

                                </td>
                            </tr>                            
                        ))}                            
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <style jsx>{`
                .crop {
                    white-space: nowrap;
                    overflow: hidden;
                    padding: 0px;
                    background: transparent;
                    position: relative;
                    width:100%;
                }
                .crop::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40px;
                    height: 100%;
                    background: -moz-linear-gradient(left, rgba(255,255,255, 0.2), #fff 100%);
                    background: -webkit-linear-gradient(left, rgba(255,255,255, 0.2), #fff 100%);
                    background: -o-linear-gradient(left, rgba(255,255,255, 0.2), #fff 100%);
                    background: -ms-linear-gradient(left, rgba(255,255,255, 0.2), #fff 100%);
                    background: linear-gradient(to right, rgba(255,255,255, 0.2), #fff 100%);
                }
                tr:hover .crop::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40px;
                    height: 100%;
                    background: -moz-linear-gradient(left, rgba(249,251,253, 0.2), #f9fbfd 100%);
                    background: -webkit-linear-gradient(left, rgba(249,251,253, 0.2), #f9fbfd 100%);
                    background: -o-linear-gradient(left, rgba(249,251,253, 0.2), #f9fbfd 100%);
                    background: -ms-linear-gradient(left, rgba(249,251,253, 0.2), #f9fbfd 100%);
                    background: linear-gradient(to right, rgba(249,251,253, 0.2), #f9fbfd 100%);
                }
            `}</style>
        </AdminInterface>
    )
}