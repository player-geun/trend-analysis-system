// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Graph from '../Graph/graph';
import Router from 'next/router';

import KeywordTable from './KeywordTable';

export function Handle(props) {


    //그래프
    const [graphData, setGraphData] = useState({datasets : [ { type: '', label: '', borderColor: '',borderWidth: 0, data: [] } ] } )
    let url = "/api/search-trend";

    const getConvertToXY = (array) =>{
      var resArr = [];
  
      array.forEach(element => {
        resArr.push({x: element.period, y: element.ratio});
      });
  
      return resArr;
    }
  
    const postAPI = async() => {
  
      const result = await axios.get(url);
      console.log("result data", result.data);
  
      let res1 = getConvertToXY(result.data.results[0].data);
      let res1title = result.data.results[0].title
      let res2 = getConvertToXY(result.data.results[1].data);
      let res2title = result.data.results[1].title
  
      console.log(res1);
  
      setGraphData(
        {
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          // labels 대신 아래와 같이 각각의 데이터의 x값을 개별적으로 전달해줍니다.
          datasets: [
            {
              type: 'line',
              label: res1title,
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 2,
              data: res1,
            },
            {
              type: 'line',
              label: res2title,
              backgroundColor: 'rgb(255, 99, 132)',
              data: res2,
              borderColor: 'red',
              borderWidth: 2,
            }
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


/* 키워드 테이블*/



return (
<div style={{ fontFamily : 'NanumSquare' }}>

  <div class = "mx-3"> 
  <form class="form-inline" >
    <a> 키워드 </a>
    <input class="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword1}/>
  
    <br />

    <a class = "mx-1"> 키워드 속성</a>
    <input class="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword2}/>


    <div class = "mx-4">
        <button type = "button" class="btn btn-outline-primary mx-2" 
            style={{ width : '100px', height : '50px',  fontSize : '20px' }} > 조회 </button>
        <button type = "button" class="btn btn-outline-primary mx-2" 
            style={{ width : '100px', height : '50px',  fontSize : '20px' }} > 등록 </button>
        <button type = "button" class="btn btn-outline-primary mx-2" 
            style={{ width : '100px', height : '50px',  fontSize : '20px' }} > 삭제 </button>
</div>

  
  </form>
  <br />
  
  </div>
  <br />

  

 <KeywordTable />

 








</div>

 
    );
  
}

export default Handle;