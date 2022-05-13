import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import ChartViewButton from '../components/Button/ChartViewButton'
import KeywordHandleButton from '../components/Button/KeywordHandleButton'
import KeywordModifyButton from '../components/Button/KeywordModifyButton'
import KeywordRegStatButton from '../components/Button/KeywordRegStatButton'
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  return (

  
    <div>

      <h1 class = "mx-4 my-4" style={{ fontFamily : 'NanumSquare' }}> 트렌드 분석 시스템 </h1>
      <br></br>


      <div className="px-4 py-2 my-5 ">
          <ChartViewButton></ChartViewButton>
      </div>

      <br></br>

      <div className="px-4 py-2 my-5 ">
          <KeywordHandleButton></KeywordHandleButton>
          <br></br>
          <KeywordModifyButton></KeywordModifyButton>
          <br></br>
          <KeywordRegStatButton></KeywordRegStatButton>
      </div>
   
      

  
    </div>
  )
}
