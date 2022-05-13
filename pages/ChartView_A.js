import Link from 'next/link';

import { useState, useEffect } from 'react';
import Graph from '../components/Graph/graph'
import axios from 'axios';
import SearchKeyword  from '../components/Input/SearchKeyword'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchAttribute from '../components/Input/SearchAttribute';




export default function ChartView_A() {

 



    return (
        <div className="px-4 py-3 my-5">

              <ul class="nav nav-tabs" style={{ fontFamily : 'NanumSquare' }}>
                 <li class="nav-item">
                  <a class="nav-link" href="/">Main</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link active font-weight-bold" href="#">차트 조회</a>
                </li>
  
                <li class="nav-item">
                  <a class="nav-link" href="#">키워드 조회/등록/삭제</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#">키워드 정정</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#">키워드 등록 현황</a>
                </li>
              </ul>
            
            <br></br> 

            <div >
              <SearchAttribute/>
            </div>

           


     
        </div>
    );
};