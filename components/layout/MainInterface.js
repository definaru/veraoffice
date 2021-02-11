import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap'


export function MainInterface({ children, title = 'Vera Office' })
{

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
				<meta name="description" content="Search homes for Sale in Florida with Vera Realty. View our exclusive listings of houses for sale in Miami and connect with an agent today."/>
				<link rel="canonical" href="https://veraoffice.com" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Vera Office | Real Estate Listings, Homes For Sale in Miami, Home Values" /><meta property="og:description" content="Search homes for Sale in Florida with Vera Realty. View our exclusive listings of houses for sale in Miami and connect with an agent today." />
				<meta property="og:url" content="https://veraoffice.com" />
				<meta property="og:site_name" content="Vera Office" />
			</Head>
			<main>
				{ children }
			</main>
			<footer className="footer">
				<Container>
					<Row>
						<Col xs="6" md={{ size: 6 }} className="text-lg-left text-md-left text-left">
							<small>
								&copy; {new Date().getFullYear()} &#160; 
								<a href="https://defina.ru" className="text-light" target="_blank">Defina LLC</a>
							</small>
						</Col>
						<Col xs="6" md={{ size: 6 }} className="text-lg-right text-md-right text-right">
							<small>All right recerved</small>
						</Col>
					</Row>
				</Container>
				<style global jsx>{`
					div {
						font-family: 'Abel', sans-serif;
					}
				`}</style>
			</footer>
		</>
	)
}