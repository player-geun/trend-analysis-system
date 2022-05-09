import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import ChartViewButton from '../components/Button/ChartViewButton'
import DataSheetViewButton from '../components/Button/DataSheetViewButton'


export default function Home() {
  return (
  
    <div>

      <h1> 트렌드 분석 시스템 </h1>
      
      <br></br>
   
      <ChartViewButton></ChartViewButton>
      <br></br>
      <DataSheetViewButton></DataSheetViewButton>
      
  
    </div>
  )
}
