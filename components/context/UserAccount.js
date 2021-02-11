import { useState, useEffect } from 'react'
import Fire from '../../config/fire-config'

export default function Account()
{
    const [user, setUser] = useState('')
    const [city, setCity] = useState('')
    const previousUser = Fire.auth().currentUser
    

    const info = {
        light: {
            theme: "light-theme"
        },
        dark: {
            theme: "dark-theme"
        },
        user: {
            login: user,
            currently: previousUser,
            session: city,
            role: isAdmin()
        }
    }

    function isAdmin()
    {
        const permission = user ? user.permission : 'User'
        return permission == 'Admin' ? true : false
    } 

    useEffect(() => {

        window.sessionStorage.setItem('access', JSON.stringify(user))
        setCity(window.sessionStorage.getItem('location'))
        Fire.auth().onAuthStateChanged(function(user) {
            
            if(user !== null) {
                //console.log('Сейчас:', user.uid)
                //window.sessionStorage.getItem('access')
                Fire.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
                    setUser(snapshot.val())
                })  
            }
            
        })

    }, [])

    return info
}