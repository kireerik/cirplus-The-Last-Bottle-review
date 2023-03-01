import Document from 'next/document'

import {ServerStyleSheet} from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps(context) {
		const sheet = new ServerStyleSheet()
		, originalRenderPage = context.renderPage

		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: Application =>
						properties =>
							sheet.collectStyles(
								<Application {...properties}/>
							)
				})

			const initialProps = await Document.getInitialProps(
				context
			)

			return {
				...initialProps
				, styles: [
					initialProps.styles, sheet.getStyleElement()
				]
			}
		} finally {
			sheet.seal()
		}
	}
}