import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./Pomodoro.css"; // Import external CSS file

const Pomodoro = () => {
  const [minCount, setMinCount] = useState(24);
  const [count, setCount] = useState(59);
  const [active, setActive] = useState("focus");
  const [paused, setPaused] = useState(true);
  const [timerInterval, setTimerInterval] = useState(null);
  const [bgMusicState, setBgMusicState] = useState(null);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const music = new Audio("/audio/music.mp3");
    music.loop = true;
    setBgMusicState(music);
    return () => {
      if (music) music.pause();
    };
  }, []);

  const appendZero = (value) => (value < 10 ? "0" + value : value);

  const handleStart = () => {
    if (paused) {
      setPaused(false);
      setShowNav(false);
      bgMusicState.play();
      document.documentElement.requestFullscreen().catch(err => console.log("Fullscreen Error: ", err));
      setTimerInterval(
        setInterval(() => {
          setCount((prevCount) => {
            if (prevCount === 0) {
              if (minCount !== 0) {
                setMinCount((prevMin) => prevMin - 1);
                return 59;
              } else {
                clearInterval(timerInterval);
                bgMusicState.pause();
                return prevCount;
              }
            }
            return prevCount - 1;
          });
        }, 1000)
      );
    }
  };

  const handlePause = () => {
    setPaused(true);
    clearInterval(timerInterval);
    bgMusicState.pause();
  };

  const handleReset = () => {
    handlePause();
    setShowNav(true);
    setMinCount(active === "focus" ? 24 : active === "short" ? 4 : 14);
    setCount(59);
    document.exitFullscreen().catch(err => console.log("Exit Fullscreen Error: ", err));
  };

  const handleModeChange = (mode) => {
    setActive(mode);
    handleReset();
    setMinCount(mode === "focus" ? 24 : mode === "short" ? 4 : 14);
  };

  return (
    <div className="pomodoro-container">
      {showNav}
      <div className="pomodoro-card">
        {/* Mode Selection Buttons */}
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${active === "focus" ? "active-mode" : ""}`}
            onClick={() => handleModeChange("focus")}
          >
            Focus
          </button>
          <button 
            className={`mode-btn ${active === "short" ? "active-mode" : ""}`}
            onClick={() => handleModeChange("short")}
          >
            Short Break
          </button>
          <button 
            className={`mode-btn ${active === "long" ? "active-mode" : ""}`}
            onClick={() => handleModeChange("long")}
          >
            Long Break
          </button>
        </div>
        {/* Timer Display */}
        <h1 className="timer-display">
          {appendZero(minCount)}:{appendZero(count)}
        </h1>
        {/* Control Buttons */}
        <div className="control-buttons">
          <button className="control-btn" onClick={handleStart}>Start</button>
          <button className="control-btn" onClick={handlePause}>Pause</button>
          <button className="control-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;








// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar";

// const Pomodoro = () => {
//   const [minCount, setMinCount] = useState(24); 
//   const [count, setCount] = useState(59); 
//   const [active, setActive] = useState("focus"); 
//   const [paused, setPaused] = useState(true); 
//   const [timerInterval, setTimerInterval] = useState(null); 
//   const [bgMusicState, setBgMusicState] = useState(null); 
//   const [showNav, setShowNav] = useState(true);

//   useEffect(() => {
//     const music = new Audio("/audio/music.mp3");
//     music.loop = true;
//     setBgMusicState(music);
//     return () => {
//       if (music) music.pause();
//     };
//   }, []);

//   const appendZero = (value) => (value < 10 ? "0" + value : value);

//   const handleStart = () => {
//     if (paused) {
//       setPaused(false);
//       setShowNav(false);
//       bgMusicState.play();
//       document.documentElement.requestFullscreen().catch(err => console.log("Fullscreen Error: ", err));
//       setTimerInterval(
//         setInterval(() => {
//           setCount((prevCount) => {
//             if (prevCount === 0) {
//               if (minCount !== 0) {
//                 setMinCount((prevMin) => prevMin - 1);
//                 return 59;
//               } else {
//                 clearInterval(timerInterval);
//                 bgMusicState.pause();
//                 return prevCount;
//               }
//             }
//             return prevCount - 1;
//           });
//         }, 1000)
//       );
//     }
//   };

//   const handlePause = () => {
//     setPaused(true);
//     clearInterval(timerInterval);
//     bgMusicState.pause();
//   };

//   const handleReset = () => {
//     handlePause();
//     setShowNav(true);
//     setMinCount(active === "focus" ? 24 : active === "short" ? 4 : 14);
//     setCount(59);
//     document.exitFullscreen().catch(err => console.log("Exit Fullscreen Error: ", err));
//   };

//   const handleModeChange = (mode) => {
//     setActive(mode);
//     handleReset();
//     setMinCount(mode === "focus" ? 24 : mode === "short" ? 4 : 14);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-cover bg-center bg-fixed z-50" 
//       style={{ backgroundImage: "url('./img/tree.jpg')" }}>
//       {showNav && <Navbar />}
//       <div className="p-6 w-80 sm:w-96 rounded-lg text-center backdrop-blur-lg bg-white/10 border border-white/20">
//         {/* Mode Selection Buttons */}
//         <div className="flex justify-center gap-3 mb-4">
//           <button 
//             className={`px-4 py-2 rounded text-white transition ${
//               active === "focus" ? "bg-yellow-400" : "bg-gray-900"
//             }`} 
//             onClick={() => handleModeChange("focus")}
//           >
//             Focus
//           </button>
//           <button 
//             className={`px-4 py-2 rounded text-white transition ${
//               active === "short" ? "bg-yellow-400" : "bg-gray-900"
//             }`} 
//             onClick={() => handleModeChange("short")}
//           >
//             Short Break
//           </button>
//           <button 
//             className={`px-4 py-2 rounded text-white transition ${
//               active === "long" ? "bg-yellow-400" : "bg-gray-900"
//             }`} 
//             onClick={() => handleModeChange("long")}
//           >
//             Long Break
//           </button>
//         </div>
//         {/* Timer Display */}
//         <h1 className="text-6xl text-white font-bold tracking-wider">
//           {appendZero(minCount)}:{appendZero(count)}
//         </h1>
//         {/* Control Buttons */}
//         <div className="flex justify-center gap-4 mt-5">
//           <button 
//             className="bg-white text-red-600 px-4 py-2 rounded shadow-md transition hover:bg-gray-200"
//             onClick={handleStart}
//           >
//             Start
//           </button>
//           <button 
//             className="bg-white text-red-600 px-4 py-2 rounded shadow-md transition hover:bg-gray-200"
//             onClick={handlePause}
//           >
//             Pause
//           </button>
//           <button 
//             className="bg-white text-red-600 px-4 py-2 rounded shadow-md transition hover:bg-gray-200"
//             onClick={handleReset}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pomodoro;
