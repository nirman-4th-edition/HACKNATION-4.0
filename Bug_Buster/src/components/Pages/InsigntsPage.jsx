/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import Navbar from "../HomeComps/Navbar";
import { BsArrowUpRight } from "react-icons/bs";

const InsightsPage = () => {
  const [fireStatus, setFireStatus] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [notificationSent, setNotificationSent] = useState(false); // Track notification
  const fireAlarmRef = useRef(null); // Reference for fire alarm audio
  const allClearRef = useRef(null); // Reference for all-clear audio

  useEffect(
    () => {
      const fireRef = ref(database, "commands/object");
      const videoRef = ref(database, "video/url");

      onValue(fireRef, snapshot => {
        const status = snapshot.val();
        if (status === 1 && !notificationSent) {
          // sendSMSNotification(
          //   "🔥 There has been a fire detected in your property. http://192.168.230.248"
          // );
          setNotificationSent(true);
          // Play fire alarm sound
          fireAlarmRef.current.play();
        } else if (status === 0 && fireStatus === 1 && notificationSent) {
          // sendSMSNotification(
          //   "💦🚿🚿 The fire has been dealt with successfully."
          // );
          setNotificationSent(false);
          // Stop fire alarm and play all-clear sound
          fireAlarmRef.current.pause();
          fireAlarmRef.current.currentTime = 0; // Reset playback time
          allClearRef.current.play(); // Play all-clear sound
          setTimeout(() => {
            allClearRef.current.pause(); // Stop after a certain duration
            allClearRef.current.currentTime = 0; // Reset playback time
          }, 5000); // Play for 5 seconds
        }

        setFireStatus(status);
      });

      onValue(videoRef, snapshot => {
        setVideoUrl(snapshot.val());
      });
    },
    [fireStatus, notificationSent]
  );

  const sendSMSNotification = async message => {
    try {
      const response = await fetch("http://localhost:5000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          to: "+917064209559"
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log("SMS sent successfully:", data.sid);
      } else {
        console.error("Failed to send SMS:", data.error);
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div className="w-screen bg-[url('https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] brightness-90 text-white min-h-screen">
      <Navbar />
      <div className="flex relative top-32 h-full w-full px-10">
        <div className="flex flex-col gap-6 justify-start items-start w-fit">
          <div className="relative w-[1024px] h-[576px] bg-black rounded-2xl ">
            <iframe
              src="http://192.168.230.248/"
              className="bg-cover w-[1024px] bg-center h-full object-cover"
              allowFullScreen
            />
          </div>
          <div className="VideoTitle w-full h-20 p-2 rounded-xl">
            <h1 className="text-2xl font-semibold">
              Real-time video Demonstration of Cam 32. Used by our Hardware to
              maximize your safety; you can always watch over it.
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full px-12 py-2">
          <div className="text-info mb-6">
            <h1 className="text-4xl font-semibold leading-[3rem]">
              Did you know you can control your Hardware remotely?
            </h1>
            <p className="text-2xl text-gray-900 py-5 pr-20 mt-2">
              Remotely controlling hardware enhances convenience, efficiency,
              and safety. Whether for home security, industrial monitoring, or
              smart city management, our solutions ensure you’re always in
              control, no matter where you are.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <button className="bg-white w-52 flex items-center justify-center gap-5 uppercase text-lg text-black py-2 px-4 rounded-full font-bold">
                <a href="/Remote">Direct Link </a>
                <BsArrowUpRight className="font-bold text-white h-10 w-10 p-2 bg-black rounded-full" />
              </button>
              <button className="bg-[#E7E700] w-40 text-black py-3 px-4 rounded-full font-bold">
                WWW
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Audio elements for alarms */}
      <audio ref={fireAlarmRef} src="/public/musicFireDet.mp3" loop />
      <audio ref={allClearRef} src="/public/musicFireExe.mp3" />
    </div>
  );
};

export default InsightsPage;
