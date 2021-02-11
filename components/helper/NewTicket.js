import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Row, Col, FormGroup, Card, CardHeader, Media, Jumbotron } from 'reactstrap'
import { AiOutlineCalendar } from 'react-icons/ai'
import { DataTicket } from './DataTicket'
import { ToastAlert } from '../alert/ToastAlert'
import Loading from '../Loading'
import Fire from '../../config/fire-config'
// import Skeleton from 'react-loading-skeleton'
import { MdChatBubbleOutline } from 'react-icons/md'
import Account from '../context/UserAccount'


export function NewTicket(props)
{

    const getTicket = DataTicket()
    const info = Account()
    const currency = (new Date).getTime()
    const [data, setData] = useState(getTicket)
    const [rows, setRows] = useState('1')
    const [length, setLength] = useState(0)
    const [select, setSelect] = useState('')
    const [message, setMessage] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [success, setSuccess] = useState(false)
    const [newticket, setNewticket] = useState(null)
    const DateInput = new Date().toLocaleString()
    const result = info.user.currently ? info.user.currently.displayName : 'Loading...'

    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all"
    })

    const onSubmit = d => {

        if(info.user.currently) {
            Fire.database().ref('ticket/' + info.user.currently.uid + '/' + currency).set(d)
        }
        

        setIsLoaded(true)
        setData(data.concat(d))
        setTimeout(() => setSuccess(true), 500)
        setTimeout(() => {
            setSuccess(false)
            setIsLoaded(false)
            setMessage('')
            setLength(0)
            setRows('1')
        }, 1000)
    } 


    function handleKeyDown(e)
    {
        if(e.keyCode === 13) { 
            setRows(parseInt(rows)+1)
        }
        else if (e.key === "Backspace") {
            setRows(parseInt(rows)-1 >= 1 ? 1 : rows)
        }
    }

    function onMessage(e)
    {
        setMessage(e.target.value)
        setLength(e.target.value.length)
    }

    function selectChange(e)
    {
        setSelect(e.target.value)
    }


    if(info.user.currently) {
        Fire.database().ref('ticket/' + info.user.currently.uid)
            .once('value')
            .then(function(snap) {
                setNewticket(snap.val())
            })
    }


    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="h2 font-weight-semibold mb-4 js-loon">{props.title}</h1>
                </div>
                <div>
                    <Link href='/dashboard/help'>
                        <button className="btn btn-outline-primary btn-sm">
                            &#160; &times; Cancel &#160;
                        </button>                        
                    </Link>
                </div>
            </div>

            <ol className="breadcrumb bg-transparent small p-0">
                <li className="breadcrumb-item">
                    <Link href="/dashboard">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link href="/dashboard/help">
                        <a>Help Desk</a>
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
            </ol>
            
            <Row style={{marginBottom: '100px'}}>
                <Col md="10" className="mt-0 mb-2">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="6">
                                    <h3 className="m-0">Hello, {result}</h3>
                                </Col>
                                <Col md="6" className="text-lg-right text-md-right text-center">
                                    {
                                        newticket ? 
                                            <p className="m-0">You have {Object.keys(newticket).length} question</p> : 
                                            '0 question'
                                    }                                    
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <select 
                                        name="tickets"
                                        className="form-control" 
                                        ref={register}
                                        defaultValue="Select a topic of conversation"
                                        onChange={selectChange}
                                    >
                                        <option disabled>Select a topic of conversation</option> 
                                        <option value="Financial issue">Financial issue</option>
                                        <option value="Technical question">Technical question</option>
                                        <option value="Help broker">Help broker</option>
                                        <option value="Assistance to the agent">Assistance to the agent</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </FormGroup>
                                {
                                    select.length ? 
                                    <FormGroup>
                                        <p>Describe your question, at least 20 characters.</p>
                                        <textarea 
                                            name="message"
                                            className="form-control" 
                                            ref={register}
                                            rows={rows} 
                                            placeholder="Write your question here"
                                            onKeyDown={handleKeyDown}
                                            onChange={onMessage}
                                            value={message}
                                            style={{overflow: 'hidden', resize: 'none'}}
                                        >
                                        </textarea>
                                        <small>{`${length} characters entered`}</small>
                                    </FormGroup> : ''                        
                                }
                                <input type="hidden" name="date" defaultValue={DateInput} ref={register} />
                                <input type="hidden" name="resolution" defaultValue={false} ref={register} />
                                <input type="hidden" name="href" defaultValue={currency} ref={register} />
                                <input type="hidden" name="chat" defaultValue={null} ref={register} />
                                {
                                    message.length >= 20 && 
                                    <button type="submit" className="btn btn-primary">
                                        {isLoaded == true ? <Loading /> : 'Send Ticket'}
                                    </button>
                                }
                            </form>                            
                        </CardHeader>
                    </Card>
                </Col>
                <Col md="10" className="mt-4 mb-4" >
                    {
                        message.length >= 15 && 
                        <Card className="mb-4 shadow">
                            <CardHeader>
                                {
                                    info.user.login ? 
                                    <Media>
                                        <Media left href="#">
                                            <img 
                                                src={info.user.login.photo} 
                                                alt={`${info.user.login.username} ${info.user.login.lastname}`} 
                                                className="mr-3 rounded-circle" 
                                                style={{width: '60px'}} 
                                            />
                                        </Media>
                                        <Media body>
                                            <Media heading className="m-0 pt-2 js-loon">
                                                {`${info.user.login.username} ${info.user.login.lastname}`} 
                                            </Media>
                                            <small className="text-muted">{info.user.login.rank}</small>
                                        </Media>
                                    </Media> : 'Loading...'                                   
                                }

                                <Jumbotron className="mt-4 mb-0 pt-3 pb-3">
                                    <h3>{select}</h3>
                                    <pre>{message}</pre>
                                    <small className="text-muted"><AiOutlineCalendar /> {DateInput}</small>
                                </Jumbotron>                              
                            </CardHeader>
                        </Card>
                    }



                    {
                        newticket ? 
                            <>
                            {Object.values(newticket).map((tag, idx) => (
                                <Card key={idx} className="mb-4 shadow">    
                                    <CardHeader>
                                        {
                                            info.user.login ?                                       
                                                <Media>
                                                    <Media left href="#">
                                                        <img 
                                                            src={info.user.login.photo} 
                                                            alt={info.user.login.username} 
                                                            className="mr-3 rounded-circle" 
                                                            style={{width: '60px', height: '60px'}} 
                                                        />
                                                    </Media>
                                                    <Media body>
                                                        {
                                                            tag.resolution === "false" ? 
                                                                <span className="badge badge-warning float-right">pending</span> : 
                                                                <span className="badge badge-success float-right">complited</span>
                                                        }
                                                        <Media heading className="m-0 pt-2 js-loon">
                                                            {info.user.login.username + ' ' + info.user.login.lastname} 
                                                        </Media>                                        
                                                        <small className="text-muted">{info.user.login.rank}</small>
                                                    </Media>
                                                </Media> : ''
                                        }
                          
                                        <Jumbotron className="mt-4 mb-0 pt-2 pb-2 pl-0 pr-0 bg-white">
                                            <Link href="/dashboard/help/[href]" as={`/dashboard/help/${tag.href}`}>
                                                <h3 className="cp">{tag.tickets}</h3>
                                            </Link>
                                            <pre>{tag.message}</pre>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <small className="text-muted">
                                                        <AiOutlineCalendar /> {tag.date}
                                                    </small>
                                                </div>
                                                <div>
                                                    {
                                                        tag.resolution === "false" ?
                                                        <Link href="/dashboard/help/[href]" as={`/dashboard/help/${tag.href}`}>
                                                            <a className="text-dark">
                                                                <MdChatBubbleOutline />
                                                                &#160;
                                                                {tag.count}
                                                            </a>
                                                        </Link> : ''                                                       
                                                    }

                                                </div>
                                            </div>                                            
                                        </Jumbotron>   
                                    </CardHeader>   
                                </Card> 
                            ))}
                            </> : ''
                    }  
                </Col>
            </Row>   
            
            {
                success ?
                    <ToastAlert 
                        header="Successfully" 
                        text="Your application has been accepted and is pending" 
                        color="success" 
                        headerColor="text-white" 
                        textColor="text-light" 
                    /> : ''
            }
        </>

    )
}