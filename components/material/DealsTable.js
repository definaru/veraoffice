import React, { useState } from 'react'
import { FaPenNib, FaRegFileArchive, FaRegTrashAlt } from 'react-icons/fa'
import { Jumbotron } from 'reactstrap'
import { ProgressBar } from '../helper/ProgressBar'
import Link from 'next/link'
import Loading from '../Loading'


export function DealsTable({data, type})
{

    const [list, setList] = useState(data) // type - type: 'deals'
    const [isAll, setIsAll] = useState(false) // .filter(t => t.type.includes('deals'))

    function toggle(e) 
    {
        e.preventDefault()
        setIsAll(prevState => !prevState)
    }

    function deleteActive(id)
    {
        setList(list.filter(i => i.id !== id))
    }
    function deleteAll()
    {
        setList('')
    }

    function toggleArchive(id)
    {
        setList(
            list.map(a => {
                if(a.id === id){
                    a.type = 'archive'
                } return a
            })
        )
    }
    function getSumma(e)
    {
        try {
            let initialValue = 0;
            let price = parseInt(price)
            return e.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
                initialValue
            )
        } catch (e) {
            console.log('Error: ', e)
            return 0
        }
    }

    return ( 
        <>
        {
            list.length ?
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" onClick={toggle}>
                                    <div className="custom-control custom-checkbox">
                                        <input 
                                            id="deal0" 
                                            name="checkAll"
                                            className="custom-control-input" 
                                            type="checkbox" 
                                            defaultChecked={isAll && 'checked'} 
                                            data-test={isAll}
                                        />
                                        <label className="custom-control-label" htmlFor="deal0"></label>
                                    </div>
                                </th>
                                <th scope="col" className="font-weight-bold">Transaction Name </th>
                                <th scope="col" className="font-weight-bold" width="160">Status</th>
                                <th scope="col" className="font-weight-bold" width="170">Client</th>
                                <th scope="col" className="font-weight-bold" width="170" className="d-none">Agent</th>
                                <th scope="col" className="font-weight-bold">Lead</th>
                                <th scope="col" className="font-weight-bold">Price</th>
                                <th scope="col" className="font-weight-bold">Commission</th>
                                <th scope="col" className="font-weight-bold" width="140">Date Created</th>
                                <th scope="col" className="font-weight-bold" width="140" className="d-none">Closing Date</th>
                                <th scope="col" className="text-center font-weight-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                list ? 
                                <>
                        {list.filter(t => t.type.includes(type)).map(d => (
                            <tr key={d.id}>
                                <td>
                                    <div className="custom-control custom-checkbox">
                                        <input 
                                            id={`deal${d.id}`} 
                                            className="custom-control-input dealCheck" 
                                            defaultChecked={isAll && 'checked'}
                                            type="checkbox" 
                                        />
                                        <label className="custom-control-label" htmlFor={`deal${d.id}`}></label>
                                    </div>
                                </td>
                                <td>
                                    <Link href="/dashboard/deals/[href]" as={`/dashboard/deals/${d.href}`}>
                                        <a>{d.name}</a>
                                    </Link>
                                </td>
                                <td>
                                    <ProgressBar progress={d.status} />
                                </td>
                                <td><a href="!#"><u>{d.client}</u></a></td>
                                <td className="d-none">{d.agent}</td>
                                <td>{d.lead}</td>
                                <td>
                                    <span className="badge badge-success">
                                        {
                                            d.price ? 
                                                <>$ {parseInt(d.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</> :
                                                <p>...</p> 
                                        }
                                        
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-light">
                                        $ {parseInt(d.commission).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </span>
                                </td>
                                <td>
                                    <small>{d.date_created}</small>
                                </td>
                                <td className="d-none">
                                    <small>{d.closing_date}</small>
                                </td>
                                <td className="text-center actions">
                                    <div className="d-flex justify-content-end">
                                        <div className="pr-3 cp">
                                            <FaPenNib />
                                        </div>
                                        <div className="pr-3 cp">
                                            {/*<FaRegFileArchive onClick={() => toggleArchive(d.id)} />*/}
                                            
                                            <FaRegFileArchive 
                                                className="text-danger" 
                                                onClick={() => toggleArchive(d.id)}
                                                //onClick={() => deleteActive(d.id)}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                                </> :
                                <>
                                    <tr>
                                        <td colSpan="9">
                                            <Loading />
                                        </td>
                                    </tr>
                                </>
                            }


                            <tr>
                                <td colSpan="6"></td>
                                <td>
                                    {
                                        isAll ? 
                                        <button className="btn btn-info btn-sm" onClick={deleteAll}>
                                            &#160;<FaRegTrashAlt />&#160;Archive all&#160;
                                        </button> : ''
                                    }
                                </td>
                                <td colSpan="1">
                                    <p className="m-0">
                                        <strong>{list ? Object.keys(list).length : 'Loading...'}</strong> records
                                    </p>
                                </td>
                                <td>
                                    {
                                        list ?
                                            <strong>$ {getSumma(list).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> :
                                            <strong>Loading...</strong>
                                    }
                                    
                                </td>
                            </tr>
                        </tbody> 
                    </table>
                </div> : 
                <Jumbotron className="mt-2 mb-0 bg-light">
                    <p className="m-0">No {data.slice(-1).map(a => a.type)} data</p>
                </Jumbotron>  
            }
        <pre>
            {/*JSON.stringify(list, null, 2)*/}
        </pre>
        </>
    )
}