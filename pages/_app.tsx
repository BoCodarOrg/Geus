// import App from 'next/app'
import '../static/css/prism.css'

import GlobalStyle from '../src/styles/global';
import styled from 'styled-components';
import { Head } from 'next/document';

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid blue;
  margin-bottom: 50px;
  width: 100%;
  height: 100px;
`

function MyApp({ Component, pageProps }) {
  return (
  
    <div>
          <GlobalStyle />
          <Toolbar>
            <h1>Geus | Git Storm Server</h1>
          </Toolbar>
          <Component {...pageProps} />
    </div>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return {...appProps}
// }

export default MyApp