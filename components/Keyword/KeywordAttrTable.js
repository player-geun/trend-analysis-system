// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import DataTable from 'react-data-table-component';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function KeywordAttrTable(props) {

  /*구분*/ 
  const [classification,SetClassification] = useState("2");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "1"){
      const targetPage = '/KeywordHandle';
      Router.push(targetPage);
    }
  }

  /*조회일자*/
    let month = new Date().getMonth();
    const [startDate,setStartDate] = useState(new Date(new Date().setMonth(month - 1))); //시작 날짜 default : 한 달전
    const [endDate,setEndDate] = useState(new Date());

  /*키워드*/

  const [state,SetState] = useState(''); // 키워드 속성

  const handleKeyword = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }


  /* 등록 테이블 - 데이터*/

  const regDataList = new Array();
  var idIdx= 1;
  



/*조회 버튼 클릭 api */
const [tmp,SetTmp] = useState([]);
const [regDate,SetRegDate] = useState('');
const getAPI = async() => {

  const searchData = await axios.get("http://localhost:3000/api/chart/category?startDate=2022/03/01&endDate=2022/05/28&categoryName="+state);

  SetTmp(searchData.data.result.searchKeywordInfos)
  SetRegDate(searchData.data.result.createdAt);

}
console.log(tmp);

/*등록 버튼 클릭 api */
const regAPI = async() => {
  window.open("http://localhost:3000/regKeywordAttr", "a", "width=1000, height=400, left=100, top=50");
  
}

/*삭제 버튼 클릭 api */
const deleteAPI = async() => {

}





/*키워드 테이블*/
const columns = [
  {
      name: <h6><strong>키워드</strong></h6>,
      selector: row => row.keyword,
      sortable: true,
      style : {fontSize : 15}
      
      
  },
  {
      name: <h6><strong>검색량</strong></h6>,
      selector: row => row.keywordVolume,
      sortable: true,
      style : {fontSize : 15}

  },
  {
      name: <h6><strong>등록일자</strong></h6>,
      selector: row => row.regDate,
      sortable: true,
      style : {fontSize : 15}
  },
    {
      name: <h6><strong>삭제</strong></h6>,
      selector: row => row.isDelete,

  },
  

];




console.log(tmp);


if(tmp.length>0){
  let attrList = ''
  for (var i = 0; i <tmp.length; i++) {
      regDataList.push(    
        {
        id: idIdx,
        keyword: tmp[i].keyword,
        keywordVolume: '?',
        regDate: regDate,
        isDelete : <button type="button" className="btn btn-outline-secondary" style = {{width : "80px", height : "35px"}}>삭제</button>
    
    })
    idIdx = idIdx+1;
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
          top : 125px;
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
          top : 130px;
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
                onClick = {deleteAPI} > 삭제 </button>
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
          top : 125px;
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
          top : 130px;
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
        <a className = "mx-1"> 조회키</a>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력"  aria-label="Search" 
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
                onClick = {deleteAPI} > 삭제 </button>
    </div>
    
      
      </form>
      <br />
    
      </div>
      <br />
    
      
    
    
    </div>
    
     
        );
}
  
}

export default KeywordAttrTable;