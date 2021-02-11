import React, { useState, useEffect } from 'react'
import { AiOutlineCalendar, AiOutlineDesktop, AiOutlineGlobal, AiOutlineTablet, AiOutlineMobile } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import { IoIosLaptop } from 'react-icons/io'
import { Table, CardHeader, CardBody } from 'reactstrap'
import Fire from '../../config/fire-config'
import Account from '../context/UserAccount'
import { Div } from './CustomTag'


export function TimelineLastSignIn(props)
{

    const info = Account()
    const [signin, setSignin] = useState(null)

    function capitalize(s)
    {
        return s && s[0].toUpperCase() + s.slice(1)
    }

    function getTypeDevice(type)
    {
        const Style = {opacity: '0.4'}
        if(type == 'pc') {
            return <AiOutlineDesktop style={Style} />
        } else if(type == 'notebook') {
            return <IoIosLaptop style={Style} />
        } else if(type == 'tablet') {
            return <AiOutlineTablet style={Style} />
        } else if(type == 'mobile') {
            return <AiOutlineMobile style={Style} />
        }
    }

    // pc
    // notebook
    // tablet
    // mobile

    useEffect(() => {
        if(info.user.currently) {
            Fire.database().ref('login/' + info.user.currently.uid)
                .once('value')
                .then(function(snapshot) {
                    setSignin(snapshot.val())
                })            
        }

    }, [signin])


    return (
        <>
            <CardHeader>
                <div className="d-flex justify-content-between">
                    <div>
                        <Div tag="h5" className="m-0">
                            Timeline Last Sign In: 
                        </Div>
                    </div>
                    <div>
                        <button className="btn p-0">
                            <FaTimes onClick={props.toggle} />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="p-0">
                <Table className="m-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date Login</th>
                            <th>Device</th>
                            <th>Browser</th>
                            <th>OS</th>
                            <th className="text-right">IP Adress &#160;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            signin ?
                            <>
                                {Object.values(signin).map((tag, idx) => (
                                    <tr key={idx}>
                                        <td style={{width: '30px'}}>{idx+1}</td>
                                        <td>
                                            <b>
                                                <AiOutlineCalendar className="text-muted" /> 
                                                &#160;{props.convertTimestamp(String(tag.time).slice(0,-3))}
                                            </b>
                                        </td>
                                        <td>
                                            {getTypeDevice(tag.device)} 
                                            &#160;{capitalize(tag.device)}
                                            {/*<FaMapMarkerAlt className="text-vera" /> Russia, Moscow*/}
                                        </td>
                                        <td>
                                            <img 
                                                src={`/img/browser/${tag.name}.svg`} 
                                                className="mr-1"
                                                style={{display: 'inline', width: '19px' }}
                                            /> {capitalize(tag.name)} {tag.version}
                                        </td>
                                        <td>
                                            {tag.os}
                                        </td>
                                        <td className="text-right">
                                            <AiOutlineGlobal className="text-muted" style={{opacity: '0.5'}} />&#160; 
                                            <a 
                                                href={`http://ru.smart-ip.net/geoip/${tag.ip}/auto`}
                                                target="_blank"
                                            >
                                                <u>{tag.ip}</u> &#160;
                                            </a>
                                        </td>
                                    </tr>                                
                                ))}
                            </> : ''
                        }
                    </tbody>
                </Table>                
            </CardBody>
        </>
    )
}