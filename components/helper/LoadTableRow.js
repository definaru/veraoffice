import Skeleton from 'react-loading-skeleton'
import { Label, Media } from 'reactstrap'

export function LoadTableRow()
{
    return (
        <tr>
            <td style={{width: '50px'}}>
                <Label className="btn m-0 p-0">
                    <Skeleton variant="rect" width={15} height={15} />
                </Label>
            </td>
            <td style={{width: '200px'}} className="p-1">
                <Media>
                    <Media left>
                        <Skeleton className="rounded-circle mr-3" variant="circle" width={34} height={34} /> 
                    </Media>
                    <Media body>
                        <Skeleton variant="text" style={{height: '10px', width: '100px', display: 'block', marginTop: '14px'}} />
                    </Media>
                </Media>
            </td>
            <td style={{width: '135px'}} className="p-1">
                <Skeleton variant="text" style={{height: '15px', width: '80px', display: 'block', marginTop: '7px'}} />
            </td>
            <td style={{width: '190px'}} className="p-1">
                <Skeleton variant="text" style={{height: '15px', width: '50px', display: 'block', marginTop: '7px'}} />
            </td>            
            <td style={{width: '95px'}} className="p-1">
                <Skeleton variant="text" style={{height: '15px', width: '50%', display: 'block', marginTop: '7px'}} />
            </td>
            <td style={{width: '245px'}} className="p-1">
                <Skeleton variant="text" style={{height: '10px', width: '50%', display: 'block', marginTop: '7px'}} />
                <Skeleton variant="text" style={{height: '10px', width: '30%', display: 'block', marginTop: '7px'}} />
            </td>
            <td className="p-1">
                <div className="d-flex justify-content-end">
                    <div className="pr-3">
                        <Skeleton className="rounded-circle" variant="circle" width={15} height={15} />
                    </div>
                    <div className="pr-3">
                        <Skeleton className="rounded-circle" variant="circle" width={15} height={15} />
                    </div>
                    <div className="pr-3">
                        <Skeleton className="rounded-circle" variant="circle" width={15} height={15} />
                    </div>
                </div>
            </td>
        </tr>
    )
}