export function LoadAvatarRow({avatar = '', name = '', last_name = ''})
{

    const Color = Math.floor(Math.random()*16777215).toString(16)

    if(avatar === '') {
        return (
            <span 
                className="rounded-circle border mr-3 u-avatar--xs d-block text-center pt-1"
                style={{background: `#${Color}`, color: '#fff'}}
            >
                {`${name[0]}${last_name[0]}`}
            </span>
        )
    }
    return (
        <>
            <img src={avatar} className="rounded-circle border mr-3 u-avatar--xs d-block text-center" />
        </>
    )
}