import { useState } from 'react'
import { FaPenNib, FaPhoneAlt, FaRegFileArchive, FaRegTrashAlt, FaSearch } from 'react-icons/fa'
import { Card, CardBody, CardFooter, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Jumbotron, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { LoadRole } from './LoadRole'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'


export function GetCardPanel({data})
{

    const [list, setList] = useState(data)
    const [isAll, setIsAll] = useState(false)
    const { register, watch } = useForm({
        criteriaMode: "all"
    })
    const watchFields = watch('search')

    const ToggleClass = () => setIsAll(prevState => !prevState)

    const searchPeople = e => {

        const insert = e.target.value
        if( insert === '') {
            setList(data)
        } else {
            setList(list.filter(user => user.username.includes(e.target.value)))
        }
    }

    function deleteActive(id)
    {
        setList(list.filter(i => i.id !== id))
    }


    return (
        <>
            <InputGroup className="mb-4">
                <input 
                    type="search" 
                    name="search" 
                    className="border-right-0 rounded-0 form-control" 
                    placeholder="Search by name..." 
                    autoComplete="off"
                    defaultValue={watchFields}
                    onChange={searchPeople}
                    onKeyPress={searchPeople}
                    onKeyDown={searchPeople}
                    ref={register}
                />
                <InputGroupAddon addonType="prepend">
                    <InputGroupText className="bg-white border-left-0 border">
                        <FaSearch />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <Row>

            {
                list.length ? 
                <>
                    {list.map(table => (
                        <Col md="4" key={table.id}>
                            <Card className="mb-4">
                                <CardHeader>
                                    <Row>
                                        <Col xs="6">
                                            <input 
                                                id={`deal${table.id}`} 
                                                defaultChecked={isAll && 'checked'}
                                                type="checkbox" 
                                            />                                                
                                        </Col>
                                        <Col xs="6">
                                            <div className="d-flex justify-content-end">
                                                <div className="pl-3">
                                                    <FaRegFileArchive />
                                                </div>
                                                <div className="pl-3">
                                                    <FaPenNib />
                                                </div>
                                                <div className="pl-3">
                                                    <FaRegTrashAlt 
                                                        className="text-danger cp" 
                                                        onClick={() => deleteActive(table.id)}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </CardHeader>
                                <CardBody className="text-center">
                                    {
                                        table.photo === '' ?
                                        <span
                                            className="rounded-circle border mr-3 d-block pt-4 mb-3 mx-auto"
                                            style={{
                                                background: `#${Math.floor(Math.random()*16777215).toString(16)}`, 
                                                color: '#fff',
                                                width: '84px', 
                                                height: '84px',
                                                fontSize: '25px'
                                            }}
                                        >
                                            {`${table.username[0]}${table.lastname[0]}`}
                                        </span> :
                                        <img 
                                            className="img-fluid rounded-circle mb-3" 
                                            src={table.photo} 
                                            alt={`${table.username} ${table.lastname}`} 
                                            style={{width: '84px', height:'84px'}}
                                        />                                                                                     
                                    }

                                    <h2 className="mb-2 js-loon" style={{fontSize: '30px'}}>
                                        {`${table.username} ${table.lastname}`}
                                    </h2>
                                    <strong className="text-muted mb-2 btn-block">
                                        {table.rank}
                                    </strong>
                                    <strong className="badge badge-primary">
                                        <LoadRole roles={table.level} />
                                    </strong>
                                    <span className="btn-block mt-2 mb-2">
                                    {
                                        table.phone === '' || table.phone === null ? 
                                            <span className="badge badge-light text-muted">
                                                ( no data )
                                            </span> :
                                            <>
                                                <a href={`tel:${table.phone}`}>
                                                    <span className="badge badge-light">
                                                        <FaPhoneAlt />&#160; {table.phone}
                                                    </span>
                                                </a>
                                            </>
                                    }
                                    </span>
                                    <a href={`mailto:${table.email}`}><u>{table.email}</u></a>
                                </CardBody>
                                <CardFooter className="p-0 border-top-0">
                                    <Link href="/admin/users/[api]" as={`/admin/users/${table.api}`}>
                                        <a className="btn btn-vera btn-block rounded-0 pt-3 pb-3">
                                            VIEW PROFILE
                                        </a>                                        
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </> :
                <Col md="12">
                    <Jumbotron className="mt-2 mb-0 bg-light text-center">
                        <p className="m-0">No data. No results were found for your search.</p>
                    </Jumbotron>  
                </Col>
            }
            <style jsx>{`
                .btn-vera:after {
                    content: "";
                    position: absolute;
                    width: 40%;
                    height: 1px;
                    background: #ddd;
                    left: 30%;
                    top: 368px;
                }
                .btn-vera {
                    color: #4054b2;
                    background-color: #ffffff;
                    border-color: #ffffff !important;
                    font-weight: bold !important;
                }
                .btn-vera:hover {
                    color: #ffffff;
                    background-color: #4054b2;
                    border-color: #4054b2 !important;
                }
            `}</style>
            </Row>
        </>
    )
}