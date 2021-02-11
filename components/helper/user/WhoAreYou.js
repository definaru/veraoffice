import React, { useState } from 'react'
import Link from 'next/link'
import Fire from '../../../config/fire-config'

export function WhoAreYou(props)
{
    const [user, setUser] = useState(null)

    if(props !== '') { 
        Fire.database().ref('users/' + props.id).once('value').then(function(snapshot) {
            setUser(snapshot.val())
        })
    }


    if(!user) {
        return <p>Loading...</p>
    }
    return (
        <Link href="/admin/user/[id]" as={`/admin/user/${props.id}`}>
            <a className="d-block" style={{width: '190px'}}>
                <div className="d-flex">
                    <div className="mr-2">
                        <div className="rounded-circle border border-light avatar-bg" style={{background: `url(${user.photo}) no-repeat`}} />
                    </div>
                    <div className="flex-grow-1 mt-1">
                        <p className="m-0">{`${user.username} ${user.lastname}`}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}