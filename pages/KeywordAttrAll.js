import Link from 'next/link';

import { useState, useEffect } from 'react';
import Graph from '../components/Graph/graph'
import axios from 'axios';
import KeywordTable from '../components/Keyword/KeywordTable'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component';



export default function KeywordAttrAll() {

    const [allData,SetAllData] = useState([]);
    const [allDataClick,SetAllDataClick] = useState('0');
    const getAllAPI = async() => {
      SetAllDataClick('1');
      console.log("here"+allDataClick);
      const searchAllData = await axios.get("http://localhost:3000/api/all-data");
      //console.log(searchAllData.data.result.allKeywords);
      SetAllData(searchAllData.data.result.allKeywords)
    
      //console.log(searchAllData)
     // console.log(allData);
      //console.log(searchAllData.data.result.allKeywords.length);
    }
    

/*모든 키워드 테이블*/
const allColumns = [
    {
        name: 'id',
        selector: row => row.id,
    },
      {
        name: '키워드',
        selector: row => row.keyword,
    },
    {
        name: '카테고리',
        selector: row => row.category,
    },
    {
      name: '등록일자',
      selector: row => row.regDate,
    },
  
  ];

  // 테이블에 넣을 데이터 
  const allRegDataList = new Array();
  
  for (var i = 0; i <allData.length; i++) {
    allRegDataList.push(    
      {
      id: (i+1),
      keyword: allData[i].keywordName,
      category: allData[i].categoryName,
      regDate: allData[i].createdAt
    })
  }
  

    return (
        <div className="px-4 py-3 my-5" style={{ fontFamily : 'NanumSquare'}}>

<div className = "container">
    <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '90px', height : '40px',  fontSize : '17px' }}
                onClick = {getAllAPI}> 조회하기 </button> 

    <DataTable 
                  columns={allColumns }
                  data={allRegDataList}
                  pagination
                  dense = 'true'
                  />

</div>  
<style jsx>{`
   .container {
     position : relative;
     top : -50px;
     left : 0px;
     display : block;
   }
 
   `}</style>


     
        </div>
    );
};