import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import TrainInterior from "./TrainInterior";
import Passengers from "./Passengers";
import * as THREE from "three";

export default function TrainScene() {
  const trainRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (trainRef.current) {
      trainRef.current.position.y = Math.sin(t * 0.5) * 0.02;
      trainRef.current.rotation.z = Math.sin(t * 0.3) * 0.005;
    }
  });

  return (
    <>
      <color attach="background" args={["#87CEEB"]} />
      <fog attach="fog" args={["#87CEEB", 10, 50]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#fff8e1" />
      <pointLight position={[0, 2, -8]} intensity={0.5} color="#fff8e1" />

      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />

      <group ref={trainRef}>
        <TrainInterior />
        <Passengers />
      </group>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 1.2, -4]}
      />
    </>
  );
}
