import React, { useState } from 'react'
import { Toast, ToastBody, ToastHeader } from 'reactstrap'

export function ToastAlert({ header, text, color = 'dark', headerColor = 'text-white', textColor = 'text-light' })
{

    const [show, setShow] = useState(true)
    const toggle = () => setShow(false)

    return (
        <Toast className="rounded pos-right-bottom" style={{width: '300px'}} isOpen={show} onClick={() => setShow(false)}>
            <ToastHeader className={`bg-${color} border-0`} toggle={toggle}>
                <strong className={`font-weight-bold ${headerColor}`}>
                    {header}
                </strong>
            </ToastHeader>
            <ToastBody className={`bg-${color} ${textColor} rounded-bottom pt-0`}>
                {text}
            </ToastBody>
        </Toast>
    )
}