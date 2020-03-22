import React from "react";

import "./rate.css";
import Calc from "../Calculator/calc.js";
import Chart from "../Chart/chart.js";
class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { box0: "UAH", box1: "GEL", box2: "RUB" };
    // this.mainCurrency = ["UAH", "GEL", "RUB"];
    this.listOfCurrency = [
      "CAD",
      "HKD",
      "ISK",
      "PHP",
      "DKK",
      "HUF",
      "CZK",
      "GBP",
      "RON",
      "SEK",
      "IDR",
      "INR",
      "BRL",
      "RUB",
      "HRK",
      "JPY",
      "THB",
      "CHF",
      "EUR",
      "MYR",
      "BGN",
      "TRY",
      "CNY",
      "NOK",
      "NZD",
      "ZAR",
      "USD",
      "MXN",
      "ILS",
      "KRW",
      "PLN",
      "UAH",

      "GEL"
    ];

    this.correctBox = "";

    this.getRate(Object.values(this.state));
  }

  getRate(arg) {
    let requests = arg.map((elem, i) =>
      fetch(`api?currency=${elem}`)
    );

    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))

      .then(r => {
        

        arg.forEach((elem, index) => {
          // if (r[0]["status"] === 400) {
          //   this.setState({
          //     [arg.length > 2 ? "box" + index : this.correctBox]: [
          //       [elem],
          //       "  Eror! Free API limit Reached.Try after " + [date] + " min"
          //     ]
          //   });
          // } else {
          this.setState({
            [arg.length > 2 ? "box" + index : this.correctBox]: [
              elem,
              (
                Math.floor(r[index].currencyValue * Math.pow(10, 2)) /
                Math.pow(10, 2)
              ).toFixed(2)
            ]
          });
          // }
        });
      })
      .catch(err => console.log(err));
  }
  optionsCreate = list =>
    list.forEach(elem => <option className="currency-name"> {elem} </option>);
  getDate = () => {
    var dateObj = new Date();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let newdate = year + "/" + month + "/" + day;
    return newdate;
  };

  checkSelect = e => {
    this.correctBox = "box" + e.target.dataset.box;

    this.optionValue = e.target.value;

    return this.getRate([this.optionValue]);
  };
  render() {
    return (
      <div className="rate-container">
        <div className="date"> According to {this.getDate()}</div>
        <div className="flex-container">
          {Object.values(this.state).map((keyName, i) => {
            return (
              <div className="flex-item" key={"box" + i}>
                <span className="currency-info">
                  <span className="currency-in">{keyName[1]}</span>
                  <div className="custom-select">
                    <select onChange={this.checkSelect} data-box={i}>
                      <option className="currency-name"> {keyName[0]} </option>

                      {this.listOfCurrency.map(element => {
                        return (
                          <option
                            key={element}
                            value={element}
                            className="currency-name"
                          >
                            {element}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </span>
                <Chart
                  key={"chart" + i}
                  currencyValueNow={Object.values(this.state)[i][1]}
                  currencyName={Object.values(this.state)[i][0]}
                  indexForColor={i}
                />
              </div>
            );
          })}
        </div>

        <Calc currency={Object.values(this.state)} />
      </div>
    );
  }
}

export default Rate;
