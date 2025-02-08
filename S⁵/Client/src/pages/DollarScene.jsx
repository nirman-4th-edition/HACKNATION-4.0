import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Dollar from "../../public/Dollar";

function AnimatedDollar() {
  const modelRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX / innerWidth) * 2 - 1) * 0.2;
      const y = (-(event.clientY / innerHeight) * 2 + 1) * 0.2;
      targetPosition.current.set(x * 2, y * 1.5, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.lerp(targetPosition.current, 0.1);
    }
  });

  return (
    <group ref={modelRef}>
      <Dollar scale={[1.7, 1.7, 1.7]} />
    </group>
  );
}

export default function DollarScene() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Text */}
      {/* <h1 className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[12vw] font-bold opacity-20 whitespace-nowrap">
        AIrth
      </h1> */}
      {/* 3D Model Section */}
      <div className="w-screen h-[75vw] bg-black flex items-center justify-center relative z-10">
        <Canvas
          className="w-[100vw] h-[100vh] scale-100"
          camera={{ position: [3, 2, 7], fov: 70 }}
        >
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={5} color="green" />
          <pointLight position={[-5, -5, -5]} intensity={5} color="green" />
          <pointLight position={[0, 0, -5]} intensity={5} color="green" />
          <OrbitControls enableZoom={false} />

          <Suspense fallback={null}>
            <AnimatedDollar />
          </Suspense>
          <Environment preset="sunset" />
          <EffectComposer>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.1}
              luminanceSmoothing={1}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}