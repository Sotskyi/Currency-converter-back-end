import React from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.today = new Date();
    this.now = this.today.getDate();
    this.oneDay = this.today.getDate() - 1;
    this.twoDay = this.today.getDate() - 2;
    this.threeDay = this.today.getDate() - 3;
    this.fourDay =
      this.today.getDate() - 4 + " " + this.monthNames[this.today.getMonth()];

    this.state = {
      counter: false,
      currencyName: "",
      dataForChart: "",
      lastElementForChart: "",
      colorChart: "",
      borderColor: ""
    };
  }

  getData(currencyName, indexForColor, lastelement) {
   
    let colorForChart = "";
    let borderColor = "";
    if (indexForColor === 0) {
      colorForChart = "#fceaf4";
      borderColor = "#f198ca";
    } else if (indexForColor === 1) {
      colorForChart = "#dbf9f0";
      borderColor = "#4ce1b6";
    } else if (indexForColor === 2) {
      colorForChart = "#f3ecf9";
      borderColor = "#6faae1";
    }

    fetch(`/api/chart?chartdata=${currencyName}`)
      .then(responses => responses.json())
      .then(r => {
        let dataForChart = r.currencyValue.map(elem =>
          (Math.floor(+elem * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)
        );
        dataForChart.push(lastelement);

        if (this.state.counter === false) {
          this.setState({
            counter: true,
            colorChart: colorForChart,
            dataForChart: dataForChart,
            borderColor: borderColor,
            lastElementForChart: lastelement
          });
        } else {
          this.setState({ dataForChart: dataForChart });
        }
      })
      .catch(err => console.log(err));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currencyValueNow) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currencyValueNow !== this.props.currencyValueNow) {
      this.getData(
        this.props.currencyName,
        this.props.indexForColor,
        this.props.currencyValueNow
      );
    }
  }
  render() {
    return (
      <div className="chart">
        <Line
          data={{
            labels: [
              this.fourDay,
              this.threeDay,
              this.twoDay,
              this.oneDay,
              this.now
            ],
            datasets: [
              {
                borderWidth: 1.5,
                fill: "origin",
                vLine: "true",
                showOnTop: "1",
                lineTension: 0.3,
                backgroundColor: this.state.colorChart,
                borderColor: this.state.borderColor,
                borderWidth: 0.7,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "white",
                pointBackgroundColor: this.state.colorChart,
                pointBorderWidth: 5,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: this.state.borderColor,
                pointHoverBorderColor: "white",
                pointHoverBorderWidth: 1.4,
                pointRadius: 0,
                pointHitRadius: 3,
                ticks: { display: false },
                data: this.state.dataForChart
              }
            ]
          }}
          options={{
            tooltips: {
              mode: "index"
            },
            responsive: true,
            maintainAspectRatio: false,

            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "#0081ff94",
                    fontSize: 10,
                    stepSize: 1,
                    beginAtZero: true,
                    fontFamily:"'Gentium Basic', serif;"
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    fontWeight:"lighter",
                    fontFamily:"'Gentium Basic', serif;",
                    fontColor: "#0081ff94",
                    fontSize: 9,
                    stepSize: 1,
                    beginAtZero: false
                  },
                  gridLines: {
                    display: false
                  }
                }
              ]
            },

            title: {
              display: true,
              text: "Base 1 dollar ",
              fontSize: 9,
              fontColor: "#e5e5e5"
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}
export default Chart;
