import React, { Component } from "react";
import Chart from "react-apexcharts";

class SemiCircleGaugeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          radialBar: {
            startAngle:-90,
            endAngle: 90,
            hollow: {
              size: "70%",
            },
            dataLabels: {
              value: {
                show: false,
              },
            },
            track: {
              background: "#e0e0e0",
              strokeWidth: "97%",
              margin: 5,
            },
          },
        },
        fill: {
          type: "solid",
          colors: ["#20E647"],
        },
       
        stroke: {
          lineCap: "round",
        },
        
      },
      series: [70], // Set the value of the gauge
    };
  }

  render() {
    return (
      <div>
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
      </div>
    );
  }
}

export default SemiCircleGaugeChart;
