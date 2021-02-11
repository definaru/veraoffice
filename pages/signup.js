import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Default } from '../components/layout/Default'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, FormGroup, Label, CustomInput, FormFeedback } from 'reactstrap'
import Loading from '../components/Loading'
import styles from '../css/signup.module.css'
import { GetUserDataAPI } from '../components/GetUserDataAPI'
import Fire from '../config/fire-config'
import { ToastAlert } from '../components/alert/ToastAlert'


export default function SignUp()
{

    const Name = 'Sign Up'
    const API = GetUserDataAPI()
    const router = useRouter()

    const [checked, setChecked] = useState(false)
    const [login, setLogin] = useState(null)
    const [apis, setApis] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errAuth, setErrAuth] = useState(null)

    const { register, errors, watch, handleSubmit } = useForm({
        criteriaMode: "all"
    })
    const watchFields = watch('agent_uuid')

    const firstLetterUpper = iText => {
        if (!iText) { return true }
        return iText[0].toUpperCase() === iText[0]
    }

    const onSubmit = data => {

        const RecordUser = checked === 'checked' ?
        {
            photo: apis[0].photo ? apis[0].photo : '/img/avatars/default_user.jpg',
            sex: apis[0].sex,
            rank: apis[0].rank,
            level: apis[0].level,
            api: apis[0].api,
            username: login.first_name,
            lastname: login.last_name,
            phone: apis[0].phone,
            email: login.email,
            languages: apis[0].languages,
            license_number: login.licence,
            status: "0",
            descript: apis[0].descript,
            permission: 'User',
            login: '0'
        } :
        {
            photo: "/img/avatars/default_user.jpg",
            sex: "no data",
            rank: "no data",
            level: "no data",
            api: "no data",
            username: data.first_name,
            lastname: data.last_name,
            phone: "no data",
            email: data.email,
            languages: "no data",
            license_number: data.licence,
            status: "0",
            descript: "",
            permission: 'User',
            login: '0'
        }

        setLogin(data)
        //alert(JSON.stringify(data))
        if(data) {
            Fire.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then(function(result) {

                    console.log('My result:', result.user.uid)
                    //console.log('My result:', result)

                    Fire.database().ref('users/' + result.user.uid).set(RecordUser, 
                        (error) => {
                            if (error) {
                                console.log('Error DataBase: ', error)
                            } else {
                                setLoading(true) 
                            }
                        })  

                    Fire.auth().currentUser.updateProfile({
                        displayName: data.first_name + ' '+ data.last_name,
                        photoURL: apis ? apis[0].photo : '/img/avatars/default_user.jpg'
                    })

                }).catch(function(err) {
                    setErrAuth(err)
                    console.log('My Error', errAuth)
                })

            window.sessionStorage.setItem('user', JSON.stringify(data)) 
            setTimeout(() => {router.push('/offer')}, 500)              
        }

    }

    const isValid = () => {
        if(errAuth) {
          return (errAuth.code === 'auth/user-not-found') ? false : true
        }
    }

    const dataAgentKey = e => {
        const value = e.target.value
        setApis({...API.filter(user => user.api.includes(value))})
    }


    //function changeEmailValue(e) 
    //{
    //    setEmail(e.target.value)
    //    window.localStorage.setItem('email', e.target.value)
    //}

    function changeChecked(e)
    {
        //console.log('State: ', e.target.checked)
        //console.log('Proccess', e.target.dataset.check)
        if (e.target.checked){
            e.target.removeAttribute('checked')
            setChecked('checked')
        } else {
            e.target.setAttribute('checked', '')
            setChecked(null)
        }
        
    }



    return (
        <Default title={Name}>
            <Row id="signup">
                <Col className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1">
                    <h3 className="text-center mt-5 pt-5">
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
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                        <FormGroup>
                            <div className="d-flex">
                                <div style={{width: '60%'}}>
                                    <p className="pt-3 m-0">
                                        Are you Vera Realty Agent? 
                                        <sup>*</sup>
                                    </p>
                                </div>
                                <div style={{width: '30%'}}>
                                    <div id="agents" className={styles.customSwitchRow+` p-0`}>
                                        <CustomInput 
                                            className="customSwitchLabel" 
                                            type="switch" 
                                            id="agent" 
                                            name="agent" 
                                            label="yes"
                                            data-check={checked}
                                            defaultChecked={checked == true ? 'checked' : null}
                                            onClick={changeChecked}
                                        />
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                        {
                            checked == 'checked' && 
                            <>
                                <FormGroup>
                                    <Label>UUID Number</Label>
                                    <input 
                                        type="text" 
                                        name="agent_uuid"
                                        className={
                                            errors.agent_uuid ? 
                                                "is-invalid form-control" : 
                                                "form-control"
                                        } 
                                        ref={register}
                                        defaultValue={watchFields}
                                        onChange={dataAgentKey}
                                    />
                                    {
                                        errors.agent_uuid &&
                                        <>
                                            {errors?.agent_uuid?.types?.required && <FormFeedback>UUID Number is required</FormFeedback>}
                                        </>
                                    }
                                </FormGroup>                            
                            </>
                        }
                        <FormGroup className={checked == 'checked' ? "d-none" : ""}>
                            <Label>First Name</Label>
                            <input
                                type="text" 
                                name="first_name" 
                                autoComplete="off"
                                className={errors.first_name ? "is-invalid form-control" : "form-control"}
                                defaultValue={apis === null ? '' : apis[0].username}
                                ref={register({
                                    required: true, 
                                    maxLength: 30, 
                                    validate: { firstLetterUpper }
                                })}
                            />
                            {
                                errors.first_name &&
                                <>
                                    {errors?.first_name?.types?.required && <FormFeedback>First name is required</FormFeedback>}
                                    {errors?.first_name?.types?.maxLength && <FormFeedback>Max length of first name is 30 characters!</FormFeedback>}
                                    {errors?.first_name?.types?.firstLetterUpper && <FormFeedback>First letter should be uppercased!</FormFeedback>}                  
                                </>
                            }
                        </FormGroup>
                        <FormGroup className={checked == 'checked' ? "d-none" : ""}>
                            <Label>Last Name</Label>
                            <input 
                                type="text" 
                                name="last_name" 
                                autoComplete="off"
                                className={errors.last_name ? "is-invalid form-control" : "form-control"}
                                defaultValue={apis === null ? '' : apis[0].lastname}
                                ref={register({
                                    required: true, 
                                    maxLength: 30, 
                                    validate: { firstLetterUpper }
                                })}
                            />
                            {
                                errors.last_name &&
                                <>
                                    {errors?.last_name?.types?.required && <FormFeedback>Last name is required</FormFeedback>}
                                    {errors?.last_name?.types?.maxLength && <FormFeedback>Max length of last name is 30 characters!</FormFeedback>}
                                    {errors?.last_name?.types?.firstLetterUpper && <FormFeedback>First letter should be uppercased!</FormFeedback>}                  
                                </>
                            }
                        </FormGroup>
                        <FormGroup className={checked == 'checked' ? "d-none" : ""}>
                            <Label>Email</Label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    autoComplete="off"
                                    className={errors.email ? "is-invalid form-control" : "form-control"}
                                    defaultValue={apis === null ? '' : apis[0].email}
                                    ref={
                                        register(
                                        {
                                            required: true, 
                                            pattern: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                            validate: {isValid}
                                        })} 
                                />
                                {
                                    errors.email &&
                                    <>
                                        {errors?.email?.types?.required && <FormFeedback>Email is required</FormFeedback>}
                                        {errors?.email?.types?.pattern && <FormFeedback>This address is not an email</FormFeedback>}
                                        {errors?.email?.types?.isValid && <FormFeedback>This email address is already taken</FormFeedback>}                  
                                    </>
                                }
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <input 
                                type="password" 
                                name="password" 
                                className={errors.password ? "is-invalid form-control" : "form-control"}
                                ref={register({
                                    required: true, 
                                    maxLength: 30, 
                                    minLength: 8, 
                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-.\/:;<=>?\\@[\]^_`{|}~]).{6,30}$/
                                })}
                            />
                            {
                                errors.password &&
                                <>
                                    {errors?.password?.types?.required && <FormFeedback>Password is required</FormFeedback>}
                                    {errors?.password?.types?.maxLength && <FormFeedback>Max length of password is 30 characters!</FormFeedback>}
                                    {errors?.password?.types?.minLength && <FormFeedback>Min length of password is 8 characters!</FormFeedback>}
                                    {
                                        errors?.password?.types?.pattern && 
                                        <FormFeedback>
                                            Password require a lowercase letter, 
                                            require an uppercase letter, 
                                            require a digit, 
                                            require a special character
                                        </FormFeedback>
                                    }
                                </>
                            }
                        </FormGroup>
                        <FormGroup className={checked == 'checked' ? "d-none" : ""}>
                            <Label>Licence Number</Label>
                            <input 
                                type="number" 
                                name="licence" 
                                className={errors.licence ? "is-invalid form-control" : "form-control"}
                                defaultValue={apis === null? '' : apis[0].license_number}
                                ref={register({
                                    required: true,
                                    minLength: 7, 
                                    pattern: /^[0-9]+$/
                                })}
                            />
                            {
                                errors.licence &&
                                <>
                                    {errors?.licence?.types?.required && <FormFeedback>Licence is required</FormFeedback>}
                                    {errors?.licence?.types?.minLength && <FormFeedback>Min length of licence is 7 characters!</FormFeedback>}
                                    {errors?.licence?.types?.pattern && <FormFeedback>License can only contain numbers</FormFeedback>}
                                </>
                            }
                        </FormGroup>    

                        <Button type="submit" color="vera" className="btn-block mb-5 mt-5">
                            {loading ? <Loading /> : Name}
                        </Button>
                    </form>
                    

                    {/*
                        {errAuth ? <pre>{JSON.stringify(errAuth, null, 2)}</pre> : ''}
                        {apis ? <pre>{JSON.stringify(apis, null, 2)}</pre> : ''}
                        <pre>{JSON.stringify(watchFields, null, 2)}</pre>
                        {RecordUser ? <pre>{JSON.stringify(RecordUser, null, 2)}</pre> : ''}
                        {checked ? <pre>{JSON.stringify(checked, null, 2)}</pre> : ''}
                    */}
                    
                    
                    
                </Col>
            </Row>
            {errAuth ? <ToastAlert header="Error" text={errAuth.message} color="danger" /> : ''}
            <style global jsx>{`
                #agents {cursor: pointer;}
                .custom-control-label {cursor: pointer;}
                #agents .custom-switch 
                .custom-control-label::after {
                    top: calc(0.25rem + 2px) !important;
                }
                #agents .custom-control-input:checked ~ 
                .custom-control-label::before {
                    color: #fff !important;
                    border-color: #fff !important;
                    background-color: #4054b2 !important;
                }
            `}</style>
        </Default>
    )
}