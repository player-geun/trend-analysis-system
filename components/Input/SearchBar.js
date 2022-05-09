// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import KeyWordSearchButton from '../../components/Button/KeywordSearchButton'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Graph from '../Graph/graph';

export function SearchBar(props) {


    //그래프
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
  
      console.log(res1);
  
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
            }
          ]
        }
      );
    }
  
  



 

  const [state,setState] = useState('');

  const handleChange = (e) => setState(e.target.value);



    return (

    <div>

        <form>
            <input
            placeholder="키워드를 입력하세요."
            value={state.name} //입력되는 값.
            onChange={handleChange}
            style = {{width:250 , height:70, fontSize:25}}
            />


            <h1>{state.name}</h1>
        </form>




        <KeyWordSearchButton 
        onClick={postAPI}/>

        

        <Graph
                data = {graphData} 
            />

     
      </div>
    );
  
}

export default SearchBar;