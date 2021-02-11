import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaRegCheckCircle } from 'react-icons/fa'
import { Alert, Media } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { ToastAlert } from '../components/alert/ToastAlert'


export default function Send(props)
{

    const router = useRouter()
    const [close, setClose] = useState(true)
    const [errorCode, setErrorCode] = useState(null)
    const [currentCode, setCurrentCode] = useState(null)
    const { register, watch } = useForm({
        criteriaMode: "all"
    })
    const GetActive = watch("active")
    const TotalNum = GetActive ? GetActive.length : ''

    useEffect(() => {
        setTimeout(() => setClose(false), 10000)
        setCurrentCode(window.localStorage.getItem('gitApp'))
        if(TotalNum <= 4) {
            if(GetActive === currentCode) {
                setErrorCode('')
                setTimeout( () => { router.push('/confirm') }, 250 ) 
            } else {
                setErrorCode({header: 'Error', text: 'Your code reset password is not correct'})
            }
        }
    }, [GetActive])

    return (
        <>
        <Alert color="success" className={close === false ? "d-none" : "mt-4"}>
            <Media>
                <Media left className="mr-3">
                    <FaRegCheckCircle style={{fontSize: '67px', opacity: '0.4'}} />
                </Media>
                <Media body>
                    <strong className="text-white mt-2 btn-block">Successfully!</strong>
                    <p className="text-light m-0">
                        {props.name}, {props.email}
                    </p>
                </Media>
            </Media>
        </Alert>
        <form>
            <input 
                type="text" 
                name="active"
                className="form-control text-center mt-5" 
                placeholder="Insert here your code from e-mail" 
                defaultValue={GetActive}
                autoComplete="off"
                ref={register}
            />
            {/*
                <p>{GetActive}</p>  
                <p>{currentCode}</p>      
                <u>{TotalNum}</u>             
            */}
   
        </form>
        {errorCode ? <ToastAlert header={errorCode.header} text={errorCode.text} color="danger" /> : ''}
        </>
    )
}