import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Alert, Button, Col, FormFeedback, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Media, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { Default } from '../components/layout/Default'
import Loading from '../components/Loading'
import { FaEye, FaRegCheckCircle, FaSyncAlt } from 'react-icons/fa'
import Fire from '../config/fire-config'
import { ToastAlert } from '../components/alert/ToastAlert'


export default function Confirm()
{

    const Title = 'Confirm Password'
    
    const { register, errors, watch, handleSubmit } = useForm({
        criteriaMode: "all"
    })

    const isValidPass = () => {
        return (FirstPassword === TwoPassword) ? true : false
    }
    const [login, setLogin] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState('')
    const [types, setTypes] = useState(true)
    const FirstPassword = watch("password")
    const TwoPassword   = watch("newpassword")
    const ref =Fire.auth().currentUser
    const changeType = () => setTypes(prev => !prev)

    const onSubmit = data => {
        //console.log(JSON.stringify(data))
        //console.table(JSON.parse(JSON.stringify(data)))
        //console.log('Get DATA: ', JSON.stringify(login))
        setLoading(true)
        setLogin(data)
    } 

    useEffect(() => {

        console.log(ref)

        Fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                setMessage(null)
            } else {
                setMessage({header: 'Error', text: 'No user is signed in', color: 'danger'})
            }
        })
        if(ref === null){
            setMessage({header: 'Information', text: 'Only registered users can change the password.', color: 'info'})
        } else {
            if(login) {
                ref.updatePassword(FirstPassword).then(function() {

                    setTimeout(() => { 
                        setComplete({header: 'Successfully', text: 'Your password has been changed'})
                    }, 250 )
                    
                }).catch(function(error) {
                    console.log('Error:', error)
                    setLoading(false)
                    setMessage({header: 'Error', text: error.message, color: 'danger'})
                })          
            }            
        }


    }, [login])

    return (
        <Default title={Title}>
            <Row>
                <Col className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
                    <h5 className="text-center mt-5 pt-5">
                        <Link href="/">
                            <a>
                                <img 
                                    src="/img/logo.png" 
                                    className="d-flex justify-content-center mb-3" 
                                    style={{width: '200px', margin: 'auto'}} 
                                />                  
                            </a>
                        </Link>
                        {Title}
                    </h5>
                    {
                        complete ? 
                            <>
                                <p className="text-center">
                                    Please enter new password here
                                </p>        
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormGroup>
                                        <InputGroup>
                                            <input 
                                                type={types ? "password" : "text"} 
                                                name="password" 
                                                autoComplete="off"
                                                autoCorrect="off" 
                                                spellCheck="false"
                                                className={errors.password ? "is-invalid form-control" : "form-control"}
                                                ref={
                                                    register({
                                                        required: true
                                                    })
                                                } 
                                                defaultValue={FirstPassword}
                                                placeholder="Your new password"
                                            />                                        
                                            <InputGroupAddon addonType="prepend" onClick={changeType}>
                                                <InputGroupText className={errors.password ? "cp no-valid" : "cp"}>
                                                    <FaEye />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>

                                        {
                                            errors.password &&
                                            <>
                                                {errors?.password?.types?.required && <FormFeedback>Password is required</FormFeedback>}
                                            </>
                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <input 
                                                type={types ? "password" : "text"}
                                                name="newpassword" 
                                                autoComplete="off"
                                                autoCorrect="off" 
                                                spellCheck="false"
                                                className={errors.newpassword ? "is-invalid form-control" : "form-control"}
                                                ref={
                                                    register({
                                                        required: true,
                                                        validate: {isValidPass}
                                                    })
                                                } 
                                                defaultValue={TwoPassword}
                                                placeholder="Your new password again"
                                            />
                                            <InputGroupAddon addonType="prepend" onClick={changeType}>
                                                <InputGroupText className={errors.password ? "cp no-valid" : "cp"}>
                                                    <FaEye />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {
                                            errors.newpassword &&
                                            <>
                                                {errors?.newpassword?.types?.required && <FormFeedback>Password is required</FormFeedback>}
                                                {errors?.newpassword?.types?.isValidPass && <FormFeedback>Password is not match!</FormFeedback>}
                                            </>
                                        }
                                    
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit" color="vera" className="btn-block mt-2">
                                            {loading ? <Loading /> : <><FaSyncAlt />&#160; Сhange password</>}
                                        </Button>
                                    </FormGroup>
                                </form>                            
                            </> :
                            <Alert color="success" className="mt-4">
                                <Media>
                                    <Media left className="mr-3">
                                        <FaRegCheckCircle style={{fontSize: '67px', opacity: '0.4'}} />
                                    </Media>
                                    <Media body>
                                        <strong className="text-white mt-2 btn-block">{complete.header}</strong>
                                        <p className="text-light m-0">
                                            {complete.text}
                                        </p>
                                    </Media>
                                </Media>
                            </Alert>
                    }

                </Col>
            </Row>
            {message ? <ToastAlert header={message.header} text={message.text} color={message.color} /> : ''}
        </Default>
    )
}