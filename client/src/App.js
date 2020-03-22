import React from "react";

import "./App.css";
import Header from "./Header/header.js";
import Footer from "./Footer/footer.js";
import Rate from "./Rate/rate.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./About/about.js";

class App extends React.Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Router>
          <Header />

          <Switch>
            <Route exact path="/about" component={About} />

            <>
              <Rate />
            </>
          </Switch>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
