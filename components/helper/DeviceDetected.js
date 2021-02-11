import React, { useState, useEffect } from 'react'

export function DeviceDetected()
{

    const [platforma, setPlatforma] = useState('')

    const userDeviceArray = [
        {device: 'Android', platform: /Android/},
        {device: 'iPhone', platform: /iPhone/},
        {device: 'iPad', platform: /iPad/},
        {device: 'Symbian', platform: /Symbian/},
        {device: 'Windows Phone', platform: /Windows Phone/},
        {device: 'Tablet OS', platform: /Tablet OS/},
        {device: 'Linux', platform: /Linux/},
        {device: 'Windows', platform: /Windows NT/},
        {device: 'Macintosh', platform: /Macintosh/}
    ]

    function getPlatform() {
        for (var i in userDeviceArray) {
            if (userDeviceArray[i].platform.test(platforma)) {
                return userDeviceArray[i].device
            }
        }
        return 'Unknown platform' + platforma
    }

    useEffect(() => {
        const platform = navigator.userAgent
        setPlatforma(platform)
    }, )

    return getPlatform()
}