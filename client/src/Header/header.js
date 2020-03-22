import React from "react";

import "./header.css";
import Nav from "../Nav/nav.js";

class Header extends React.Component {
  state = {};
  render() {
    return (
      <header className="main-header">
       
          <div className="title-container">
            <div className="site-title">Currency Converter</div>
          </div>
          <Nav />
        
      </header>
    );
  }
}

export default Header;
