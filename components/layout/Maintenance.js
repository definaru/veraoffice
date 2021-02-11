import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap'

// макет страницы технического обслуживания или работ

export function Maintenance({ children, title = 'Sorry, Site is under maintenance' })
{
	return (
		<>
			<Head>
				<meta charSet="utf-8"/>
				<title>{title}</title>
			</Head>
			<main>
				<Container>
				  <Row>
					<Col sm="12" md={{ size: 12 }} className="pt-5">
						<h1 className="text-danger">{title}</h1>
						{ children }
					</Col>
				  </Row>
				</Container>
			</main>
		</>
	)
}