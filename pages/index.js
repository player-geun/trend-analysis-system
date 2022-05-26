
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import ChartViewButton from '../components/Button/ChartViewButton'
import KeywordHandleButton from '../components/Button/KeywordHandleButton'
import KeywordModifyButton from '../components/Button/KeywordModifyButton'
import KeywordRegStatButton from '../components/Button/KeywordRegStatButton'
// import 'bootstrap/dist/css/bootstrap.css';
// import { auto, right } from '@popperjs/core'

export default function Home() {

  return (
    <div className='container'>
      <h1 style={{fontSize:'60px', fontFamily : 'NanumSquare' }}> 트렌드 분석 시스템 </h1>

      <div className='bt2'>
        <div className='bt'>
        <ChartViewButton/>
      </div>
        <div className='bt'>
      <KeywordHandleButton/>
      </div>
      <div className='bt'>
      <KeywordModifyButton/>
        </div>
        <div className='bt'>
        <KeywordRegStatButton/>
        </div>
        </div>

        
      
      <style jsx>{`
         
        .container {
          text-align:center;
          margin-top:200px;
          fontFamily : 'NanumSquare';

      
          
        }
        .bt{
          margin:auto;
          margin-top:210px;
          
        }
        .bt2{
          
          display:flex;

          margin:auto;
        }
      `}</style>

    </div>


  
  )
}
    