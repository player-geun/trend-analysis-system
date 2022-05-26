// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Graph from '../Graph/graph';
import Router from 'next/router';

import KeywordTable from './KeywordTable';

export function Handle(props) {



return (
  <div style={{ fontFamily : 'NanumSquare' }}>

     <KeywordTable/>

 
    <br />
  
    
  
  </div>
  
   
      );
  

}

export default Handle;