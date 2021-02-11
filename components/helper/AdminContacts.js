import React from 'react'
import Skeleton from 'react-loading-skeleton'

export function LoadTable()
{
    return (
        <tr>
            <td><Skeleton width={35} height={35} /></td> 
            <td style={{width: '60%'}}><Skeleton variant="text" width={350} /></td> 
            <td className="text-right"><Skeleton width={106} height={38} /></td>
            <td className="pl-0"><Skeleton width={42} height={40} /></td>
            <td className="pl-0"><Skeleton width={42} height={40} /></td>
        </tr>
    )
}