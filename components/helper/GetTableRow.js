import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { FaPenNib, FaPhoneAlt, FaRegFileArchive, FaRegTrashAlt, FaSearch } from 'react-icons/fa'
import { Card, InputGroup, InputGroupAddon, InputGroupText, Jumbotron, Media, Table } from 'reactstrap'
import { LoadAvatarRow } from './LoadAvatarRow'
import { LoadRole } from './LoadRole'
import { useForm } from 'react-hook-form'
import Link from 'next/link'


export function GetTableRow({data})
{

    const [list, setList] = useState(data)
    const [isAll, setIsAll] = useState(false)
    //const [col, setCol] = useState(10)

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
        <Card className="mb-5">
            <InputGroup>
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
                    <InputGroupText className="bg-white border-left-0">
                        <FaSearch />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <Table responsive hover className="m-0">
                <thead>
                    <tr className="bg-white">
                        <th style={{width: '50px'}}>
                            <input 
                                id="deal0" 
                                name="checkAll"
                                type="checkbox" 
                                defaultChecked={isAll && 'checked'} 
                                data-test={isAll}
                                onClick={ToggleClass}
                            />    
                        </th>
                        <th style={{width: '200px'}}>Full Name / Phone</th>
                        <th style={{width: '135px'}}>Phone</th>
                        <th style={{width: '190px'}}>E-mail</th>                            
                        <th style={{width: '95px'}}>Role</th>
                        <th style={{width: '245px'}}>Position / Rate</th>
                        <th className="text-right">
                        <div className="btn-group">
                            <button className="btn btn-default btn-sm border">
                                <AiOutlineArrowLeft />
                            </button>
                            <button className="btn btn-default btn-sm border">
                                <AiOutlineArrowRight />
                            </button>
                        </div>
                        </th>
                    </tr>
                </thead>
                {
                    list.length ? 
                    <tbody> 
                        {list.map(table => ( // .slice(0, 38)
                            <tr key={table.id}>
                                <td>
                                    <input 
                                        id={`deal${table.id}`} 
                                        defaultChecked={isAll && 'checked'}
                                        type="checkbox" 
                                    />
                                </td>
                                <td className="p-1">
                                    <Media>
                                        <Media left>
                                            <LoadAvatarRow 
                                                avatar={table.photo} 
                                                name={table.username} 
                                                last_name={table.lastname} 
                                            />
                                        </Media>
                                        <Media body>
                                            <Link href="/admin/users/[api]" as={`/admin/users/${table.api}`}>
                                                <a className="text-vera btn-block mt-2">
                                                    <h5 className="js-loon">{table.username} {table.lastname}</h5>
                                                </a>                                            
                                            </Link>
                                        </Media>
                                    </Media>
                                </td>
                                <td className="p-1">
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
                                </td>
                                <td className="p-1">
                                    <a href={`mailto:${table.email}`}><u>{table.email}</u></a>
                                </td>
                                <td className="p-1">
                                    <span className="badge badge-secondary btn-block badge-pill ml-2">
                                        <LoadRole roles={table.level} />                                            
                                    </span>
                                </td>
                                <td className="p-1">
                                    <small>
                                        <strong className="ml-2">{table.rank}</strong>
                                    </small>
                                </td>
                                <td className="p-1 actions">
                                    <div className="d-flex justify-content-end">
                                        <div className="pr-3">
                                            <FaRegFileArchive />
                                        </div>
                                        <div className="pr-3">
                                            <FaPenNib />
                                        </div>
                                        <div className="pr-3">
                                            <FaRegTrashAlt 
                                                className="text-danger cp" 
                                                onClick={() => deleteActive(table.id)}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>                                
                        ))}
                    </tbody> : 
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <Jumbotron className="mt-2 mb-0 bg-light text-center">
                                    <p className="m-0">No data. No results were found for your search.</p>
                                </Jumbotron>  
                            </td>    
                        </tr>                    
                    </tbody>
                }
            </Table>
            <style jsx>{`
                .actions {
                    opacity:0.5;
                    transition: opacity 0.5s;
                }
                tr:hover .actions {
                    opacity: 1;
                    cursor:default;
                }
            `}</style>
        </Card>
    )
}