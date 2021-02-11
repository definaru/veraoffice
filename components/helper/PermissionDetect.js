import { useState, useEffect } from 'react'
import Fire from '../../config/fire-config'


export function PermissionDetect()
{
    const [login, setLogin] = useState(null)
    const [keycart, setKeycart] = useState(null)

    function isAdmin()
    {
        const permission = login ? login.permission : 'User'
        const Resolve = permission == 'Admin' ? true : false
        return Resolve
    }

    useEffect(() => {

        if(window.localStorage.getItem('uid') !== null) {
            setKeycart(window.localStorage.getItem('uid'))
        } else {
            setKeycart(currentUser.uid)
        }

        if(keycart !== '') { 
            Fire.database().ref('users/' + keycart).once('value').then(function(snapshot) {
                setLogin(snapshot.val())
            })
        }

    }, [keycart, login])

    return isAdmin()
}