import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DefinaIPAdress } from '../helper/DefinaIPAdress'
import { DeviceDetected } from '../helper/DeviceDetected'
import { PermissionDetect } from '../helper/PermissionDetect'
import { ToastAlert } from '../alert/ToastAlert'
import { FaEye, FaRegCheckCircle, FaSyncAlt } from 'react-icons/fa'
import { Alert, Button, Col, FormFeedback, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Media } from 'reactstrap'
import axios from 'axios'
import Loading from '../../components/Loading'
import Fire from '../../config/fire-config'


export function DataProtection()
{

    const { register, errors, watch, handleSubmit } = useForm({
        criteriaMode: "all"
    })
    const IP = DefinaIPAdress()
    const DD = DeviceDetected()
    const isAdmin = PermissionDetect()
    const ref = Fire.auth().currentUser
    const FirstPassword = watch("password")
    const TwoPassword   = watch("newpassword")
    const isValidPass = () => {
        return (FirstPassword === TwoPassword) ? true : false
    }
    const [types, setTypes] = useState(true)
    const [login, setLogin] = useState(null)
    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState('')
    const [message, setMessage] = useState(null)
    const [auth, setAuth] = useState(null)


    const changeType = () => setTypes(prev => !prev)

    const onSubmit = data => {
        //console.log(JSON.stringify(data))
        //console.table(JSON.parse(JSON.stringify(data)))
        //console.log('Get DATA: ', JSON.stringify(login))
        setLogin(data)
    } 

    useEffect(() => {

        Fire.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                setAuth(uid)
            } else {
                setMessage({header: 'Error', text: 'User is signed out', color: 'danger'})
            }
        })

        if(login) {
            ref.updatePassword(FirstPassword).then(function() {
                setLoading(true)
                setTimeout( () => { 
                    setComplete({header: 'Successfully', text: 'Your password has been changed'})
                }, 250 )
                axios.get(`https://5guys.ru/v1/mail/send?name=Nikolay Polyushkin&email=rayvaigmi@gmail.com&subject=Entry alert&base=Windows10 - IP:88.888.88.011`)
            }).catch(function(error) {
                //console.log('Error:', error)
                setLoading(false)
                setMessage({header: 'Error', text: error.message, color: 'danger'})
            }) 
        } 
        //else {
        //    setLoading(false)
        //    setLogin(null)
        //    setMessage({header: 'Error', text: 'Something went wrong, please try again', color: 'danger'})
        //}

    }, [])

    return (
        <>
        <Col md={{ size: 6, offset: 3 }} className="text-center">
            {
                complete ?
                    <Alert color="success" className="mt-4 text-left">
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
                    </Alert> :
                    <>
                        <h1 className="text-vera js-loon">Confirm Password</h1>
                        <p className="text-muted">
                            Please enter new password here
                        </p>        
                        <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: '100px'}}>
                            <FormGroup>
                                <InputGroup>
                                    <input 
                                        type={types ? "password" : "text"} 
                                        name="password" 
                                        autoComplete="off"
                                        autoCorrect="off" 
                                        spellCheck="false"
                                        className={
                                            errors.password ? 
                                                "is-invalid form-control custom-input rounded-0" : 
                                                "form-control custom-input rounded-0"
                                            }
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
                                        className={
                                            errors.newpassword ? 
                                                "is-invalid form-control custom-input rounded-0" : 
                                                "form-control custom-input rounded-0"
                                            }
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
                                        <InputGroupText className={errors.newpassword ? "cp no-valid" : "cp"}>
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
                    </>
            }
            {message ? <ToastAlert header={message.header} text={message.text} color={message.color} /> : ''}

        </Col>
        <Col md={12} className={isAdmin === true ? "text-left" : "d-none"}>
            <p>Information for Administration:</p>
            {auth ? <pre>API key current user: {auth}</pre> : '...'}
            {IP ? <pre>IP Adress: {JSON.stringify(IP, null, 2)}</pre> : ''}
            {DD ? <pre>OS: {DD}</pre> : ''}
            {isAdmin ? <pre>Is Admin: {JSON.stringify(isAdmin, null, 2)}</pre> : ''}
            <hr />
            <p><b>Detect User Agent:</b> {window.navigator.userAgent.toLowerCase()}</p>
        </Col>
        </>
    )
}