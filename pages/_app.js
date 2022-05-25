import '../styles/globals.css'
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
      <title>몽고 디비 사용해보기</title>
      </Head>
   
    <Component{...pageProps}/>
    </>
  )
}

export default MyApp
