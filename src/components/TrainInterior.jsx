import { useMemo } from 'react'
import * as THREE from 'three'

const seatPalettes = [
  { z: -2, cushion: '#2a69c7', accent: '#163c82' },
  { z: -4.5, cushion: '#1f9d8f', accent: '#126a5e' },
  { z: -7, cushion: '#b553c2', accent: '#6e2d7a' },
  { z: -9.5, cushion: '#f27f3d', accent: '#a54614' }
]

export default function TrainInterior() {
  const seatRows = useMemo(() => seatPalettes, [])
  const windowPositions = useMemo(() => [-1.2, -2.8, -4.4, -6, -7.6, -9.2, -10.8], [])
  const lightingPositions = useMemo(() => [-1.5, -3.8, -6.1, -8.4, -10.7], [])

  return (
    <group>
      <TrainShell />
      <FloorSystem />
      <Doorway />
      <Handrails />
      <OverheadStorage />
      <InfoPanels />
      <Lighting positions={lightingPositions} />
      <Windows positions={windowPositions} />
      <Luggage />
      {seatRows.map((row, index) => (
        <SeatBlock key={`row-${row.z}`} row={row} index={index} />
      ))}
    </group>
  )
}

function TrainShell() {
  return (
    <group>
      <mesh position={[0, 1.35, -4]} receiveShadow>
        <boxGeometry args={[4.6, 2.7, 16.6]} />
        <meshStandardMaterial color="#1b2432" metalness={0.65} roughness={0.35} />
      </mesh>

      <mesh position={[0, 1.3, -4]}>
        <boxGeometry args={[4.25, 2.5, 16.2]} />
        <meshStandardMaterial color="#f2f5fa" roughness={0.9} side={THREE.BackSide} />
      </mesh>

      <mesh position={[0, 2.28, -4]} scale={[2.05, 0.62, 7.7]}>
        <sphereGeometry args={[1, 62, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d8e1ef" roughness={0.55} metalness={0.2} side={THREE.BackSide} />
      </mesh>

      <mesh position={[0, 1.1, -12]} receiveShadow>
        <boxGeometry args={[4.2, 2.4, 0.3]} />
        <meshStandardMaterial color="#d9e0ec" roughness={0.75} />
      </mesh>

      <mesh position={[0, 1.1, 3.8]} receiveShadow>
        <boxGeometry args={[4.2, 2.4, 0.3]} />
        <meshStandardMaterial color="#d9e0ec" roughness={0.75} />
      </mesh>

      <mesh position={[0, 2.5, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 12.5, 24]} />
        <meshStandardMaterial color="#c8d2e1" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

function FloorSystem() {
  const aisleMarkers = useMemo(() => [-2, -4.5, -7, -9.5], [])

  return (
    <group>
      <mesh receiveShadow position={[0, -0.025, -4]}>
        <boxGeometry args={[4.2, 0.05, 16.3]} />
        <meshStandardMaterial color="#1d2532" metalness={0.45} roughness={0.45} />
      </mesh>

      <mesh receiveShadow position={[0, 0, -4]}>
        <boxGeometry args={[0.96, 0.015, 16.1]} />
        <meshStandardMaterial color="#3c475a" roughness={0.55} metalness={0.2} />
      </mesh>

      <mesh receiveShadow position={[-1.45, 0.008, -4]}>
        <boxGeometry args={[1.25, 0.02, 16.1]} />
        <meshStandardMaterial color="#28303f" roughness={0.7} />
      </mesh>

      <mesh receiveShadow position={[1.45, 0.008, -4]}>
        <boxGeometry args={[1.25, 0.02, 16.1]} />
        <meshStandardMaterial color="#28303f" roughness={0.7} />
      </mesh>

      {aisleMarkers.map((z) => (
        <group key={`marker-${z}`} position={[0, 0.01, z]}>
          <mesh position={[0.62, 0, 0]}>
            <boxGeometry args={[0.14, 0.008, 0.5]} />
            <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[-0.62, 0, 0]}>
            <boxGeometry args={[0.14, 0.008, 0.5]} />
            <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -0.05, 3.4]}>
        <boxGeometry args={[4.2, 0.04, 0.9]} />
        <meshStandardMaterial color="#1b212c" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Lighting({ positions }) {
  return (
    <>
      {positions.map((z, index) => (
        <group key={`light-${index}`} position={[0, 2.48, z]}>
          <mesh castShadow>
            <boxGeometry args={[1.25, 0.08, 0.85]} />
            <meshStandardMaterial color="#f8fafc" emissive="#fffbd6" emissiveIntensity={0.7} roughness={0.2} />
          </mesh>
          <pointLight position={[0, -0.05, 0]} intensity={0.55} distance={3.4} color="#fff6d5" />
        </group>
      ))}
    </>
  )
}

function Windows({ positions }) {
  return (
    <>
      {positions.map((z, index) => (
        <group key={`window-left-${index}`}>
          <mesh position={[-2.04, 1.55, z]} castShadow>
            <boxGeometry args={[0.06, 1.45, 1.4]} />
            <meshStandardMaterial color="#1d2738" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[-2.01, 1.55, z]}>
            <boxGeometry args={[0.01, 1.22, 1.16]} />
            <meshStandardMaterial color="#9ac7dd" transparent opacity={0.4} metalness={0.85} roughness={0.08} />
          </mesh>
          <mesh position={[-1.98, 1.0, z]}>
            <boxGeometry args={[0.05, 0.32, 1.16]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[-2.01, 2.18, z]}>
            <boxGeometry args={[0.01, 0.1, 1.16]} />
            <meshStandardMaterial color="#f1f5f9" />
          </mesh>
        </group>
      ))}

      {positions.map((z, index) => (
        <group key={`window-right-${index}`}>
          <mesh position={[2.04, 1.55, z]} castShadow>
            <boxGeometry args={[0.06, 1.45, 1.4]} />
            <meshStandardMaterial color="#1d2738" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[2.01, 1.55, z]}>
            <boxGeometry args={[0.01, 1.22, 1.16]} />
            <meshStandardMaterial color="#9ac7dd" transparent opacity={0.4} metalness={0.85} roughness={0.08} />
          </mesh>
          <mesh position={[1.98, 1.0, z]}>
            <boxGeometry args={[0.05, 0.32, 1.16]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[2.01, 2.18, z]}>
            <boxGeometry args={[0.01, 0.1, 1.16]} />
            <meshStandardMaterial color="#f1f5f9" />
          </mesh>
        </group>
      ))}
    </>
  )
}

function SeatBlock({ row, index }) {
  const tableColor = index % 2 === 0 ? '#dfe6f3' : '#cfd7e5'

  return (
    <group position={[0, 0, row.z]}>
      <PremiumSeat
        position={[-1.35, 0.36, 0]}
        rotation={[0, Math.PI / 2, 0]}
        upholsteryColor={row.cushion}
        accentColor={row.accent}
      />
      <PremiumSeat
        position={[1.35, 0.36, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        upholsteryColor={row.cushion}
        accentColor={row.accent}
      />
      <SeatConsole color={tableColor} />
    </group>
  )
}

function PremiumSeat({ position, rotation, upholsteryColor, accentColor }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.1, 0.18]} castShadow>
        <boxGeometry args={[0.58, 0.16, 0.66]} />
        <meshStandardMaterial color="#1a202c" metalness={0.6} roughness={0.35} />
      </mesh>

      <mesh position={[0, 0.34, 0]} castShadow>
        <boxGeometry args={[0.54, 0.24, 0.7]} />
        <meshStandardMaterial color={upholsteryColor} roughness={0.85} metalness={0.06} />
      </mesh>

      <mesh position={[0, 0.69, -0.3]} castShadow>
        <boxGeometry args={[0.54, 0.52, 0.24]} />
        <meshStandardMaterial color={upholsteryColor} roughness={0.75} metalness={0.05} />
      </mesh>

      <mesh position={[0, 0.95, -0.33]} castShadow>
        <boxGeometry args={[0.54, 0.18, 0.06]} />
        <meshStandardMaterial color={accentColor} metalness={0.2} roughness={0.4} />
      </mesh>

      <mesh position={[0.3, 0.44, 0]} castShadow>
        <boxGeometry args={[0.08, 0.32, 0.65]} />
        <meshStandardMaterial color="#313a4c" metalness={0.45} roughness={0.5} />
      </mesh>

      <mesh position={[-0.3, 0.44, 0]} castShadow>
        <boxGeometry args={[0.08, 0.32, 0.65]} />
        <meshStandardMaterial color="#313a4c" metalness={0.45} roughness={0.5} />
      </mesh>

      <mesh position={[0, 0.54, -0.07]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.77, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.015]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.15, -0.02]}>
        <boxGeometry args={[0.58, 0.05, 0.08]} />
        <meshStandardMaterial color="#11161f" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0.24, 0, 0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.32, 12]} />
        <meshStandardMaterial color="#8895aa" metalness={0.75} roughness={0.35} />
      </mesh>

      <mesh position={[-0.24, 0, 0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.32, 12]} />
        <meshStandardMaterial color="#8895aa" metalness={0.75} roughness={0.35} />
      </mesh>

      <mesh position={[0.24, 0, -0.18]}>
        <cylinderGeometry args={[0.04, 0.04, 0.32, 12]} />
        <meshStandardMaterial color="#8895aa" metalness={0.75} roughness={0.35} />
      </mesh>

      <mesh position={[-0.24, 0, -0.18]}>
        <cylinderGeometry args={[0.04, 0.04, 0.32, 12]} />
        <meshStandardMaterial color="#8895aa" metalness={0.75} roughness={0.35} />
      </mesh>

      <mesh position={[0, 0.9, -0.32]}>
        <boxGeometry args={[0.2, 0.05, 0.02]} />
        <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  )
}

function SeatConsole({ color }) {
  return (
    <group position={[0, 0.56, -0.08]}>
      <mesh castShadow>
        <boxGeometry args={[0.26, 0.42, 0.62]} />
        <meshStandardMaterial color="#1f2533" metalness={0.55} roughness={0.35} />
      </mesh>

      <mesh position={[0, 0.2, 0.04]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.48]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.22} />
      </mesh>

      <mesh position={[0, 0.26, 0.16]} castShadow>
        <boxGeometry args={[0.22, 0.02, 0.22]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.05, -0.24]}>
        <boxGeometry args={[0.24, 0.12, 0.14]} />
        <meshStandardMaterial color="#2f3a4e" metalness={0.3} roughness={0.35} />
      </mesh>

      <mesh position={[0.1, 0.19, 0.24]}>
        <cylinderGeometry args={[0.028, 0.028, 0.08, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.65} roughness={0.35} />
      </mesh>

      <mesh position={[-0.1, 0.19, 0.24]}>
        <cylinderGeometry args={[0.028, 0.028, 0.08, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.65} roughness={0.35} />
      </mesh>
    </group>
  )
}

function OverheadStorage() {
  return (
    <>
      <group position={[-1.6, 2.15, -4]}>
        <mesh castShadow>
          <boxGeometry args={[0.92, 0.36, 14]} />
          <meshStandardMaterial color="#cdd6e6" metalness={0.35} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.94, 0.02, 14]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.94, 0.02, 14]} />
          <meshStandardMaterial color="#dbe3f2" roughness={0.5} />
        </mesh>
      </group>

      <group position={[1.6, 2.15, -4]}>
        <mesh castShadow>
          <boxGeometry args={[0.92, 0.36, 14]} />
          <meshStandardMaterial color="#cdd6e6" metalness={0.35} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.94, 0.02, 14]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.94, 0.02, 14]} />
          <meshStandardMaterial color="#dbe3f2" roughness={0.5} />
        </mesh>
      </group>
    </>
  )
}

function InfoPanels() {
  const panelPositions = useMemo(() => [-5.8, -8.8], [])

  return (
    <>
      {panelPositions.map((z, index) => (
        <group key={`info-${index}`} position={[0, 2.05, z]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.55, 0.07]} />
            <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[1.4, 0.46]} />
            <meshStandardMaterial color="#1e293b" emissive="#38bdf8" emissiveIntensity={0.4} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Doorway() {
  return (
    <group position={[0, 1.15, 3.62]}>
      <mesh castShadow>
        <boxGeometry args={[1.25, 2.1, 0.12]} />
        <meshStandardMaterial color="#5f6c7d" metalness={0.55} roughness={0.45} />
      </mesh>

      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.05, 1.82]} />
        <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.35} />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[0.9, 1.1]} />
        <meshStandardMaterial color="#9cc2d5" transparent opacity={0.35} metalness={0.9} roughness={0.08} />
      </mesh>

      <mesh position={[0.48, -0.12, 0.12]}>
        <cylinderGeometry args={[0.05, 0.05, 0.16, 20]} />
        <meshStandardMaterial color="#eab308" metalness={0.85} roughness={0.25} />
      </mesh>

      <mesh position={[0, 1.25, 0.13]}>
        <boxGeometry args={[1.2, 0.18, 0.04]} />
        <meshStandardMaterial color="#1e293b" metalness={0.55} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Handrails() {
  const stanchionPositions = useMemo(() => [-3, -5.5, -8, -10.5], [])

  return (
    <>
      {stanchionPositions.map((z, index) => (
        <group key={`rail-${index}`} position={[0, 0, z]}>
          <mesh position={[0.46, 1.38, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 2.6, 18]} />
            <meshStandardMaterial color="#d1d9e9" metalness={0.75} roughness={0.35} />
          </mesh>
          <mesh position={[-0.46, 1.38, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 2.6, 18]} />
            <meshStandardMaterial color="#d1d9e9" metalness={0.75} roughness={0.35} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 2.15, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 12.8, 20]} />
        <meshStandardMaterial color="#d1d9e9" metalness={0.75} roughness={0.35} />
      </mesh>

      {stanchionPositions.map((z, index) => (
        <group key={`grab-${index}`} position={[0, 2.02, z]}>
          <mesh>
            <torusGeometry args={[0.14, 0.015, 12, 26]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Luggage() {
  return (
    <>
      <group position={[-1.55, 2.3, -3.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.52, 0.32, 0.72]} />
          <meshStandardMaterial color="#6b4f1d" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.22, 0.26]}>
          <boxGeometry args={[0.16, 0.06, 0.3]} />
          <meshStandardMaterial color="#3f2c10" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.32, -0.2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
          <meshStandardMaterial color="#d1aa42" metalness={0.6} roughness={0.35} />
        </mesh>
      </group>

      <group position={[1.55, 2.35, -7.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.28, 0.58]} />
          <meshStandardMaterial color="#2c5282" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.18, 0.2]}>
          <boxGeometry args={[0.1, 0.04, 0.26]} />
          <meshStandardMaterial color="#1a365d" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.34, -0.1]}>
          <torusGeometry args={[0.12, 0.015, 10, 24]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      <group position={[0.9, 0.7, -9.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.5, 0.16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.28, 0.1]}>
          <boxGeometry args={[0.28, 0.18, 0.02]} />
          <meshStandardMaterial color="#d97706" metalness={0.2} roughness={0.5} />
        </mesh>
      </group>
    </>
  )
}
