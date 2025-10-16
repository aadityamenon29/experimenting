import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Passengers() {
  return (
    <group>
      <BusinessMan position={[-1.3, 0.9, -2]} />
      <Student position={[1.3, 0.9, -2]} />
      <Elderly position={[-1.3, 0.9, -4.5]} />
      <Mother position={[1.3, 0.9, -4.5]} />
      <Child position={[1.6, 0.6, -4.5]} />
      <Worker position={[-1.3, 0.9, -7]} />
      <Tourist position={[1.3, 0.9, -7]} />
      <Doctor position={[-1.3, 0.9, -9.5]} />
      <Artist position={[1.3, 0.9, -9.5]} />
    </group>
  )
}

function BusinessMan({ position }) {
  const groupRef = useRef()
  const laptopRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children[0].rotation.x = Math.sin(t * 2) * 0.05 + 0.1
    }
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(t * 3) * 0.02
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.3]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[-0.25, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      <mesh position={[0.25, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      
      <group ref={laptopRef} position={[0, 0.15, 0.15]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.02, 0.18]} />
          <meshStandardMaterial color="#718096" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.09, -0.07]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.18, 0.02]} />
          <meshStandardMaterial color="#2d3748" emissive="#4299e1" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  )
}

function Student({ position }) {
  const groupRef = useRef()
  const bookRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (bookRef.current) {
      bookRef.current.rotation.x = Math.sin(t * 1.5) * 0.05 - 0.3
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.35, 0.5, 0.3]} />
        <meshStandardMaterial color="#48bb78" />
      </mesh>
      
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <group ref={bookRef} position={[0, 0.25, 0.2]} rotation={[-0.3, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.2, 0.02]} />
          <meshStandardMaterial color="#e53e3e" />
        </mesh>
      </group>
      
      <mesh position={[0.15, 0.6, 0.15]} castShadow>
        <boxGeometry args={[0.25, 0.2, 0.2]} />
        <meshStandardMaterial color="#4299e1" />
      </mesh>
    </group>
  )
}

function Elderly({ position }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children[0].rotation.x = Math.sin(t * 0.8) * 0.03
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.35]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0.3, 0.1, 0.2]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      <mesh position={[0, 0.76, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#d3d3d3" />
      </mesh>
    </group>
  )
}

function Mother({ position }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children[0].rotation.z = Math.sin(t * 1.2) * 0.08
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.35, 0.55, 0.3]} />
        <meshStandardMaterial color="#ed64a6" />
      </mesh>
      
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <mesh position={[0, 0.2, 0.15]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#f6ad55" />
      </mesh>
    </group>
  )
}

function Child({ position }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.05
      groupRef.current.rotation.y = Math.sin(t * 1.5) * 0.2
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#fc8181" />
      </mesh>
      
      <mesh position={[0, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0.15, 0.2, 0.1]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  )
}

function Worker({ position }) {
  const groupRef = useRef()
  const toolRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (toolRef.current) {
      toolRef.current.rotation.z = Math.sin(t * 2.5) * 0.3
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.55, 0.3]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.08, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      <group ref={toolRef} position={[0.25, 0.25, 0.15]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.05, 0.05]} />
          <meshStandardMaterial color="#718096" metalness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

function Tourist({ position }) {
  const groupRef = useRef()
  const cameraRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (cameraRef.current) {
      cameraRef.current.rotation.y = Math.sin(t * 1.8) * 0.4
      cameraRef.current.rotation.x = Math.sin(t * 1.3) * 0.2 - 0.2
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.38, 0.52, 0.3]} />
        <meshStandardMaterial color="#38b2ac" />
      </mesh>
      
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.13, 0.06, 16]} />
        <meshStandardMaterial color="#e53e3e" />
      </mesh>
      
      <group ref={cameraRef} position={[0, 0.5, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.08, 0.08]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>
        <mesh position={[0, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
      </group>
    </group>
  )
}

function Doctor({ position }) {
  const groupRef = useRef()
  const clipboardRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (clipboardRef.current) {
      clipboardRef.current.rotation.x = Math.sin(t * 1.2) * 0.08 - 0.5
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.58, 0.3]} />
        <meshStandardMaterial color="#f7fafc" />
      </mesh>
      
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0, 0.45, 0.12]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 16]} />
        <meshStandardMaterial color="#3182ce" />
      </mesh>
      
      <group ref={clipboardRef} position={[0, 0.25, 0.2]} rotation={[-0.5, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.22, 0.01]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      </group>
    </group>
  )
}

function Artist({ position }) {
  const groupRef = useRef()
  const brushRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (brushRef.current) {
      brushRef.current.rotation.z = Math.sin(t * 2.2) * 0.4 + 0.3
      brushRef.current.position.x = Math.sin(t * 2.2) * 0.05 + 0.2
    }
  })
  
  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.38, 0.55, 0.3]} />
        <meshStandardMaterial color="#805ad5" />
      </mesh>
      
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#ffd1a3" />
      </mesh>
      
      <mesh position={[0, 0.73, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      
      <mesh position={[-0.2, 0.25, 0.15]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.18, 0.24, 0.02]} />
        <meshStandardMaterial color="#f7fafc" />
      </mesh>
      
      <group ref={brushRef} position={[0.2, 0.35, 0.15]} rotation={[0, 0, 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <coneGeometry args={[0.02, 0.04, 8]} />
          <meshStandardMaterial color="#e53e3e" />
        </mesh>
      </group>
    </group>
  )
}
