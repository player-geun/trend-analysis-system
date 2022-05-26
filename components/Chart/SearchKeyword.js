// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Graph from '../Graph/graph';
import Router from 'next/router';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function SearchKeyword(props) {

  
/*조회일자*/
let month = new Date().getMonth();
const [startDate,setStartDate] = useState(new Date(new Date().setMonth(month - 1))); //시작 날짜 default : 한 달전
const [endDate,setEndDate] = useState(new Date());

/*키워드*/
  const [state1,SetState1] = useState('');
  const [state2,SetState2] = useState('');
  const [state3,SetState3] = useState('');
  const [state4,SetState4] = useState('');
  const [state5,SetState5] = useState('');
  const stateArr = [state1,state2,state3,state4,state5];

 //'키워드 검색' handler
  const handleKeyword1 = (e) => {
    console.log(e.target.value)
    SetState1(e.target.value)
  }
  const handleKeyword2 = (e) => {
    console.log(e.target.value)
    SetState2(e.target.value)
  }
  const handleKeyword3 = (e) => {
    console.log(e.target.value)
    SetState3(e.target.value)
  }
  const handleKeyword4 = (e) => {
    console.log(e.target.value)
    SetState4(e.target.value)
  }
  const handleKeyword5 = (e) => {
    console.log(e.target.value)
    SetState5(e.target.value)
  }



/*구분*/
  const [classification,SetClassification] = useState("1");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "2"){
      const targetPage = '/ChartView_A';
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
    const postAPI = async() => {

      const finalStateArr = stateArr.filter((x) => x !== '');
      let words= finalStateArr.join();
      
      let selectedStartDate = [startDate.getFullYear(), (startDate.getMonth()+1) < 10 ? "0" + (startDate.getMonth()+1) : (startDate.getMonth()+1), (startDate.getDate()) < 10 ? "0" + (startDate.getDate()) : (startDate.getDate())];
      let selectedEndDate = [endDate.getFullYear(),(endDate.getMonth()+1) < 10 ? "0" + (endDate.getMonth()+1) : (endDate.getMonth()+1), (endDate.getDate()) < 10 ? "0" + (endDate.getDate()) : (endDate.getDate())];
      let finalStartDate = selectedStartDate[0]+"/"+selectedStartDate[1]+"/"+selectedStartDate[2];
      let finalEndDate = selectedEndDate[0]+"/"+selectedEndDate[1]+"/"+selectedEndDate[2];

      let url = "/api/chart/keywords?"+"startDate="+finalStartDate+"&endDate="+finalEndDate+"&words="+words;

      console.log("url:"+url)

      const searchData = await axios.get(url); //api 호출 데이터

      //인덱스 할당
      var idxArr = new Array(); 
      var searchDataList = new Array();
      var chartDataList = new Array();
      for (var i = 0; i < finalStateArr.length; i++) {
        idxArr[i] = searchData.data.result.searchKeywordInfos.findIndex(x => x.keyword === stateArr[i]);
        searchDataList[i] = searchData.data.result.searchKeywordInfos[idxArr[i]].keywordAmountArray;
        chartDataList[i] = getConvertToXY(searchDataList[i]);
      }

     var ColorList = ['red','blue','green','black','yellow'] // 차트 선 색

     var FinalChartDataList = new Array();
     for (var i = 0; i < finalStateArr.length; i++) {
     
       chartDataList[i] = getConvertToXY(searchDataList[i]);

       FinalChartDataList[i]= {
        type: 'line',
        label: finalStateArr[i], 
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
          top : 165px;
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
          top : 171px;
          left : 350px;
          margin: 0.5rem;
          font-size : 18px;

        }
      
        `}</style>


      </div>
  </div>
  <br />


  <div className = "mx-3"> 
  <form className="form-inline" >
    <a> 키워드 </a>
    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 1" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state1.name} //입력되는 값.
           onChange={handleKeyword1}/>
    
    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 2" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state2.name} //입력되는 값.
           onChange={handleKeyword2}/>

    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 3" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state3.name} //입력되는 값.
           onChange={handleKeyword3}/>

    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 4" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state4.name} //입력되는 값.
           onChange={handleKeyword4}/>

    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 5" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state5.name} //입력되는 값.
           onChange={handleKeyword5}/>
 
    <button type = "button" className="btn btn-outline-primary my-2 my-sm-0" 
            style={{ width : '100px', height : '50px',  fontSize : '20px' }}
            onClick={postAPI}>검색</button>
  </form>
  </div>
  <br />



  <div className="py-2 my-5 ">
    <Graph data = {graphData} />
  </div>

</div>

 
    );
  
}

export default SearchKeyword;