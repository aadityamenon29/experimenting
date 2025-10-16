import { useRef } from 'react'
import * as THREE from 'three'

export default function TrainInterior() {
  return (
    <group>
      <Floor />
      <Walls />
      <Ceiling />
      <Windows />
      <Seats />
      <Door />
      <Luggage />
    </group>
  )
}

function Floor() {
  return (
    <mesh receiveShadow position={[0, 0, -4]}>
      <boxGeometry args={[4, 0.1, 16]} />
      <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.7} />
    </mesh>
  )
}

function Walls() {
  return (
    <>
      <mesh position={[-2, 1.5, -4]} receiveShadow>
        <boxGeometry args={[0.1, 3, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      
      <mesh position={[2, 1.5, -4]} receiveShadow>
        <boxGeometry args={[0.1, 3, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      
      <mesh position={[0, 1.5, -12]} receiveShadow>
        <boxGeometry args={[4, 3, 0.1]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </>
  )
}

function Ceiling() {
  return (
    <>
      <mesh receiveShadow position={[0, 3, -4]}>
        <boxGeometry args={[4, 0.1, 16]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      
      <mesh position={[-0.8, 2.9, -2]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#fff8e1" emissive="#fff8e1" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.8, 2.9, -2]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#fff8e1" emissive="#fff8e1" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[-0.8, 2.9, -6]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#fff8e1" emissive="#fff8e1" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.8, 2.9, -6]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#fff8e1" emissive="#fff8e1" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[-0.8, 2.9, -10]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#fff8e1" emissive="#fff8e1" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.8, 2.9, -10]}>
        <boxGeometry args={[0.3, 0.05, 0.8]} />
        <meshStandardMaterial color="#fff8e1" emissive="#fff8e1" emissiveIntensity={0.5} />
      </mesh>
    </>
  )
}

function Windows() {
  const windowPositions = [-1, -3, -5, -7, -9, -11]
  
  return (
    <>
      {windowPositions.map((z, i) => (
        <group key={`window-left-${i}`}>
          <mesh position={[-1.95, 1.8, z]} castShadow>
            <boxGeometry args={[0.05, 1.2, 1.2]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[-1.92, 1.8, z]}>
            <boxGeometry args={[0.02, 1.25, 0.02]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
        </group>
      ))}
      
      {windowPositions.map((z, i) => (
        <group key={`window-right-${i}`}>
          <mesh position={[1.95, 1.8, z]} castShadow>
            <boxGeometry args={[0.05, 1.2, 1.2]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              transparent 
              opacity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[1.92, 1.8, z]}>
            <boxGeometry args={[0.02, 1.25, 0.02]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Seats() {
  const seatRows = [
    { z: -2, side: 'both' },
    { z: -4.5, side: 'both' },
    { z: -7, side: 'both' },
    { z: -9.5, side: 'both' }
  ]
  
  return (
    <>
      {seatRows.map((row, i) => (
        <group key={i}>
          {(row.side === 'both' || row.side === 'left') && (
            <Seat position={[-1.3, 0.4, row.z]} rotation={[0, Math.PI / 2, 0]} />
          )}
          {(row.side === 'both' || row.side === 'right') && (
            <Seat position={[1.3, 0.4, row.z]} rotation={[0, -Math.PI / 2, 0]} />
          )}
        </group>
      ))}
    </>
  )
}

function Seat({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#4299e1" />
      </mesh>
      <mesh position={[0, 0.3, -0.2]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#4299e1" />
      </mesh>
    </group>
  )
}

function Door() {
  return (
    <group position={[1, 1, 3.5]}>
      <mesh>
        <boxGeometry args={[0.8, 2, 0.1]} />
        <meshStandardMaterial color="#718096" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, 0, 0.06]}>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Luggage() {
  return (
    <>
      <mesh position={[-1.5, 2.5, -3]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.6]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[1.5, 2.5, -8]} castShadow>
        <boxGeometry args={[0.35, 0.25, 0.5]} />
        <meshStandardMaterial color="#2c5282" />
      </mesh>
    </>
  )
}
