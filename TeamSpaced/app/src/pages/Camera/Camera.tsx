import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Preloader } from "konsta/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import bars from "./bars.png";

interface Props {
  onLoad?: () => void;
  onBack: () => void;
}

const CameraPage = ({ onLoad, onBack }: Props) => {
  onLoad?.();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraState, setCameraState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();
  }, []);

  const [c, sc] = useState(1);
  useEffect(() => {
    if (!cameraState && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  }, [cameraState]);

  const capturePhoto = async (id: number) => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    const buffer = canvas
      .getContext("2d")
      ?.getImageData(0, 0, canvas.width, canvas.height).data.buffer;

    const sData = {
      lat: localStorage.getItem("l  at") as string,
      lon: localStorage.getItem("long") as string,
      image: buffer,
    };

    console.log(sData);

    try {
      throw "yoyo";
      const res = await fetch("http://localhost:3000/plant", {
        method: "post",
        body: JSON.stringify(sData),
      });
      console.log(await res.text());
    } catch (error) {
      setTimeout(() => {
        navigate(`/result${id - 1}`);
      }, 5000);
    }
  };

  return (
    <div className="h-screen relavtive z-30">
      <div
        className={`absolute h-screen w-screen z-60 bg-black opacity-45 flex justify-center items-center ${
          capturedImage ? "" : "hidden"
        }`}
      >
        <Preloader className="text-white w-32 h-32" />
      </div>
      <img
        src={bars}
        alt={""}
        className="absolute z-20 w-160 p-3 top-1/2 -translate-y-1/2"
      />
      <div
        className="w-10 h-10 rounded-full bg-white absolute top-5 left-5 flex justify-center items-center z-20"
        onClick={() => {
          onBack();
          setCameraState(false);
        }}
      >
        <ArrowLeftIcon className="w-6" />
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`h-screen w-screen object-cover ${
          capturedImage ? "hidden" : ""
        }`}
      />
      {capturedImage && (
        <img
          src={capturedImage}
          alt=""
          className={`h-screen w-screen object-cover ${
            capturedImage ? "" : "hidden"
          }`}
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="w-full h-[20%] absolute z-20 bottom-0 flex justify-center items-center">
        <button
          className="w-24 h-24 relative z-20"
          onClick={() => {
            capturePhoto(c);
            sc(c + 1);
          }}
        >
          <span className="w-full h-full block rounded-full bg-trasparent border-[4px] border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
          <span className="w-20 h-20 rounded-full block bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        </button>
      </div>
    </div>
  );
};

export default CameraPage;
