import '../styles/globals.css'
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
      <title>트렌드 분석 시스템</title>
      </Head>
   
    <Component{...pageProps}/>
    </>
  )
}

export default MyApp
