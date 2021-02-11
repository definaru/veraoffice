import React from 'react'
import { AdminInterface } from '../../components/layout/AdminInterface'
//import Dotloop from 'dotloop'

// dotloop
export default function Dotloops()
{

    const Title = 'Dotloop'
    //const Dotloop = require('dotloop')
    //const api = ''
    //new Dotloop('OWU4YWU1NmEtNDM4ZC00NTdlLWJmYjQtMjJlYTA1ZWMyZDQ1OjAwYTdmZDQxLWJlZjAtNGQwZS05NzYwLWI1MTU2ZmJjZGY0Zg==')
    //const firstProfile
    //const firstContact
    //const firstTransaction
    //const firstDocument

    //useEffect(() => {
	//	api.getProfiles()
	//	.then(function(profiles) {
    //        console.log('profiles', profiles)
	//		assert.equal(Array.isArray(profiles), true);
	//		assert.notEqual(profiles.length, 0);
	//		firstProfile = profiles.filter(function(profile) {
	//			return profile.profileType === 'COMPANY';
	//		})[0];
	//		done();
	//	})
	//	.catch(done);
    //}, [])

    return (
        <AdminInterface title={Title}>
            {/* api ? <pre>{JSON.stringify(api, null, 2)}</pre> : <p>...</p> */}
            <h1>Dotloop</h1>
        </AdminInterface>
    )
}