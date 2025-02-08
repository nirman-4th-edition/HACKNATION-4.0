import { useState, useEffect, useRef } from "react";
import {
  Settings,
  Power,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Mic
} from "lucide-react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP_woqgsF4RpHOl56pbczSVc6CVuP95rM",
  authDomain: "ai-vechile.firebaseapp.com",
  databaseURL: "https://ai-vechile-default-rtdb.firebaseio.com",
  projectId: "ai-vechile",
  storageBucket: "ai-vechile.appspot.com",
  messagingSenderId: "486008885410",
  appId: "1:486008885410:web:2799b4957bafcffb27c7fb",
  measurementId: "G-WQC5VEM4FK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function GameController() {
  const [valueX, setX] = useState(0);
  const [valueY, setY] = useState(0);
  const [firebaseX, setFirebaseX] = useState(0);
  const [firebaseY, setFirebaseY] = useState(0);
  const [activeButton, setActiveButton] = useState("");
  const speed = 100;
  const intervalRef = useRef(null);

  // Voice recognition setup
  const recognitionRef = useRef(null);

  // Convert number words to numbers
  const wordToNumber = word => {
    const numberMap = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10
    };
    return numberMap[word.toLowerCase()] || parseInt(word, 10) || 0;
  };

  // Initialize Web Speech API for voice recognition
  useEffect(() => {
    recognitionRef.current = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = event => {
      const command = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(command);
    };

    recognitionRef.current.onerror = event => {
      console.log("Voice recognition error: " + event.error);
    };
  }, []);

  const startVoiceRecognition = () => {
    recognitionRef.current.start();
    console.log("Voice recognition started.");
  };

  const handleVoiceCommand = command => {
    console.log("User said: ", command);
    const commandParts = command.split(" ");

    // Get direction and number from command, handling various interpretations of words
    const directionMap = {
      up: "up",
      of: "up",
      off: "up",
      down: "down",
      left: "left",
      right: "right"
    };
    const direction = directionMap[commandParts[1]] || commandParts[1];
    const number = wordToNumber(commandParts[2]);

    switch (direction) {
      case "up":
        setY(prev => Math.min(prev + number, 90));
        break;
      case "down":
        setY(prev => Math.max(prev - number, 0));
        break;
      case "left":
        setX(prev => Math.max(prev - number, 0));
        break;
      case "right":
        setX(prev => Math.min(prev + number, 180));
        break;
      default:
        console.log("Unknown command.");
    }
  };

  const sendToFirebase = (x, y) => {
    set(ref(database, "commands/"), {
      dirX: x,
      dirY: y
    });
  };

  useEffect(
    () => {
      sendToFirebase(valueX, valueY);
    },
    [valueX, valueY]
  );

  useEffect(() => {
    const coordsRef = ref(database, "commands/");
    onValue(coordsRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        setFirebaseX(data.dirX);
        setFirebaseY(data.dirY);
      }
    });
  }, []);

  const handleMouseDown = (direction, isIncrease, buttonName) => {
    setActiveButton(buttonName);
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (direction === "x") {
        isIncrease
          ? setX(prev => Math.min(prev + 10, 180))
          : setX(prev => Math.max(prev - 10, 0));
      } else if (direction === "y") {
        isIncrease
          ? setY(prev => Math.min(prev + 10, 90))
          : setY(prev => Math.max(prev - 10, 0));
      }
    }, speed);
  };

  const handleMouseUp = () => {
    setActiveButton("");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetCoordinates = () => {
    setX(0);
    setY(0);
    sendToFirebase(0, 0);
  };

  return (
    <div className="bg-gray-900 text-white p-8 flex flex-col justify-between rounded-3xl max-w-[35rem] h-[45rem] relative top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-between mb-6">
        <button className="bg-gray-800 p-3 rounded-full">
          <Settings size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-1">Control</h2>
          <p className="text-xs text-gray-400">Setup</p>
        </div>
        <button
          className="bg-gray-700 p-3 rounded-full"
          onClick={resetCoordinates}
        >
          <Power size={24} />
        </button>
      </div>

      <div className="relative w-[20rem] h-[20rem] mx-auto mb-6">
        <div className="absolute inset-0 bg-gray-800 rounded-full" />
        <div className="absolute inset-2 bg-gray-700 rounded-full flex items-center justify-center">
          <button
            onClick={resetCoordinates}
            className="bg-gray-900 w-24 h-24 rounded-full flex items-center justify-center text-lg font-semibold"
          >
            Origin
          </button>
        </div>

        {/* Arrow controls */}
        <button
          onMouseDown={() => handleMouseDown("y", true, "up")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown("y", true, "up")}
          onTouchEnd={handleMouseUp}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 cursor-pointer rounded-full ${valueY ===
          90
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-white text-black"} ${activeButton === "up"
            ? "scale-110"
            : ""}`}
          disabled={valueY === 90}
        >
          <ArrowUp className="w-full h-full p-2" />
        </button>
        <button
          onMouseDown={() => handleMouseDown("y", false, "down")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown("y", false, "down")}
          onTouchEnd={handleMouseUp}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 cursor-pointer rounded-full ${valueY ===
          0
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-white text-black"} ${activeButton === "down"
            ? "scale-110"
            : ""}`}
          disabled={valueY === 0}
        >
          <ArrowDown className="w-full h-full p-2" />
        </button>
        <button
          onMouseDown={() => handleMouseDown("x", false, "left")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown("x", false, "left")}
          onTouchEnd={handleMouseUp}
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer rounded-full ${valueX ===
          0
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-white text-black"} ${activeButton === "left"
            ? "scale-110"
            : ""}`}
          disabled={valueX === 0}
        >
          <ArrowLeft className="w-full h-full p-2" />
        </button>
        <button
          onMouseDown={() => handleMouseDown("x", true, "right")}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown("x", true, "right")}
          onTouchEnd={handleMouseUp}
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer rounded-full ${valueX ===
          180
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-white text-black"} ${activeButton === "right"
            ? "scale-110"
            : ""}`}
          disabled={valueX === 180}
        >
          <ArrowRight className="w-full h-full p-2" />
        </button>
      </div>

      {/* Coordinates display */}
      <div className="text-center mb-6">
        <p className="text-xl font-semibold">Coordinates</p>
        <p className="text-lg">
          X: {firebaseX}, Y: {firebaseY}
        </p>
      </div>

      {/* Voice command button */}
      <div className="flex justify-center">
        <button
          onClick={startVoiceRecognition}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:scale-125 duration-500"
        >
          <Mic className="mr-2" /> Voice
        </button>
      </div>
    </div>
  );
}
