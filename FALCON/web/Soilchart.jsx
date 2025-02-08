// src/SoilChart.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../style/SoilChart.css'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SoilChart = () => {
  const [send,setsend]=useState(40);
  const [moisture, setmoisture] = useState();
  const data = {
    
    labels: ['Sand', 'Silt', 'Clay', 'Organic Matter', 'Moisture Content'],
    datasets: [
      {
        label: 'Soil Composition (%)',
        data: [30, 25, 20, 15, 10], // Example data
        backgroundColor: [
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderColor: [
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
       
      },
    },
  };

  return <>
    <div className="chart-container1 "id='soil'>
      <h1>Soil Ingredients and Moisture Check</h1>
      <Bar className='chart1' data={data} options={options} />
    </div>
    </>
};

export default SoilChart;