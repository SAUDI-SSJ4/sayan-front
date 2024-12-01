import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


export default function AreaChartNormal({color,borderColor,borderRadius}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false, // Hide legend
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
   
    scales: {
      x: {
        display: false, // Hide X-axis
      },
      y: {
        display: false, // Hide Y-axis
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        borderRadius: 10, // Add border radius
      },
     
      point : {
          pointStyle:false
        }
    },
  };
  
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "ad",
    "dsa",
    "sda",
    "dasd",
    "ad",
  ];
  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: 700, max: 1000 })),
        borderColor:borderColor,
        backgroundColor: color,
      },
     
    ],
  };
  
  return <Line width={'100%'} style={{maxHeight:'80px'}} options={options} data={data} />;
}
