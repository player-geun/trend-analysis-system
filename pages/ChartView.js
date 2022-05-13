import Link from 'next/link';

import { useState, useEffect } from 'react';
import Graph from '../components/Graph/graph'
import axios from 'axios';
import SearchNav from '../components/Input/SearchNav'
import 'bootstrap/dist/css/bootstrap.min.css'




export default function ChartView() {

    const [graphData, setGraphData] = useState({datasets : [ { type: '', label: '', borderColor: '',borderWidth: 0, data: [] } ] } )

    let url = "/api/search-trend";
  
    const getConvertToXY = (array) =>{
      var resArr = [];
  
      array.forEach(element => {
        resArr.push({x: element.period, y: element.ratio});
      });
  
      return resArr;
    }
  
    const postAPI = async() => {
  
      const result = await axios.get(url);
      console.log("result data", result.data);
  
      let res1 = getConvertToXY(result.data.results[0].data);
      let res1title = result.data.results[0].title
      let res2 = getConvertToXY(result.data.results[1].data);
      let res2title = result.data.results[1].title
      let res3 = getConvertToXY(result.data.results[2].data);
      let res3title = result.data.results[2].title

  
      setGraphData(
        {
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          // labels 대신 아래와 같이 각각의 데이터의 x값을 개별적으로 전달해줍니다.
          datasets: [
            {
              type: 'line',
              label: res1title,
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 2,
              data: res1,
            },
            {
              type: 'line',
              label: res2title,
              backgroundColor: 'rgb(255, 99, 132)',
              data: res2,
              borderColor: 'red',
              borderWidth: 2,
            },
            {
                type: 'line',
                label: res3title,
                backgroundColor: 'green',
                data: res3,
                borderColor: 'green',
                borderWidth: 2,
              }
          ]
        }
      );
    }
  



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
              <SearchNav/>
            </div>

           


     
        </div>
    );
};