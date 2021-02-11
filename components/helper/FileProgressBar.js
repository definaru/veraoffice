import React, { useEffect } from 'react'
import Fire from '../../config/fire-config'
import { ProgressBar } from './ProgressBar'
import useLoaduserphoto from './useLoaduserphoto'


const FileProgressBar = ({file, setFile, id}) => {
    const { progress, url } = useLoaduserphoto({file, id})
    useEffect(() => {
        if(url) {
            setFile(null)
            Fire.database().ref('users/' + id).update({
                photo: url
            })
            Fire.auth().currentUser.updateProfile({
                photoURL: url
            })
        }
    }, [url, setFile, id])
    return (<ProgressBar progress={progress} work={false} />)
}

export default FileProgressBar