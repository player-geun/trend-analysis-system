// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';

export function KeywordTableRow(props) {



return (
    <tr>
    <th scope="row"><input type = "checkbox"/></th>
    <td>키워드</td>
    <td>검색량</td>
    <td>키워드 속성</td>
    <td>등록일자</td>
    <td><button style = {{width : "80px"}}>삭제</button></td>
  </tr>
    );
  
}

export default KeywordTableRow;




