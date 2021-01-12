import React from 'react';
import Document, { Head, Main, Html, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

// import { Container } from './styles';

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () => (
        originalRenderPage({
          enhanceApp: App => (props) => sheet.collectStyles(<App {...props} />)
        })
      );

      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),

      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;700&display=swap" rel="stylesheet" />
          <title>Geus | Git Storm Server</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;