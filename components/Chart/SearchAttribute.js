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


      //데이터    
      let url = "/api/chart/keywords?words=강아지,고양이";

      const [graphData, setGraphData] = useState({datasets : [ { type: '', label: '', borderColor: '',borderWidth: 0, data: [] } ] } )
  
      //데이터 변환
      const getConvertToXY = (array) =>{
          var resArr = [];
      
          array.forEach(element => {
            resArr.push({x: element.period, y: element.amount});
          });
      
          return resArr;
        }
    
      const postAPI = async() => {
        const searchData = await axios.get("/api/chart/keywords?words=강아지,고양이");
        const searchDataList1 = searchData.data.result.searchKeywordInfos[0].keywordAmountArray;
        const searchDataList2 = searchData.data.result.searchKeywordInfos[1].keywordAmountArray;
        //const item = searchDataList1.map((i => (console.log(i.period, i.amount))));
     
       // let res1 = searchDataList.map((i => (i.amount)));
       // let res1title = searchDataList.map((i => (i.period)));
  
        
  
        let res1 = getConvertToXY(searchDataList1);
        let res2 = getConvertToXY(searchDataList2);
       
  
  
    
        setGraphData(
          {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            // labels 대신 아래와 같이 각각의 데이터의 x값을 개별적으로 전달해줍니다.
            datasets: [
              {
                type: 'line',
                label: "강아지", //동적 변경 필요
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                data: res1,
              },
              {
                  type: 'line',
                  label: "고양이", //동적 변경 필요
                  borderColor: 'red',
                  borderWidth: 2,
                  data: res2,
                },
            ]
          }
        );
      
  
      }



  /*키워드*/
  const [state,SetState] = useState('');
  const handleKeyword1 = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }
  const handleKeyword2 = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }
  const handleKeyword3 = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }
  const handleKeyword4 = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
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

  /*조회일자*/
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());


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
    <a> 키워드 속성 </a>
    <input className="form-control mr-sm-2 mx-3" type="search" placeholder="#키워드 속성 1" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword1}/>
    
   <input className="form-control mr-sm-2" type="search" placeholder="#키워드 속성 2" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px' }}
           value={state.name} //입력되는 값.
           onChange={handleKeyword2}/>
           
    <input className="form-control mr-sm-2" type="search" placeholder="#키워드 속성 3" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword3}/>
    
    <input className="form-control mr-sm-2" type="search" placeholder="#키워드 속성 4" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword4}/>


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

export default SearchAttribute;