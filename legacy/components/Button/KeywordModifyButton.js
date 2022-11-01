/* '키워드 정정' 버튼 */

import React, { Component } from 'react';
import css from "styled-jsx/css";
import Link from 'next/link'

const KeywordModifyButton = (props) => {
    const { children, onClick } = props;

    // ChartViewButton 클릭

    const handleClick = () => {
        console.log("click")
      }


    return (
        <div>

        <Link href="/KeywordModify">
        <button type="button" className="btn btn-primary btn-lg" style={{ fontFamily : 'NanumSquare' }}>키워드 정정</button>
        </Link>
        
  

      </div>
    )
  }
  
  export default KeywordModifyButton;


