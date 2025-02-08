import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS for toast notifications
import '../style/sensor.css';

function Sensor() {
    const [value, setValue] = useState(false);

    const sensor = () => {
        toast("Animal detected");
    };

    useEffect(() => {
        const fetchData = () => {
            fetch('https://falcon-9bb9e-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data.Motion);
                    // Assuming data.Motion is a boolean or can be interpreted as one
                    if (data.Motion) {
                        setValue(true); // Set value to true if motion is detected
                        sensor(); // Call the sensor function to show the toast
                    } else {
                        setValue(false); // Set value to false if no motion
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData(); // Call the fetch function
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='container' id='sensor'>
                <h1>{value ? 'Sensor Detection' : 'Animal Detection Buzzer'}</h1>
                <div className="card">
                    {value ? (
                        <div className="card-body">ALERT</div>
                    ) : (
                        <motion.div animate={{ scale: 1.2 }} className="card-body1">
                            <h1>SAFE</h1>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Sensor;