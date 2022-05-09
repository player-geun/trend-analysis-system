/* '차트 조회' 버튼 */

import React, { Component } from 'react';
import css from "styled-jsx/css";
import Link from 'next/link'

const style = css`
  button {
    /* 공통 스타일 */
    /* display: inline-flex; */
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /*폰트*/
    /*font-family: 'NanumSquare'*/
    /* font-weight: bold; */
  
    /* 크기 */
    height: 3rem;
    font-size: 1.5rem;
  
    /* 색상 */
    background: #069A8E;
    &:hover {
      background: #339af0;
    }
    &:active {
      background: #1c7ed6;
  }
  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;


const ChartViewButton = (props) => {
    const { children, onClick } = props;

    // ChartViewButton 클릭

    const handleClick = () => {
        console.log("click")


      }


    return (
        <div>

        <Link href="/ChartView">
        <button>
          차트 조회
        </button>
        </Link>
        <style jsx>{style}</style>


      </div>
    )
  }
  
  export default ChartViewButton;


