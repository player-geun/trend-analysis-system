// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';

import KeywordTableRow from './KeywordTableRow';
import KeywordTableInputRow from './KeywordTableInputRow';

export function KeywordTable(props) {
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
    
    const data = [
        {
            id: 1,
            keyword: '가방',
            keywordVolume: '50,000',
            keywordAttr:'#대분류 #액세서리',
            regDate:'2022.04.20',
            isDelete : <button type="button" className="btn btn-outline-secondary" style = {{width : "80px", height : "35px"}}>삭제</button>
        },
        {
            id: 2,
            keyword: '여성가방',
            keywordVolume: '30,000',
            keywordAttr:'#가방',
            regDate:'2022.04.20',
            isDelete : <button type="button" className="btn btn-outline-secondary" style = {{width : "80px", height : "35px"}}>삭제</button>
        },
    ]

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

  /*등록 버튼*/
  const [reg,SetReg] = useState(0);
  const handleRegButton = () => {
    SetReg(1);
    console.log({reg});
  }

    /*조회 버튼*/
    const [view,SetView] = useState(0);
    const handleViewButton = () => {
      SetView(1);
      console.log({view});
    }

    const addRow = () => {
        document.getElementById('id');

        const newRow = table.insertRow();

        const newCell1 = newRow.insertCell(0);
        const newCell2 = newRow.insertCell(1);
        
        newCell1.innerText = '새 과일';
        newCell2.innerText = 'New Fruit';


    }
  


    /* '조회'버튼 클릭 -> table 나타남 */
     if(view === 1){
         if(reg === 1){
             {addRow};
         }
        return (
            <div style={{ fontFamily : 'NanumSquare'}}>
        
            <div className = "mx-3"> 
            <form className="form-inline" >
              <a> 키워드 </a>
              <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
                     style={{ width : '200px', height : '50px',  fontSize : '20px'}}
                     value={state.name} //입력되는 값.
                     onChange={handleKeyword1}/>
           
              <br />
          
              <a className = "mx-1"> 키워드 속성</a>
              <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
                     style={{ width : '200px', height : '50px',  fontSize : '20px'}}
                     value={state.name} //입력되는 값.
                     onChange={handleKeyword2}/>
          
          
              <div className = "mx-4">
                  <button type = "button" className="btn btn-outline-primary mx-2" 
                      style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                      onClick = {handleViewButton}> 조회 </button>
                  <button type = "button" className="btn btn-outline-primary mx-2" 
                      style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                      onClick = {handleRegButton} > 등록 </button>
                  <button type = "button" className="btn btn-outline-primary mx-2" 
                      style={{ width : '100px', height : '50px',  fontSize : '20px' }} > 삭제 </button>
          
          </div>
          
            
            </form>
            <br />
        
            <DataTable
            columns={columns}
            data={data}
            selectableRows
            />
        
            
        </div>
        </div>
          
            );
    }
else{
    return (
    <div style={{ fontFamily : 'NanumSquare'}}>

    <div className = "mx-3"> 
    <form className="form-inline" >
      <a> 키워드 </a>
      <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 입력" aria-label="Search" 
             style={{ width : '200px', height : '50px',  fontSize : '20px'}}
             value={state.name} //입력되는 값.
             onChange={handleKeyword1}/>
   
      <br />
  
      <a className = "mx-1"> 키워드 속성</a>
      <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
             style={{ width : '200px', height : '50px',  fontSize : '20px'}}
             value={state.name} //입력되는 값.
             onChange={handleKeyword2}/>
  
  
      <div className = "mx-4">
          <button type = "button" className="btn btn-outline-primary mx-2" 
              style={{ width : '100px', height : '50px',  fontSize : '20px' }}
              onClick = {handleViewButton}> 조회 </button>
          <button type = "button" className="btn btn-outline-primary mx-2" 
              style={{ width : '100px', height : '50px',  fontSize : '20px' }}
              onClick = {handleRegButton} > 등록 </button>
          <button type = "button" className="btn btn-outline-primary mx-2" 
              style={{ width : '100px', height : '50px',  fontSize : '20px' }} > 삭제 </button>
  
  </div>
  
    
    </form>
    <br />


    
</div>
</div>
  
    );
  
}
}

export default KeywordTable;




