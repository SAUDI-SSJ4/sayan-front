import React, { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const RadialBarChart = () => {
    const options = {
        series: [70],
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            },
          },
        },
        labels: ['Cricket'],
        stroke: {
            lineCap: 'round'
          },
      };
   // Empty dependency array ensures this effect runs only once on mount

  return (
    <div id="chart">
      {/* The chart will be rendered inside this div */}
      <ApexCharts options={options} series={options.series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialBarChart;
