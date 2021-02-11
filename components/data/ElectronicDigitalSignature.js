import React, { useState } from 'react'
import Link from 'next/link'
import { AiFillEdit, AiOutlineClose } from 'react-icons/ai'


export default function ElectronicDigitalSignature()
{
    const [open, setOpen] = useState(false)

    const Close = () => {
        return <div>
                    <h4 className="text-vera">What is it and what is it for?</h4>
                    <p>EDS is needed in order to attach it to documents and contracts. 
                    <br />You sign here once, and apply your signature multiple times wherever needed. 
                    <br />It also confirms the authenticity of your transaction, 
                    <br />since no one else can view or use it.</p>
                    <hr/>
                    <button onClick={() => setOpen(true)} className="btn btn-primary mr-2 cp">
                        &#160;&#160;<AiFillEdit /> Create Signature&#160;&#160;
                    </button>
                    <Link href="/dashboard/settings">
                        <a className="btn btn-outline-dark">
                            &#160;&#160;<AiOutlineClose /> Cancel&#160;&#160;
                        </a>
                    </Link>
                </div>        
    }
    

    const Open = () => {
        return <div>
            <button onClick={() => setOpen(false)} className="btn btn-outline-dark">
                &#160;&#160;<AiOutlineClose /> Cancel&#160;&#160;
            </button>        
        </div>
    }


    return (
        <>
            {open ? <Open /> : <Close />}
        </>
    )
}