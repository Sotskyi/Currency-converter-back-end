import React from "react";

import "./footer.css";

class Footer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {};
  render() {
    return (
      <footer  className="footer">
        
          
            <div className="footer-container">
           
                <h3 className="footer-title">
                  <a href="/">2020 &copy;Currency Converter</a>
                </h3>
                <p> All Rights Reserved</p>
              </div>
           
          
        
      </footer>
    );
  }
}

export default Footer;
