// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';

export function KeywordTableInputRow(props) {



return (
    <tr>
    <th scope="row"><input type = "checkbox"/></th>
    <td>   <input className="form-control" type="search" placeholder="키워드" 
         style={{ width : '150px', height : '40px',  fontSize : '15px'}} /></td>
    <td>검색량</td>
    <td>   <input className="form-control" type="search" placeholder="#키워드 속성" 
         style={{ width : '150px', height : '40px',  fontSize : '15px'}} /></td>
    <td>등록일자</td>
    <td><button style = {{width : "80px"}}>삭제</button></td>
  </tr>
    );
  
}

export default KeywordTableInputRow;




