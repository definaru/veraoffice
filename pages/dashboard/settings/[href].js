import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { AdminInterface } from '../../../components/layout/AdminInterface'
import { ListSettings } from '../../../components/helper/ListSettings'
import { Alert, Card, CardBody, CardHeader } from 'reactstrap'
import ElectronicDigitalSignature from '../../../components/data/ElectronicDigitalSignature'
import { DataProtection } from '../../../components/data/DataProtection'
import { AiOutlineInfoCircle } from 'react-icons/ai'


export default function FullSetting()
{
    const router = useRouter()
    const { href } = router.query
    const List = ListSettings()
    const result = List.filter(p => p.href.includes(href))
    const Title = result.map(res => res.header)
    const [type, setType] = useState('')


    return (
        <AdminInterface title={Title}>
            <h1 className="h2 font-weight-semibold mb-4 js-loon">
                <span className="text-vera">
                    {result.map(res => res.icon)}
                </span>
                &#160;{Title}
            </h1>
            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/settings">
                        <a>Settings</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{Title}</li>
            </ol>
            <Card className="mb-5">
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <div>
                            {
                                result.map(res => res.text.split(',').map((item, i) => (
                                    <span key={item + i} 
                                        onClick={() => setType(`${item.trim()}`)}
                                        className={`${type === item.trim() ? 
                                            'bg-vera text-white ' : 
                                            'bg-light text-muted '
                                        }rounded py-2 px-3 mb-2 mr-2 cp`}
                                    >
                                        {item.trim()}
                                    </span>
                                )))
                            } 
                        </div>
                        <div>
                            <Link href="/dashboard/settings">
                                <a>✖</a>
                            </Link> 
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {/*<p>{type}</p>*/}
                    
                    
                    {
                        type === '' && 
                        <Alert color="info">
                            <div className="btn-block text-center">
                                <strong><AiOutlineInfoCircle /> Information:</strong>
                                &#160;&#160;Please select the desired section to manage your account.
                            </div>
                        </Alert>
                    }                        
                    

                    {type === 'Electronic Digital Signature' && <ElectronicDigitalSignature />}
                    {type === 'Data protection' && <DataProtection />}
                </CardBody>
            </Card>
        </AdminInterface>
    )
}