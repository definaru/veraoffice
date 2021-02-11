import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Default } from '../components/layout/Default'
import { FaSyncAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, FormGroup, Label, FormFeedback } from 'reactstrap'
import { ToastAlert } from '../components/alert/ToastAlert'
import Loading from '../components/Loading'
import Send from './send'
import Fire from '../config/fire-config'


export default function Reset()
{

    const min = 1000
    const max = 9999
    const Code = Math.floor(Math.random() * (max - min)) + min
    
    const [errAuth, setErrAuth] = useState(null)
    const [reset, setReset] = useState(false)
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState(null)
    const [loading, setLoading] = useState(false)
    //const [state, setState] = useState('')
    const [code, setCode] = useState(null)

    const currentUser = Fire.auth().currentUser

    const Name = reset ? 'Reset Password' : 'Your new password has been sent by E-mail'

    const { register, errors, watch, handleSubmit } = useForm({
        criteriaMode: "all"
    })
    const watchEMAIL = watch("email")
    //const validUser = user.filter(p => p.email.includes(email))

    const isValid = () => {
        if(errAuth) {
            return (errAuth.code === 'auth/user-not-found') ? false : true
        }
    }

    const onSubmit = data => {
        //console.log(JSON.stringify(data))
        //console.table(JSON.parse(JSON.stringify(data)))
        setLogin(data)
    } 

    function changeEmailValue(e) 
    {
        setEmail(e.target.value)
        window.localStorage.setItem('email', e.target.value)
    }

    useEffect(() => {

        
        //const forgotPassword = () => {
            //Fire.auth().sendPasswordResetEmail(email)
            //    .then(function(user) {
            //        console.log('Result Data User: ', user)
            //    })
            //    .catch((err) => {
            //        setErrAuth(err)
            //        console.log(err)
            //    })
        //}

        if(errAuth !== null) {
            setLoading(false)
            setReset(false)
        } else {
            setReset(true)
            setLoading(false)
            setCode(Code)

            if(login && currentUser) {

                
                // watchEMAIL
                const test = 'rayvaigmi@gmail.com'
                const KeyPassword = code
                window.localStorage.setItem('gitApp', KeyPassword)

                axios.get(`https://5guys.ru/v1/mail/send?name=${currentUser.displayName}&email=${test}&subject=Change Password&base=${KeyPassword}`)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => console.log('Axios Error:', setErrAuth(e) ) )

                    setReset(true)
                    setLoading(true)                 
                
                
                //let actionCodeSettings = {
                //    url: 'http://localhost:4500/login?cartId=6234',
                //    handleCodeInApp: true,
                    //dynamicLinkDomain: 'veraoffice.com'
                //}
                //Fire.auth().sendSignInLinkToEmail(email, actionCodeSettings)
                //    .then(function(result) {
                //        console.log('Result Send Email: ', result)
                //        window.localStorage.setItem('AuthSignIn', JSON.stringify(currentUser))
                //    })
                //    .catch((err) => {
                //        setErrAuth(err)
                //        console.log('send Sign In Link: ', err)
                //    })
                //const resetLink = async () => await currentUser.generatePasswordResetLink(email)
                //console.log('State Reset:', login)
            }
        }




    }, [login, loading])


    return (
        <Default title={Name}>
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
                        {Name}
                    </h5>
            {
                reset ? 
                    <>
                        <p className="text-center">
                            Please enter your email address
                        </p>        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label>Email</Label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    autoComplete="off"
                                    className={errors.email ? "is-invalid form-control" : "form-control"}
                                    onChange={changeEmailValue}
                                    ref={
                                        register({
                                            required: true, 
                                            pattern: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                            validate: {isValid}
                                        })
                                    } 
                                    defaultValue={email}
                                />
                                {
                                    errors.email &&
                                    <>
                                        {errors?.email?.types?.required && <FormFeedback>Email is required</FormFeedback>}
                                        {errors?.email?.types?.pattern && <FormFeedback>This address is not an email</FormFeedback>}
                                        {errors?.email?.types?.isValid && <FormFeedback>There is no such user, or the user is not registered</FormFeedback>}                  
                                    </>
                                }
                                <input type="hidden" name="secret" defaultValue={Code} />
                            </FormGroup>
                            <Button type="submit" color="vera" className="btn-block">
                                {loading ? <Loading /> : <><FaSyncAlt />&#160; {Name}</>}
                            </Button>
                        </form>        
                    </> :              
                    <Send email={email} name={Name} />
            }

                    {errAuth ? <ToastAlert header="Error" text={errAuth.message} color="danger" /> : ''}


                    

                    {/*
                        {reset? <pre>{JSON.stringify(reset, null, 2)}</pre> : <p>null</p>}
                        <p>..............................</p>
                        {
                            currentUser ? 
                            <pre>{JSON.stringify(currentUser, null, 2)}</pre> : 'null'
                        }                     
                    */}
                    

                </Col>
            </Row>
        </Default>
    )
}