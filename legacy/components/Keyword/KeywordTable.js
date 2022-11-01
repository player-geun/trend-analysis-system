// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import DataTable from 'react-data-table-component';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function KeywordTable(props) {

  /*구분*/ 
  const [classification,SetClassification] = useState("1");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "2"){
      const targetPage = '/KeywordAttrHandle';
      Router.push(targetPage);
    }
  }

  /*조회일자*/
    let month = new Date().getMonth();
    const [startDate,setStartDate] = useState(new Date(new Date().setMonth(month - 1))); //시작 날짜 default : 한 달전
    const [endDate,setEndDate] = useState(new Date());

  /*키워드*/

  const [keyword1,Setkeyword1] = useState(''); 
  const [keyword2,Setkeyword2] = useState(''); 
  const [keyword3,Setkeyword3] = useState(''); 
  const [keyword4,Setkeyword4] = useState(''); 
  const [keyword5,Setkeyword5] = useState(''); 
  const keywordArr = [keyword1,keyword2,keyword3,keyword4,keyword5];

  const handleKeyword1 = (e) => {
    console.log(e.target.value)
    Setkeyword1(e.target.value)
  }
  const handleKeyword2 = (e) => {
    console.log(e.target.value)
    Setkeyword2(e.target.value)
  }
  const handleKeyword3 = (e) => {
    console.log(e.target.value)
    Setkeyword3(e.target.value)
  }
  const handleKeyword4 = (e) => {
    console.log(e.target.value)
    Setkeyword4(e.target.value)
  }
  const handleKeyword5 = (e) => {
    console.log(e.target.value)
    Setkeyword5(e.target.value)
  }


  /* 등록 테이블 - 데이터*/

  const regDataList = new Array();


/*등록 버튼 클릭 api */
const postAPI = async() => {
  let url = "/api/category";
  var resultAPI = null;  
  const result = await axios.post(url,
      {
        categoryName: "숫자",
        keywords: ["1","2"]
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
      console.log(result);
  }




/*조회 버튼 클릭 api */
const [finalKeywordArr,setFinalKeywordArr] = useState([]);
const [viewDataList,setViewDataList] = useState([]);
const getAPI = async() => {
      setFinalKeywordArr(keywordArr.filter((x) => x !== ''));

        for (var i = 0; i < finalKeywordArr.length; i++) {
            const searchData = await axios.get("/api/chart/category?startDate=2022/03/01&endDate=2022/05/28&categoryName="+finalKeywordArr[i]);
            //viewDataList.push(searchData.data.result.searchKeywordInfos);
            setViewDataList(viewDataList.concat([searchData.data.result.searchKeywordInfos]));

        }

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
  {
      name: '삭제',
      selector: row => row.isDelete,
  },
];



if(viewDataList.length>0){

    console.log(viewDataList);
   // let attrList = '';
   // for (var j = 0; j <viewDataList.length; i++) {
    //    attrList += ( "#"+viewDataList[j].keyword + " " )
     //}
  
   for (var i = 0; i < finalKeywordArr.length; i++) {


       
        regDataList[i] = 
            {
            id: i,
            keyword: finalKeywordArr[i],
            keywordVolume: '?',
            keywordAttr: '',
            regDate: viewDataList[0].keywordAmountArray[0].period,
            isDelete : <button type="button" className="btn btn-outline-secondary" style = {{width : "80px", height : "35px"}}>삭제</button>
        }
   }




  
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
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword1.name} //입력되는 값.
               onChange={handleKeyword1}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword2.name} //입력되는 값.
               onChange={handleKeyword2}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword3.name} //입력되는 값.
               onChange={handleKeyword3}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword4.name} //입력되는 값.
               onChange={handleKeyword4}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword5.name} //입력되는 값.
               onChange={handleKeyword5}/>              
    
    
        <div className = "mx-4">
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAPI} > 조회 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {postAPI} > 등록 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {postAPI} > 삭제 </button>
    </div>
    
      
      </form>
      <br />
      
      <DataTable 
                columns={columns}          
                data={regDataList}
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
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword1.name} //입력되는 값.
               onChange={handleKeyword1}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword2.name} //입력되는 값.
               onChange={handleKeyword2}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword3.name} //입력되는 값.
               onChange={handleKeyword3}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword4.name} //입력되는 값.
               onChange={handleKeyword4}/>
        <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
               style={{ width : '200px', height : '50px',  fontSize : '20px'}}
               value={keyword5.name} //입력되는 값.
               onChange={handleKeyword5}/>              
    
    
        <div className = "mx-4">
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAPI} > 조회 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {postAPI} > 등록 </button>
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {postAPI} > 삭제 </button>
    </div>
    
      
      </form>
      <br />

    
      </div>
      <br />
    
      
    
    
    </div>
    
     
        );
}
  
}

export default KeywordTable;