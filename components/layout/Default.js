import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap'
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai'

// макет регистрации, авторизации, восстановление доступа и.т.д. 
// - для зарегистрированных и для незарегистрированных пользователей.

export function Default({ children, title = 'Oh! My God !' })
{
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main>
				<a onClick={() => window.history.back()} className="back_login cp">
					<AiOutlineArrowLeft />
				</a>
				<Link href="/">
					<a className="close_login"><AiOutlineClose /></a>
				</Link>
				<Container>
				  <Row>
					<Col sm="12" md={{ size: 12 }}>{ children }</Col>
				  </Row>
				</Container>
			</main>
			<style global jsx>{`
				p, s, u, i, b, span, small, strong, a, button {
					font-family: 'Abel', sans-serif;
				}
				.form-control {
					background-color: transparent !important;
					border-top: none !important;
					border-left: none !important;
					border-right: none !important;
					border-radius: 0 !important;
				}
				.form-control:focus {
					outline:none;
					box-shadow:none;
                    color: #495057;
                    border-color: #4064d7;
				}
				label {
					margin-bottom: 0;
					font-size: 12px;
					color: #4054b2;
				}
				.btn-vera {
					color: #ddd;
					background-color: #4054b2;
					border-color: #4054b2;
				}
				.btn-vera:hover {
					color: #fff;
					background-color: #1a2c67;
					border-color: #1a2c67;
				}
				.back_login {
					position: absolute;
					left: 0;
					padding: 3px 9px;
					font-size: 22px;
					color: #000;
					z-index: 100;
				}
				.close_login {
					position: absolute;
					right: 0;
					padding: 3px 9px;
					font-size: 22px;
					color: #000;
					z-index: 100;
				}
		  `}</style>
		</>
	)
}