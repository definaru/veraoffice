import React, { useState } from 'react'
//import Account from '../../components/context/UserAccount'
import { AdminInterface } from '../../components/layout/AdminInterface'
import { CRUD } from '../../components/setting/collectionCRUD'
//import Fire from '../../config/fire-config'

export default function lock(props)
{
    
    //const info = Account()
    const Title = 'Lock'
    //const { getCollectionAll } = CRUD()
    //const db = Fire.firestore()
    const [education, setEducation] = useState()

    // setEducation()

 

    //var docRef = db.collection("education").doc("ov7q0kwgmXMzyW9X78dc").delete()

    //docRef.then(function(doc) { // .get()
    //    if (doc.exists) {
    //        setEducation(doc.data())
    //        //console.log("Document data:", doc.data())
    //    } else {
    //        setEducation('No such document!')
    //        //console.log("No such document!")
    //    }
    //}).catch(function(error) {
    //    console.log("Error getting document:", error)
    //});
    
    //db.collection("education").add({
    //    first: "Ada",
    //    last: "Lovelace",
    //    born: 1815
    //})
    //.then(function(docRef) {
    //    console.log("Document written with ID: ", docRef.id);
    //})
    //.catch(function(error) {
    //    console.error("Error adding document: ", error);
    //})


    return (
        <AdminInterface title={Title}>
            {/*{info ? <pre>{JSON.stringify(info, null, 2)}</pre> : <p>...</p>}*/}
            {education ? <pre>{JSON.stringify(education, null, 2)}</pre> : 'Loading...'}
        </AdminInterface>
    )
}