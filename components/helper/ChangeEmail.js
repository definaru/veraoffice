import Fire from '../../config/fire-config'

export function ChangeEmail(currentPassword)
{
    const reauthenticate = () => {
        let user = Fire.auth().currentUser
        let cred = Fire.auth.EmailAuthProvider.credential(user.email, currentPassword)
        console.log(cred)
        return user.reauthenticateWithCredential(cred)
    }
    console.log(reauthenticate())
    return reauthenticate()
}