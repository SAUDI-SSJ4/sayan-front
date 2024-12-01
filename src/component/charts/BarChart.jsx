import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: ["Category 1", "Category 2", "Category 3", "Category 4"],
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20px", // Set the width of the bars to 20%
          },
        },
        fill: {
          colors: ["#EAEFF4"], // Set the color of the bars
        },
        annotations: {
          points: [
            {
              x: "Category 1",
              y: 30,
              marker: {
                size: 10,
                fillColor: "#FF718B", // Set the color of the markers (black)
                strokeColor: "#ffffff", // Set the stroke color of the markers (white)
                strokeWidth: 2,
              },
            },
            {
              x: "Category 2",
              y: 40,
                marker: {
                size: 10,
                fillColor: "#FF718B", // Set the color of the markers (black)
                strokeColor: "#ffffff", // Set the stroke color of the markers (white)
                strokeWidth: 2,
              },
            },
            {
              x: "Category 3",
              y: 45,
                marker: {
                size: 10,
                fillColor: "#FF718B", // Set the color of the markers (black)
                strokeColor: "#ffffff", // Set the stroke color of the markers (white)
                strokeWidth: 2,
              },
            },
            {
              x: "Category 4",
              y: 50,
                marker: {
                size: 10,
                fillColor: "#FF718B", // Set the color of the markers (black)
                strokeColor: "#ffffff", // Set the stroke color of the markers (white)
                strokeWidth: 2,
              },
            },
          ],
        },
      },
      series: [
        {
          name: "Series 1",
          data: [30, 40, 45, 50],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default BarChart;
