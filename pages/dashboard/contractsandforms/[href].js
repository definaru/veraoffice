import Link from 'next/link'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { useRouter } from 'next/router'
import DocsList from '../../../components/DocsList'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import { FaRegFilePdf, FaExternalLinkAlt } from 'react-icons/fa'

export default function Pdf()
{

    const router = useRouter()
    const Document = DocsList()
    const result = Document.filter(p => p.href.includes(router.query.href))
    const Title = result.map(title => title.text)

    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">{Title}</h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/contractsandforms">
                        <a>Contracts and forms</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            {result.map(list => (
                <Row key={list.id}>
                    <Col md="10">
                        <Card className="mb-5 shadow-sm">
                            <CardHeader className="d-flex justify-content-between">
                                <a onClick={() => window.history.back()} className="btn btn-outline-dark">
                                    <AiOutlineArrowLeft /> back
                                </a>
                                <h3><FaRegFilePdf className="text-danger" />&#160; {Title}</h3>
                                <a href={list.pdf} className="btn pt-0" target="_blank">
                                    <FaExternalLinkAlt />
                                </a>
                            </CardHeader>
                            <CardBody className="p-0 bg-dark">
                                <iframe 
                                    className="you_tube_screen" 
                                    src={list.pdf} frameBorder="0" 
                                    allowFullScreen
                                ></iframe>                    
                            </CardBody>
                        </Card>                        
                    </Col>
                </Row>
            ))}
            <style jsx>{`
                .btn-outline-dark:hover {color: #fff !important;}
                .you_tube_screen {
                    width:100%;
                    height:800px;
                    margin-bottom:-6px;
                }
            `}</style>
        </AdminInterface>
    )
}