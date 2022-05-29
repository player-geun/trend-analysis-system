/* '키워드 조회, 등록, 삭제' 버튼 */

import React, { Component } from 'react';
import css from "styled-jsx/css";
import Link from 'next/link'

const KeywordHandleButton = (props) => {
    const { children, onClick } = props;

    // ChartViewButton 클릭

    const handleClick = () => {
        console.log("click")
      }


    return (
        <div>

        <Link href="/KeywordHandle">
        <button type="button" className="btn btn-primary btn-lg" style={{ fontFamily : 'NanumSquare' }}>키워드 조회/등록/삭제</button>
        </Link>


      </div>
    )
  }
  
  export default KeywordHandleButton;


