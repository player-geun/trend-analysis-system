// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import { useState, useEffect } from 'react';
import KeywordTable from './KeywordTable';
import axios from 'axios';
import Router from 'next/router';
import DataTable from 'react-data-table-component';

export function RegStat_K(props) {

  /*구분*/ 
  const [classification,SetClassification] = useState("1");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "2"){
      const targetPage = '/KeywordRegStat_A';
      Router.push(targetPage);
    }
  }

  /*키워드*/

  const [state,SetState] = useState(''); // 키워드 속성

  const handleKeyword = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }

  /* 등록 테이블 - 데이터*/

  const regDataList = new Array();
  var idIdx= 1;



  /*등록 버튼 클릭 api */
const regAPI = async() => {
  window.open("http://localhost:3000/regKeywordAttr", "a", "width=1000, height=400, left=100, top=50");
  
}


/*조회 버튼 클릭 api */
const [tmp,SetTmp] = useState([]);
const getAPI = async() => {

  const searchData = await axios.get("http://localhost:3000/api/chart/category?startDate=2022/03/01&endDate=2022/05/28&categoryName="+state);

  console.log(searchData);

  SetTmp(searchData.data.result.searchKeywordInfos)


}
console.log(tmp);


/*'전체' 조회 버튼 클릭 api */
const [allData,SetAllData] = useState([]);
const [allDataClick,SetAllDataClick] = useState('0');
const getAllAPI = async() => {
  SetTmp([]);
  SetAllDataClick('1');
  console.log("here"+allDataClick);
  const searchAllData = await axios.get("http://localhost:3000/api/all-data");
  //console.log(searchAllData.data.result.allKeywords);
  SetAllData(searchAllData.data.result.allKeywords)

  //console.log(searchAllData)
 // console.log(allData);
  //console.log(searchAllData.data.result.allKeywords.length);
}


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

];




console.log(tmp);


if(tmp.length>0){
  idIdx = idIdx+1;
  let attrList = ''
  for (var i = 0; i <tmp.length; i++) {
      attrList += ( "#"+tmp[i].keyword + " " )
   }
  
  
  regDataList.push(    
    {
    id: idIdx,
    keyword: state,
    keywordVolume: '?',
    keywordAttr: attrList,
    regDate: tmp[0].keywordAmountArray[0].period,
})


  
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
                onClick = {regAPI} > 등록 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAllAPI}> 전체조회 </button> 
    </div>
    
      
      </form>
      <br />
      
      <DataTable 
                columns={columns}
                
                data={regDataList}
                selectableRows
                dense = 'true'
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
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={state.name} //입력되는 값.
               onChange={handleKeyword}/>
    
    
        <div className = "mx-4">
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAPI} > 조회 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {regAPI} > 등록 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAllAPI}> 전체조회 </button> 
    </div>
    
      
      </form>
      <br />
    
      </div>
      <br />
    
      
    
    
    </div>
    
     
        );
}
  
}

export default RegStat_K;