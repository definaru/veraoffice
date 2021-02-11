import { FaCheck } from "react-icons/fa"

export function ProgressBar({progress, work = true})
{

    function getColorProgress(progress)
    {
        let color
        if(progress <= 10) {
            color = 'danger'
        } else if(progress <= 30) {
            color = 'warning'
        } else if(progress <= 60) {
            color = 'info'
        } else if(progress <= 99) {
            color = 'success'
        }
        return color
    }

    if(progress == 100) {
        return <span className="badge badge-success"><FaCheck /> done</span>
    }
    return ( 
        <div className="progress" style={{height: '6px', borderRadius: '3px'}}>
            <div 
                className={`progress-bar bg-${work ? getColorProgress(progress) : 'vera'}`}
                role="progressbar" 
                style={{width: `${progress}%`, borderRadius: '3px'}} 
                aria-valuenow={progress} 
                aria-valuemin="0" 
                aria-valuemax="100">
            </div>
        </div>
    )
}