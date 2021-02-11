import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document 
{
	render() {
		return (
		<Html lang="en" className="no-js">
			<Head>
				<meta charSet="utf-8"/>
				<link href="/img/favicon.png" rel="icon" />
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
			</Head>
			<body className="desktop-mode">
				<Main />
				<NextScript />
				<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
				<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
			</body>
		</Html>
		)
	}
}