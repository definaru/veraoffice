import { useState, useEffect } from 'react'
import axios from 'axios'


export function DefinaIPAdress()
{
    const [data, setData] = useState(null)
    const [list, setList] = useState(null)

    useEffect(() => {
        axios.get('https://5guys.ru/v1/data').then(res => setData(res))
        if(data !== null) {
            axios.get(`https://ipapi.co/${data.data.IP}/json/`).then(res => setList(res))
        }
        
        //console.log('IP Adress: ', data)
        //const List = async () => {
        //    if(data !== null) {
        //        await axios.get(`https://ipapi.co/${data.data.IP}/json/`).then(res => setList(res))
        //    }
        //}
        //List()
    }, []) // data, list

    return list
}