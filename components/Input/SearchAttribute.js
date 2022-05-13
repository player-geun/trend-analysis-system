// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Graph from '../Graph/graph';
import Router from 'next/router';

export function SearchAttribute(props) {


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


return (
<div style={{ fontFamily : 'NanumSquare' }}>
  <div class = "mx-3">
      <a class = "mx-1"> 구분 </a>
      <input class = "mx-3"
        type = "radio"
        value = "1"
        checked = {classification === "1"}
        onChange = {handleClickRadioButton}
        />
      <label>
        1. 키워드
      </label>
      <input class = "mx-3"
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

  <div class = "mx-3">
      <a> 조회일자  </a>
  </div>
  <br />


  <div class = "mx-3"> 
  <form class="form-inline" >
    <a> 키워드 속성 </a>
    <input class="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 1" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword1}/>
    
   <input class="form-control mr-sm-2" type="search" placeholder="키워드 속성 2" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px' }}
           value={state.name} //입력되는 값.
           onChange={handleKeyword2}/>
           
    <input class="form-control mr-sm-2" type="search" placeholder="키워드 속성 3" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword3}/>
    
    <input class="form-control mr-sm-2" type="search" placeholder="키워드 속성 4" aria-label="Search" 
           style={{ width : '200px', height : '50px',  fontSize : '20px'}}
           value={state.name} //입력되는 값.
           onChange={handleKeyword4}/>


    <button type = "button" class="btn btn-outline-primary my-2 my-sm-0" 
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