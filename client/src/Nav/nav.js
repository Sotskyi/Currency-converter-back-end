import React from "react";

import "./nav.css";

import { Link } from "react-router-dom";

class Nav extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {};
  render() {
    return (
      
        
          <nav  className="nav-container">
          
           
              <span>
                <Link className="links" to="/">
                  Home
                </Link>
              </span>
              <span>
                <Link className="links" to="/about">
                  About
                </Link>
              </span>
            
         
        
     </nav>
    );
  }
}

export default Nav