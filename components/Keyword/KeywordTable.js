// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';


export function KeywordTable(props) {

 
return (

<table class="table">
  <thead>
    <tr>
      <th scope="col"><input type = "checkbox"/></th> 
      <th scope="col">키워드</th>
      <th scope="col">검색량</th>
      <th scope="col">키워드 속성</th>
      <th scope="col">등록일자</th>
      <th scope="col"> </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><input type = "checkbox"/></th>
      <td>   <input class="form-control" type="search" placeholder="키워드" 
           style={{ width : '150px', height : '40px',  fontSize : '15px'}} /></td>
      <td>검색량</td>
      <td>   <input class="form-control" type="search" placeholder="#키워드 속성" 
           style={{ width : '150px', height : '40px',  fontSize : '15px'}} /></td>
      <td>등록일자</td>
      <td><button style = {{width : "80px"}}>삭제</button></td>
    </tr>
    <tr>
      <th scope="row"><input type = "checkbox"/></th>
      <td>   <input class="form-control" type="search" placeholder="키워드" 
           style={{ width : '150px', height : '40px',  fontSize : '15px'}} /></td>
      <td>검색량</td>
      <td>   <input class="form-control" type="search" placeholder="#키워드 속성" 
           style={{ width : '150px', height : '40px',  fontSize : '15px'}} /></td>
      <td>등록일자</td>
      <td><button style = {{width : "80px"}}>삭제</button></td>
    </tr>
  </tbody>
</table>

    );
  
}

export default KeywordTable;




