import React from "react";

import "./calc.css";

class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    return { updateCurrency: props.currency };
  }
  reset = () => {
    this.setState({ result: 0 });
  };

  calcRate = e => {
    e.preventDefault();
    let elements = e.target.elements;

    let countCurrency = elements["count-currency"].value;
    let typeCurrency = elements["type-currency"].value;

    this.setState({
      result: (countCurrency / typeCurrency).toFixed(2)
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="calculator-title"> Calculator exchange rate</div>
        <div className="block">
          <form onSubmit={this.calcRate}>
            <input
              className="number-wrap"
              type="number"
              name="count-currency"
            />
            <div className="custom-select">
              <select name="type-currency" onClick={this.reset}>
                {this.state.updateCurrency.map((keyName, i) => {
                  return (
                    <option key={keyName} value={keyName[1]}>
                      {keyName[0]}
                    </option>
                  );
                })}
              </select>
            </div>
            <input className="submit" type="submit" value="Convert"></input>
          </form>
          <div className="currency-result">
            <span>Result</span>

            <span>{this.state.result} USD</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Calc;
