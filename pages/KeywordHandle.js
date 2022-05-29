import Link from 'next/link';

import { useState, useEffect } from 'react';
import Graph from '../components/Graph/graph'
import axios from 'axios';
import Handle from '../components/Keyword/Handle'
import 'bootstrap/dist/css/bootstrap.min.css'




export default function KeywordHandle() {

 



    return (
        <div className="px-4 py-3 my-5">

              <ul className="nav nav-tabs" style={{ fontFamily : 'NanumSquare' }}>
                 <li className="nav-item">
                  <Link className="nav-link" href="/">Main</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/ChartView_K">차트 조회</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active font-weight-bold" href="/KeywordHandle">키워드 조회/등록/삭제</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/KeywordModify">키워드 정정</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/KeywordRegStat">키워드 등록 현황</Link>
                </li>
              </ul>
            
            <br></br> 

            <div >
              <Handle/>
            </div>

           


     
        </div>
    );
};