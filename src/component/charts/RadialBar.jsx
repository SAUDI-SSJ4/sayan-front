// RadialBarChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = () => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
        
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
            margin: 30,
            size: '50%',
            background: 'transparent',
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: 'back',
        
        },
        track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: 'treansparent',
            strokeWidth: '97%',
            opacity: 1,
            margin: 5, 
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
            }
        },
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              // You can customize the total label
              return 249;
            },
          },
        },
        barHeight: '80%', // Adjust the barHeight to control the gap between bars
      },
    },
    labels: ['Apples', 'Oranges', 'Berries'],
    stroke: {
      lineCap: 'round',
    },
    colors: ['#1E02AA', '#FF4747', '#EFEFFF'], // Add your custom colors here
  };

  const series = [44, 20, 100];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="radialBar" height={250} />
    </div>
  );
};

export default RadialBarChart;
