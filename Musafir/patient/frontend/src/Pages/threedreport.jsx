import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  const { scene } = useGLTF("/models/1.glb");
  return <primitive object={scene} scale={2.5} />;
};

// Skybox Component for Image-Based HDRI Effect
const Skybox = () => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "/textures/px.jpg", // Right
      "/textures/nx.jpg", // Left
      "/textures/py.jpg", // Top
      "/textures/ny.jpg", // Bottom
      "/textures/pz.jpg", // Front
      "/textures/nz.jpg", // Back
    ]);

    scene.background = texture;
  }, [scene]);

  return null;
};

const ThreeDReport = () => {
  return (
    <div style={{ width: "100%", height: "500px", background: "black" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <Skybox /> {/* Add Skybox for Image-Mapped HDRI Effect */}

        <Model />

        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
};

export default ThreeDReport;
