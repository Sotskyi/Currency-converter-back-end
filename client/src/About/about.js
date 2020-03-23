import React from "react";

import "./about.css";

class About extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {};
  render() {
    return (
     <div className="wrapper">
       <div className="about-container">
       <h3>Currency values are updated every 60 minutes.
          <p>  If you need  to add currency name ,or have any concerns, please let me know.</p>
          <p >  <a  href="https://www.andriisotskyi.com/" >https://www.andriisotskyi.com/</a></p></h3>
            </div>
     </div>
    );
  }
}

export default About;
