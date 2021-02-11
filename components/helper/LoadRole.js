export function LoadRole(props)
{

    if(props.roles == 1) { 
        return 'Admin'
    } else if (props.roles == 2) {
        return 'Broker'
    } else if (props.roles == 5) {
        return 'Agent'
    } else {
        return 'undefined'
    }

    
}