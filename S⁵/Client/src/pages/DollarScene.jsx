import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Dollar from '../../public/Dollar';

function AnimatedDollar() {
  const modelRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX / innerWidth) * 2 - 1)*0.2;
      const y = (-(event.clientY / innerHeight) * 2 + 1)*0.2;
      targetPosition.current.set(x * 2, y * 1.5, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className='relative'>
      {/* navbarcomponent */}
      <div className='absolute w-full h-[5vw] bg-amber-900'>

      </div>
      {/* contentcomponent */}
      <div className='absolute z-9 top-[40%] left-[5%] w-[36vw] h-[20vw] '>
        <div className='w-[100%] h-[30%]   flex items-end justify-center'>
          <h1 className='text-[7vw] italic text-[#734f96]  top-[0%] font-[300]'>Introducing Airth</h1>
        </div>
        <div className='relative w-[100%] h-[70%] bg-blue-600 overflow-hidden flex items-start justify-center'>
          <h3 className='text-[3vw] text-white absolute top-[0%] text-center'>
            Manage your personal finance and etc
          </h3>
        </div>
      </div>
      {/* modelcomponent */}
      <div className="w-screen h-[75vw] bg-black flex items-center justify-center pr-5vw">
        <Canvas className="w-screen h-screen scale-100" camera={{ position: [3, 2, 7], fov: 70 }}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={5} color="blue" />
          <pointLight position={[-5, -5, -5]} intensity={5} color="blue" />
          <pointLight position={[0, 0, -5]} intensity={5} color="blue" />
          <OrbitControls enableZoom={false} />
          <Suspense fallback={null}>
            <AnimatedDollar />
          </Suspense>
          <Environment preset='sunset' />
          <EffectComposer>
            <Bloom intensity={0.8} luminanceThreshold={0.1} luminanceSmoothing={1} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}