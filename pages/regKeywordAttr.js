import Link from 'next/link';
import { useState, useEffect } from 'react';
import Graph from '../components/Graph/graph'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function regKeywordAttr() {

const [currentCategoryName,setCurrentCategoryName]  = useState('');
const [currentKeyword1,setCurrentKeyword1] = useState('');
const [currentKeyword2,setCurrentKeyword2] = useState('');
const [currentKeyword3,setCurrentKeyword3] = useState('');
const [currentKeyword4,setCurrentKeyword4] = useState('');
const [currentKeyword5,setCurrentKeyword5] = useState('');
const keywordArr = [currentKeyword1,currentKeyword2,currentKeyword3,currentKeyword4,currentKeyword5];

const handleCategoryName = (e) => {
    console.log(e.target.value)
    setCurrentCategoryName(e.target.value)
  }

  const handleKeyword1 = (e) => {
    console.log(e.target.value)
    setCurrentKeyword1(e.target.value)
  }
  const handleKeyword2 = (e) => {
    console.log(e.target.value)
    setCurrentKeyword2(e.target.value)
  }
  const handleKeyword3 = (e) => {
    console.log(e.target.value)
    setCurrentKeyword3(e.target.value)
  }
  const handleKeyword4 = (e) => {
    console.log(e.target.value)
    setCurrentKeyword4(e.target.value)
  }
  const handleKeyword5 = (e) => {
    console.log(e.target.value)
    setCurrentKeyword5(e.target.value)
  }


   
/*등록 버튼 클릭 api */

const regAPI = async() => {
    const finalKeywords = keywordArr.filter((x) => x !== '');
    let url = "http://localhost:3000/api/category";
    var resultAPI = null;  
    const result = await axios.post(url,
        {
          categoryName: currentCategoryName,
          keywords: finalKeywords
        } 
      )
        .then(r => {
          console.log("SUCCESS");
          resultAPI = r.data;
          console.log(resultAPI);
          res.status(200).json(resultAPI)
        })
        .catch((response) => { 
          // Failure
          console.log('Error!!')
        })

        alert(resultAPI.message);

    }


  
    return (
        <div className="container" style={{ fontFamily : 'NanumSquare'}}>

            <h1>키워드 속성 등록</h1> 
            <br></br>

            <input className="form-control mr-sm-2 mx-3" type="search" placeholder="#카테고리 입력"  aria-label="Search" 
                style={{ width : '200px', height : '70px',  fontSize : '20px'}}
                value={currentCategoryName.name} //입력되는 값.
                onChange={handleCategoryName}/>

            <br></br>
            
 
            
          <div className ="box">
            <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드1 입력"  aria-label="Search" 
                style={{ width : '200px', height : '70px',  fontSize : '20px'}}
                value={currentKeyword1.name} //입력되는 값.
                onChange={handleKeyword1}/>
          </div>
         <div className ="box">
             <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드2 입력"  aria-label="Search" 
                style={{ width : '200px', height : '70px',  fontSize : '20px'}}
                value={currentKeyword2.name} //입력되는 값.
                onChange={handleKeyword2}/>
          </div>

        <div className ="box">
            <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드3 입력"  aria-label="Search" 
                style={{ width : '200px', height : '70px',  fontSize : '20px'}}
                value={currentKeyword3.name} //입력되는 값.
                onChange={handleKeyword3}/>
        </div>

        <div className ="box">
            <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드4 입력"  aria-label="Search" 
                style={{ width : '200px', height : '70px',  fontSize : '20px'}}
                value={currentKeyword4.name} //입력되는 값.
                onChange={handleKeyword4}/>
        </div>

        <div className ="box">
            <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드5 입력"  aria-label="Search" 
                style={{ width : '200px', height : '70px',  fontSize : '20px'}}
                value={currentKeyword5.name} //입력되는 값.
                onChange={handleKeyword5}/>
        </div>

        <div className ="box">
            <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '70px',  fontSize : '20px' }}
                onClick = {regAPI} > 등록 </button>

        </div>
                
<style jsx>{`
   .container {
     position : relative;
     top : 0px;
     left : 0px;
     display : block;
     margin: 1rem;
     font-size : 18px;
   }
 
   `}</style>

<style jsx>{`
   .box {
     position : relative;
     top : 0px;
     left : -18px;
     display : inline-block;
     margin: 1rem;
     font-size : 18px;
   }
 
   `}</style>

   

            


         
        </div>
        
    );
};

