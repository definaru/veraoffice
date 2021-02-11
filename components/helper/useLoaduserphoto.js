import { useState, useEffect } from 'react'
import Fire from '../../config/fire-config'

const useLoaduserphoto = ({file, id}) => {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {

        async function f() {
            try {
                const storageRef = Fire.storage().ref()
                let metadata = {contentType: file.type}
                let uploadTask = storageRef.child('avatar/' + id + '/' + file.name).put(file, metadata)
                uploadTask.on('state_changed', function(snapshot) { 
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(progress)
                }, function(error) {
                    console.log(error)
                    setError(error)
                }, function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        setUrl(downloadURL)
                    })
                })
            } catch(err) {
                console.log('Firebase Error:', err)
            }
        }
        f()
    }, [file])
    return { progress, url, error}
}

export default useLoaduserphoto