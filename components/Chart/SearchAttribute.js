// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Graph from '../Graph/graph';
import Router from 'next/router';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function SearchAttribute(props) {

  
/*조회일자*/
let month = new Date().getMonth();
const [startDate,setStartDate] = useState(new Date(new Date().setMonth(month - 1))); //시작 날짜 default : 한 달전
const [endDate,setEndDate] = useState(new Date());

/*키워드*/
  const [state1,SetState1] = useState('');

  const stateArr = [state1];

 //'키워드 검색' handler
  const handleKeyword1 = (e) => {
    console.log(e.target.value)
    SetState1(e.target.value)
  }


/*구분*/
  const [classification,SetClassification] = useState("2");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "1"){
      const targetPage = '/ChartView_K';
      Router.push(targetPage);
    }
  }


  
/* 차트 */
    const [graphData, setGraphData] = useState({datasets : [ { type: '', label: '', borderColor: '',borderWidth: 0, data: [] } ] } )

    //데이터 변환
    const getConvertToXY = (array) =>{
        var resArr = [];
    
        array.forEach(element => {
          resArr.push({x: element.period, y: element.amount});
        });
    
        return resArr;
      }
  

/*검색 버튼 클릭 api */
const searchAPI = async() => {

  let selectedStartDate = [startDate.getFullYear(), (startDate.getMonth()+1) < 10 ? "0" + (startDate.getMonth()+1) : (startDate.getMonth()+1), (startDate.getDate()) < 10 ? "0" + (startDate.getDate()) : (startDate.getDate())];
  let selectedEndDate = [endDate.getFullYear(),(endDate.getMonth()+1) < 10 ? "0" + (endDate.getMonth()+1) : (endDate.getMonth()+1), (endDate.getDate()) < 10 ? "0" + (endDate.getDate()) : (endDate.getDate())];
  let finalStartDate = selectedStartDate[0]+"/"+selectedStartDate[1]+"/"+selectedStartDate[2];
  let finalEndDate = selectedEndDate[0]+"/"+selectedEndDate[1]+"/"+selectedEndDate[2];
  let url = "http://localhost:3000/api/chart/category?startDate="+finalStartDate+"&endDate="+finalEndDate+"&categoryName="+state1;

  console.log("url:"+ url)

  const searchData = await axios.get(url); //api 호출 데이터
  console.log(searchData);


 var searchDataList = new Array();
 var chartDataList = new Array();
 var ColorList = ['red','blue','green','orange','yellow'] // 차트 선 색


var FinalChartDataList = new Array();
for (var i = 0; i < searchData.data.result.searchKeywordInfos.length; i++) {

  chartDataList[i] = getConvertToXY(searchData.data.result.searchKeywordInfos[i].keywordAmountArray);

  FinalChartDataList[i]= {
   type: 'line',
   label: searchData.data.result.searchKeywordInfos[i].keyword, 
   borderColor: ColorList[i],
   borderWidth: 2,
   data: chartDataList[i]
 }
}

 setGraphData(
   {
     datasets: FinalChartDataList
   }
 );

}


return (
<div style={{ fontFamily : 'NanumSquare' }}>
  <div className = "mx-3">
      <a className = "mx-0"> 구분 </a>
      <input className = "mx-3"
        type = "radio"
        value = "1"
        checked = {classification === "1"}
        onChange = {handleClickRadioButton}
        />
      <label>
        1. 키워드
      </label>
      <input className = "mx-3"
        type = "radio"
        value = "2"
        checked = {classification === "2"}
        onChange = {handleClickRadioButton}
        />
      <label>
        2. 키워드 속성
      </label>
  </div>
  <br />

  <div className = "mx-3">
  <a> 조회일자  </a>
      <div className = "container">
 
      <DatePicker
        dateFormat = "yyyy/MM/dd"
        selected = {startDate}
        onChange = {date => setStartDate(date)}
        selectsStart
        startDate = {startDate}
        endDate = {endDate} />
        
        <style jsx>{`
        .container {
          position : relative;
          top : -38px;
          left : 70px;
          display : block;
          margin: 0.5rem;
          font-size : 18px;

        }
      
        `}</style>

        </div>

        <div className = "container">
          <a>~</a>
          <style jsx>{`
        .container {
          display : block;
          position : absolute;
          top : 150px;
          left : 325px;
          margin: 0.5rem;
          font-size : 30px;
        }
        `}</style>
        </div>
    

  <div className = "container">

      <DatePicker 
        dateFormat = "yyyy/MM/dd"
        selected = {endDate}
        onChange = {date => setEndDate(date)}
        selectsEnd
        endDate = {endDate}
        minDate = {startDate} />
        

        <style jsx>{`
        .container {
          display : block;
          position : absolute;
          top : 155px;
          left : 350px;
          margin: 0.5rem;
          font-size : 19px;

        }
      
        `}</style>


      </div>
  </div>
  <br />


  <div className = "mx-3"> 
  <form className="form-inline" >
    <a> 키워드 속성</a>
    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="#키워드 속성" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state1.name} //입력되는 값.
           onChange={handleKeyword1}/>
    

    <button type = "button" className="btn btn-outline-primary my-2 my-sm-0" 
            style={{ width : '100px', height : '50px',  fontSize : '20px' }}
            onClick={searchAPI}>검색</button>
  </form>
  </div>
  <br />



  <div className="py-2 my-5 ">
    <Graph data = {graphData} />
  </div>

</div>

 
    );
      
}

export default SearchAttribute;