// ToggleSwitch.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, onValue, set } from 'firebase/database';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const toggleRef = ref(database, 'toggleSwitch');

  useEffect(() => {
    // Listen for changes in the Firebase database
    onValue(toggleRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setIsOn(data);
      }
    });
  }, []);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    // Update the Firebase database
    set(toggleRef, newValue);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        {isOn ? 'ON' : 'OFF'}
      </label>
    </div>
  );
};

export default ToggleSwitch;