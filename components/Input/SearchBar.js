// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";





class SearchBar extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
    <div>

        <form>
            <input
            placeholder="키워드를 입력하세요."
            value={this.state.name} //입력되는 값.
            onChange={this.handleChange}
            style = {{width:250 , height:70, fontSize:25}}
            />

        </form>


      </div>
    );
  }
}

export default SearchBar;