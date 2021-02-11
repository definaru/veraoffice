import { useState, useEffect } from 'react'
import { deviceType } from 'react-device-detect'
import browser from 'browser-detect'
import axios from 'axios'

export function BrowserDetect()
{

    const [data, setData] = useState(null)
    const [position, setPosition] = useState(null)
    const [div, setDiv] = useState(null)
    const [dataip, setDataip] = useState(null)
    //const [sity, setSity] = useState(null)
    

    useEffect(() => {
        axios.get('https://5guys.ru/v1/data').then(res => setDataip(res.data))
        //const ipAdress = () => {
        //    if(dataip) { // 
        //        () => axios.get(`https://ipapi.co/${dataip.IP}/json/`)
        //            .then(res => setSity(res.data))
        //            .catch((error) => {
        //                console.log('API Sity:', error)
        //            })
        //    }
        //}



        const result = browser()
        const width  = window.screen.width
        const height = window.screen.height
        const currencyTime = (new Date).getTime()

        if(width >= 1600) {
            setDiv('pc')
        } else if(width >= 1024 && width <= 1599) {
            setDiv('notebook')
        } else {
            setDiv(deviceType)
        }
        

        if(width > height) {
            setPosition('landscape') // горизонтально
        } else {
            setPosition('portrait') // вертикально
        }

        //window.addEventListener('load', ipAdress(), false)
        //if(data) {
        //    window.removeEventListener('load', ipAdress())
        //}

        setData({
            time: currencyTime,
            name: result.name,
            version: result.version.split('.')[0],
            mobile: result.mobile,
            os: result.os,
            screen_resolution: width + "x" + height,
            position: position,
            device: div,
            ip: dataip ? dataip.IP : '...'
        })

    }, [dataip, position])

    return data

} 