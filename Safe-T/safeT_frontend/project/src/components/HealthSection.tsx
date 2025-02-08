// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Heart, Thermometer, Activity } from 'lucide-react';
import { DashboardCard } from './DashboardCard';

interface UserHealth {
  id: string;
  name: string;
  bodyTemp: string;
  heartRate: number;
  spo2: number;
  status: 'normal' | 'warning' | 'danger';
}
// {
//   "heartRate": 0,
//     "spo2": -999,
//     "bodyTemp": 35.375,
//     "sos": false,
//     "envTemp": 32.5,
//     "humidity": 45,
//     "ledStatus": 1,
//     "aqi": 136.13
// }
export function HealthSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const users: UserHealth[] = [
    {
      id: '1',
      name: 'Ashish',
      bodyTemp: '36.5°C',
      heartRate: 75,
      spo2: 98,
      status: 'normal',
    },
    {
      id: '2',
      name: 'Pratyush',
      bodyTemp: '36.7°C',
      heartRate: 68,
      spo2: 99,
      status: 'normal',
    },
  ];

  return (
    <div className="space-y-6">

    </div>
  );
}
// for (let i = 1; i <= 8; i++) {
//   document.write(`
//                         <div class="status-box" onclick="toggleDetails(${i})">BAND${i} <div id="statusBar" class="status-bar"></div></div>
//                         <div class="details" id="details-${i}">
//                             BID: ${10000 + i}<br>Name: PERSON${i}<br>Gender: ${i % 2 === 0 ? 'MALE' : 'FEMALE'}<br>Age: ${20 + i}<br>Medical Conditions: ${i % 2 === 0 ? 'Hypertension' : 'Asthma'}
//                             <div class="info-box">Heart Rate: <span id = "heartrate"></span></div>
//                             <div  class="info-box">Temperature: <span id = "bodytemp"></span>°C</div>
//                             <div  class="info-box">sp02: <span id="spo2"></span></div>
//                         </div>
//                     `);
// }
//
// function toggleDetails(index) {
//   let details = document.getElementById(details-${index});
//   details.classList.toggle("show");
// }
//
//
// // Fetch Data from API every 5 seconds
// async function fetchData() {
//   try {
//     let response = await fetch("https://3b1vkr9w-8080.inc1.devtunnels.ms/admin/get-details", {
//       method: "GET"
//     });
//     let data = await response.json();
//     console.log(data)
//
//
//
//     document.getElementById("humidity").innerText = data.humidity;
//     document.getElementById("temperature").innerText = data.envTemp;
//     document.getElementById("aqi").innerText = data.aqi;
//
//     document.getElementById("heartrate").innerText = data.heartRate;
//     document.getElementById("bodytemp").innerText = data.bodyTemp;
//     document.getElementById("spo2").innerText = data.spo2;
//
//     const status = (data.ledStatus==0) ? "green" : (data.ledStatus == 1) ? "yellow" : "red";
//     console.log(status)
//     document.getElementById("statusBar").classList.add(status)
//
//
//     let sosButton = document.getElementById("sos-box");
//     if (data.sos) {
//       sosButton.classList.add("blinking");
//       new Audio('https://www.soundjay.com/button/beep-07.wav').play();
//     } else {
//       sosButton.classList.remove("blinking");
//     }
//
//
//
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
//
// setInterval(fetchData, 2000); // Refresh data every 5 seconds
// fetchData(); // Initial fetch
// </script>