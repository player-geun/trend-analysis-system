// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import { useState, useEffect } from 'react';
import KeywordTable from './KeywordTable';
import axios from 'axios';
import Router from 'next/router';
import DataTable from 'react-data-table-component';

export function RegStat_A(props) {

  /*구분*/ 
  const [classification,SetClassification] = useState("2");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "1"){
      const targetPage = '/KeywordRegStat_K';
      Router.push(targetPage);
    }
  }

  /*키워드*/

  const [state,SetState] = useState(''); // 키워드 속성

  const handleKeyword = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }



   
/*등록 버튼 클릭 api */
const postAPI = async() => {
  let url = "http://localhost:3000/api/category";
  var resultAPI = null;  
  const result = await axios.post(url,
      {
        categoryName: "동물",
        keywords: ["강아지","고양이"]
      } 
    )
      .then(r => {
        console.log("SUCCESS");
        resultAPI = r.data;
        console.log(resultAPI);
        res.status(200).json(resultAPI)
      })
      .catch((response) => { 
        // Failure
        console.log('Error!!')
      })
    
  }


  const [tmp,SetTmp] = useState([]);
/*조회 버튼 클릭 api */
const getAPI = async() => {

  /*
  const finalStateArr = stateArr.filter((x) => x !== '');
  let words= finalStateArr.join();
  
  let selectedStartDate = [startDate.getFullYear(), (startDate.getMonth()+1) < 10 ? "0" + (startDate.getMonth()+1) : (startDate.getMonth()+1), (startDate.getDate()) < 10 ? "0" + (startDate.getDate()) : (startDate.getDate())];
  let selectedEndDate = [endDate.getFullYear(),(endDate.getMonth()+1) < 10 ? "0" + (endDate.getMonth()+1) : (endDate.getMonth()+1), (endDate.getDate()) < 10 ? "0" + (endDate.getDate()) : (endDate.getDate())];
  let finalStartDate = selectedStartDate[0]+"/"+selectedStartDate[1]+"/"+selectedStartDate[2];
  let finalEndDate = selectedEndDate[0]+"/"+selectedEndDate[1]+"/"+selectedEndDate[2];
*/
  //let url = "/api/chart/category?startDate=2022/03/01&endDate=2022/03/02&categoryName=새";


  //console.log("url:"+url)

  const searchData = await axios.get("http://localhost:3000/api/chart/category?startDate=2022/03/01&endDate=2022/05/28&categoryName="+state);

  console.log(searchData.data);

  SetTmp(searchData.data.result.searchKeywordInfos)


}

console.log(tmp);



/*키워드 테이블*/
const columns = [
  {
      name: '키워드',
      selector: row => row.keyword,
  },
  {
      name: '검색량',
      selector: row => row.keywordVolume,
  },
  {
      name: '키워드 속성',
      selector: row => row.keywordAttr,
  },
  {
      name: '등록일자',
      selector: row => row.regDate,
  },
  {
      name: '삭제',
      selector: row => row.isDelete,
  },
];




console.log(tmp);


if(tmp.length>0){
  const data = [
    {
        id: 1,
        keyword: state,
        keywordVolume: '?',
        keywordAttr:tmp[0].keyword + ", " + tmp[1].keyword,
        regDate: tmp[0].keywordAmountArray[0].period,
        isDelete : <button type="button" className="btn btn-outline-secondary" style = {{width : "80px", height : "35px"}}>삭제</button>
    },
  
  ]
  
  return (
    <div style={{ fontFamily : 'NanumSquare' }}>
    
    <div className = "mx-3">
          <a className = "mx-0"> 조회 구분 </a>
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
    
      <div className = "mx-3"> 
      <form className="form-inline" >
        <a className = "mx-1"> 조회키</a>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={state.name} //입력되는 값.
               onChange={handleKeyword}/>
    
    
        <div className = "mx-4">
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAPI} > 조회 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {postAPI} > 등록 </button>
    </div>
    
      
      </form>
      <br />
      <DataTable
                columns={columns}
                
                data={data}
                selectableRows
                />
    
      </div>
      <br />
    
      
    
    
    </div>
    
     
        );
}

else{
  return (
    <div style={{ fontFamily : 'NanumSquare' }}>
    
    <div className = "mx-3">
          <a className = "mx-0"> 조회 구분 </a>
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
    
      <div className = "mx-3"> 
      <form className="form-inline" >
        <a className = "mx-1"> 조회키</a>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={state.name} //입력되는 값.
               onChange={handleKeyword}/>
    
    
        <div className = "mx-4">
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAPI} > 조회 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {postAPI} > 등록 </button>
    </div>
    
      
      </form>
      <br />
    
      </div>
      <br />
    
      
    
    
    </div>
    
     
        );
}
  
}

export default RegStat_A;