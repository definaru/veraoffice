import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Default } from '../components/layout/Default'
import { FaArrowLeft, FaCompass } from 'react-icons/fa'
import Errors from './_error.tsx'
import Fire from '../config/fire-config'

// страница с ошибкой

export default function ErrorPage() 
{

	const Title = 'Error 404'
	const [login, setLogin] = useState(null)

    useEffect(() => {

        Fire.auth().onAuthStateChanged(function(user) {
            //window.user = user

            if(user !== null) {
				//console.log('Currently state: ', user)
				setLogin(true) // '/dashboard'
            } else {
				//console.log('Currently no state: ', user)
				setLogin(false) // '/login'
            }
        })

	}, [])
	
	return (
		<Default title={Title}>
			<section style={{paddingTop: "50px"}}>
				<div className="col-md-6 offset-md-3"> 
					<h1><FaCompass /></h1>
					
					<h2>{Title}</h2>
					<strong>No such page ... Possible reasons:</strong>
					<hr />
					<div className="text-left mb-5 btn-block">
						<ol>
							<li>The page has been removed, or moved to another location.</li>
							<li>The url is not correct</li>
							<li><Errors /></li>
						</ol>				
					</div>
					{
						login === true ? 
							<Link href='/dashboard'>
								<a className="btn btn-outline-dark font-weight-bold">
									&#160;<FaArrowLeft />&#160;Go Home&#160;
								</a>
							</Link> :
							<Link href='/login'>
								<a className="btn btn-outline-dark font-weight-bold">
									&#160;<FaArrowLeft />&#160;Come back&#160;
								</a>
							</Link>
					}
					
					{/*
						{login ? <pre>{JSON.stringify(login, null, 2)}</pre> : <p>...</p>}
					*/}
								
				</div>
			</section>
			<style jsx>{`
				section {
					padding:150px 0;
					text-align:center;
				}
				ol {
					color: #7b7f84;
				}
				h1 {
					font-size: 6.5rem;
					opacity: 0.1;
					margin-bottom: 15px;
				}
				h2 {
					color: #bd2130;
					margin-bottom: 15px;
				}
		  `}</style>		
		</Default>
	)
}