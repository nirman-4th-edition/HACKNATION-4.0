// src/CircularChart.js
import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {child, get, getDatabase, ref} from 'firebase/database';
import { app } from '../firebase';
import {motion} from 'framer-motion'
import '../style/CircularChart.css'; // Import CSS for styling
import { collection, getDocs } from "firebase/firestore";


Chart.register(...registerables);

const CircularChart = () => {
  const [temperature, setTemperature] = useState(20); // Example initial value
  const [humidity, setHumidity] = useState(50); // Example initial value
  const [pressure, setPressure] = useState(10); // Example initial value
  const db=getDatabase(app);

  // Example data fetching function (replace with your data fetching logic)
  useEffect(() => {
    
    // Simulate fetching data
    const fetchData = () => {
      fetch('https://falcon-9bb9e-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    setTemperature(data.Weather.Tempreature); // Example temperature
    setHumidity(data.Weather.Humidity); // Example humidity
    setPressure(data.Weather.Pressure);// Handle the data as needed
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
      // Replace with your data fetching logic
      // Example pressure
    };

    fetchData();
  }, []);

  const createChartData = (value, maxValue) => {
    const percentage = (value / maxValue) * 100;
    return {
      labels: ['contain', 'Remaining'],
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: ['#5BE12C', '#e0e0e0'],
          borderWidth: 1,
        },
      ],
    };
  };

  return <>
    
    <div className="chart-container" id='weather'>
      
      <motion.div animate={{ x: 100 }} transition={{ type: "spring" }} layoutId="modal"  className="chart">
        <h3>Temperature</h3>
        <Doughnut data={createChartData(temperature, 100)} options={{ cutout: '70%' }} />
        <p>{temperature} °C</p>
      </motion.div>
      <motion.div animate={{ x: 100 }} transition={{ type: "spring" }} className="chart">
        <h3>Humidity</h3>
        <Doughnut data={createChartData(humidity, 100)} options={{ cutout: '70%' }} />
        <p>{humidity} %</p>
      </motion.div>
      <motion.div animate={{ x: 100 }} transition={{ type: "spring" }} className="chart">
        <h3>Pressure</h3>
        <Doughnut data={createChartData(pressure, 100)} options={{ cutout: '70%' }} />
        <p>{pressure} hPa</p>
      </motion.div>
    </div>
    </>
};

export default CircularChart;