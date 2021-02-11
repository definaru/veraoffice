import Fire from '../../config/fire-config'

export function Auth()
{
    const previousUser = Fire.auth().currentUser
    return previousUser
}