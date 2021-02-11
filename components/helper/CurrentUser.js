import { useState, useEffect } from 'react'
import Fire from '../../config/fire-config'

export function CurrentUser()
{
    const [online, setOnline] = useState(null)

    useEffect(() => {
        let currentsUser = Fire.auth().currentUser
        setOnline(currentsUser)
    }, [online])
    
    return online
}