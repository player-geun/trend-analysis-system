/* '데이터시트 조회' 버튼 */

import React, { Component } from 'react';
import css from "styled-jsx/css";

const style = css`
  button {
    /* 공통 스타일 */
    /* display: flex; */
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding-left: 1.1rem;
    padding-right: 1.1rem;

    /*위치*/
    position: relative;
    top: -60px;
    left: 290px;


    /*폰트*/
    /*font-family: 'NanumSquare'*/
    font-weight: light; 
  
    /* 크기 */
    height: 3.3rem;
    font-size: 1.5rem;
  
    /* 색상 */
    background: #005555;
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

const KeyWordSearchButton = (props) => {
    const { children, onClick } = props;

    // ChartViewButton 클릭

    const handleClick = () => {
        console.log("click")
      }


    return (
        <div>
      <button onClick={handleClick}>{children}검색</button>
      <style jsx>{style}</style>
      </div>
    )
  }
  
  export default KeyWordSearchButton;


