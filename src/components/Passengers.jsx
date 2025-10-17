import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const SKIN_TONES = {
  fair: '#f4c29a',
  tan: '#d9a372',
  warm: '#c68642',
  deep: '#8d5524'
}

const HAIR_COLORS = {
  black: '#1b1f27',
  brown: '#3d2d1a',
  blonde: '#c79f48',
  auburn: '#8b3b2a',
  grey: '#b5bcc9',
  red: '#b43f3c'
}

export default function Passengers() {
  return (
    <group>
      <BusinessMan position={[-1.35, 0.9, -2]} />
      <Student position={[1.35, 0.9, -2]} />
      <Elderly position={[-1.35, 0.9, -4.5]} />
      <Mother position={[1.35, 0.9, -4.5]} />
      <Child position={[1.6, 0.55, -4.2]} />
      <Worker position={[-1.35, 0.9, -7]} />
      <Tourist position={[1.35, 0.9, -7]} />
      <Doctor position={[-1.35, 0.9, -9.5]} />
      <Artist position={[1.35, 0.9, -9.5]} />
    </group>
  )
}

function SeatedPassenger({
  position,
  orientation = 'left',
  torsoColor,
  accentColor,
  beltColor = '#1f2937',
  bottomColor,
  shoeColor,
  hairColor,
  hairStyle = 'short',
  skinTone = SKIN_TONES.fair,
  expression = 'smile',
  headAccessory = null,
  leftArmConfig,
  rightArmConfig,
  lean = 0,
  scale = 1,
  onUpdate,
  children
}) {
  const groupRef = useRef()
  const headRef = useRef()
  const leftForearmRef = useRef()
  const rightForearmRef = useRef()
  const baseY = position[1]

  const rotationY = orientation === 'left' ? Math.PI / 2 : orientation === 'right' ? -Math.PI / 2 : 0

  const armDefaults = {
    upperRotation: [-0.32, 0, 0],
    forearmRotation: [-1.05, 0, 0],
    wristOffset: [0, -0.22, 0.12],
    handRotation: [0, 0, 0],
    accessory: null,
    animation: null
  }

  const leftConfig = { ...armDefaults, ...leftArmConfig }
  const rightConfig = { ...armDefaults, ...rightArmConfig }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = baseY + Math.sin(t * 1.2) * 0.015
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.7) * 0.08
      headRef.current.rotation.x = Math.sin(t * 0.55) * 0.04
    }
    if (leftConfig.animation && leftForearmRef.current) {
      leftConfig.animation(state, leftForearmRef.current)
    }
    if (rightConfig.animation && rightForearmRef.current) {
      rightConfig.animation(state, rightForearmRef.current)
    }
    if (onUpdate) {
      onUpdate(state, {
        group: groupRef.current,
        head: headRef.current,
        leftForearm: leftForearmRef.current,
        rightForearm: rightForearmRef.current
      })
    }
  })

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale} ref={groupRef}>
      <group rotation={[lean, 0, 0]}>
        <Leg side="left" pantsColor={bottomColor} shoeColor={shoeColor} />
        <Leg side="right" pantsColor={bottomColor} shoeColor={shoeColor} />
        <Torso torsoColor={torsoColor} accentColor={accentColor} beltColor={beltColor} />
        <Arm
          side="left"
          sleeveColor={torsoColor}
          skinTone={skinTone}
          upperRotation={leftConfig.upperRotation}
          forearmRotation={leftConfig.forearmRotation}
          wristOffset={leftConfig.wristOffset}
          handRotation={leftConfig.handRotation}
          accessory={leftConfig.accessory}
          elbowRef={leftForearmRef}
        />
        <Arm
          side="right"
          sleeveColor={torsoColor}
          skinTone={skinTone}
          upperRotation={rightConfig.upperRotation}
          forearmRotation={rightConfig.forearmRotation}
          wristOffset={rightConfig.wristOffset}
          handRotation={rightConfig.handRotation}
          accessory={rightConfig.accessory}
          elbowRef={rightForearmRef}
        />
        <Head
          headRef={headRef}
          skinTone={skinTone}
          hairColor={hairColor}
          hairStyle={hairStyle}
          expression={expression}
          accessory={headAccessory}
        />
        {children}
      </group>
    </group>
  )
}

function Leg({ side, pantsColor, shoeColor }) {
  const offsetX = side === 'left' ? -0.12 : 0.12

  return (
    <group position={[offsetX, 0.24, 0.06]}>
      <mesh rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.26, 14, 18]} />
        <meshStandardMaterial color={pantsColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.3, 0.18]} rotation={[Math.PI / 12, 0, 0]} castShadow>
        <capsuleGeometry args={[0.048, 0.22, 14, 18]} />
        <meshStandardMaterial color={pantsColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.45, 0.22]} castShadow>
        <boxGeometry args={[0.14, 0.06, 0.26]} />
        <meshStandardMaterial color={shoeColor} metalness={0.3} roughness={0.45} />
      </mesh>
    </group>
  )
}

function Arm({
  side,
  sleeveColor,
  skinTone,
  upperRotation,
  forearmRotation,
  wristOffset,
  handRotation,
  accessory,
  elbowRef
}) {
  const shoulderX = side === 'left' ? -0.28 : 0.28
  const shoulderTwist = side === 'left' ? 0.08 : -0.08

  return (
    <group position={[shoulderX, 0.62, -0.02]} rotation={[0, shoulderTwist, 0]}>
      <mesh rotation={upperRotation} castShadow>
        <capsuleGeometry args={[0.048, 0.24, 14, 18]} />
        <meshStandardMaterial color={sleeveColor} roughness={0.65} />
      </mesh>
      <group ref={elbowRef} position={[0, -0.34, 0]} rotation={forearmRotation}>
        <mesh castShadow>
          <capsuleGeometry args={[0.045, 0.2, 14, 18]} />
          <meshStandardMaterial color={sleeveColor} roughness={0.65} />
        </mesh>
        <mesh position={[0, -0.2, 0]} castShadow>
          <sphereGeometry args={[0.05, 18, 18]} />
          <meshStandardMaterial color={skinTone} roughness={0.5} />
        </mesh>
        <group position={wristOffset} rotation={handRotation}>
          {accessory}
        </group>
      </group>
      <mesh position={[0, -0.34, 0]} castShadow>
        <sphereGeometry args={[0.048, 16, 16]} />
        <meshStandardMaterial color={skinTone} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Torso({ torsoColor, accentColor, beltColor }) {
  return (
    <group position={[0, 0.6, -0.04]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.13, 0.36, 20, 24]} />
        <meshStandardMaterial color={torsoColor} roughness={0.8} />
      </mesh>
      {accentColor && (
        <mesh position={[0, -0.1, 0.18]} castShadow>
          <boxGeometry args={[0.28, 0.18, 0.18]} />
          <meshStandardMaterial color={accentColor} roughness={0.55} metalness={0.15} />
        </mesh>
      )}
      {beltColor && (
        <mesh position={[0, -0.26, 0.05]} castShadow>
          <boxGeometry args={[0.3, 0.06, 0.2]} />
          <meshStandardMaterial color={beltColor} roughness={0.4} metalness={0.2} />
        </mesh>
      )}
    </group>
  )
}

function Head({ headRef, skinTone, hairColor, hairStyle, expression, accessory }) {
  return (
    <group ref={headRef} position={[0, 0.94, -0.02]}>
      <mesh castShadow>
        <sphereGeometry args={[0.15, 28, 26]} />
        <meshStandardMaterial color={skinTone} roughness={0.55} />
      </mesh>

      <mesh position={[-0.05, 0.02, 0.13]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.2} />
      </mesh>
      <mesh position={[0.05, 0.02, 0.13]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.2} />
      </mesh>
      <mesh position={[-0.05, 0.026, 0.145]}>
        <sphereGeometry args={[0.005, 10, 10]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.2} />
      </mesh>
      <mesh position={[0.05, 0.026, 0.145]}>
        <sphereGeometry args={[0.005, 10, 10]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.2} />
      </mesh>

      <mesh position={[0, -0.015, 0.135]}>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color={skinTone} roughness={0.5} />
      </mesh>

      <Mouth expression={expression} />
      <Ears skinTone={skinTone} />
      <Hair hairStyle={hairStyle} hairColor={hairColor} />
      {accessory}
    </group>
  )
}

function Ears({ skinTone }) {
  return (
    <>
      <mesh position={[-0.12, 0.0, 0]}> 
        <sphereGeometry args={[0.035, 10, 10, 0, Math.PI * 2, Math.PI / 4, Math.PI / 2]} />
        <meshStandardMaterial color={skinTone} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, 0.0, 0]}>
        <sphereGeometry args={[0.035, 10, 10, 0, Math.PI * 2, Math.PI / 4, Math.PI / 2]} />
        <meshStandardMaterial color={skinTone} roughness={0.5} />
      </mesh>
    </>
  )
}

function Mouth({ expression }) {
  if (expression === 'smile') {
    return (
      <mesh position={[0, -0.07, 0.132]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.036, 0.008, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#d14c50" roughness={0.4} />
      </mesh>
    )
  }

  if (expression === 'thinking') {
    return (
      <mesh position={[0, -0.068, 0.131]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.01, 0.01]} />
        <meshStandardMaterial color="#cbd5f5" roughness={0.3} />
      </mesh>
    )
  }

  return (
    <mesh position={[0, -0.07, 0.132]}>
      <boxGeometry args={[0.045, 0.01, 0.012]} />
      <meshStandardMaterial color="#cbd5f5" roughness={0.3} />
    </mesh>
  )
}

function Hair({ hairStyle, hairColor }) {
  switch (hairStyle) {
    case 'bun':
      return (
        <>
          <mesh position={[0, 0.045, -0.005]}>
            <sphereGeometry args={[0.162, 28, 20, 0, Math.PI * 2, 0, Math.PI / 1.35]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.19, -0.02]}>
            <sphereGeometry args={[0.08, 18, 18]} />
            <meshStandardMaterial color={hairColor} roughness={0.55} />
          </mesh>
        </>
      )
    case 'bob':
      return (
        <mesh position={[0, -0.02, 0.02]} scale={[1, 0.92, 1.05]}>
          <sphereGeometry args={[0.18, 28, 20, 0, Math.PI * 2, Math.PI / 5, Math.PI / 1.2]} />
          <meshStandardMaterial color={hairColor} roughness={0.6} />
        </mesh>
      )
    case 'ponytail':
      return (
        <>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.16, 28, 20, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.05, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.22, 14]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} />
          </mesh>
        </>
      )
    case 'curly':
      return (
        <group position={[0, 0.05, -0.01]}>
          {[[-0.08, 0.06, 0.06], [0.08, 0.05, 0.05], [0, 0.1, -0.02], [-0.1, -0.02, -0.04], [0.1, -0.02, -0.05]].map((pos, idx) => (
            <mesh key={idx} position={pos}>
              <sphereGeometry args={[0.08, 18, 18]} />
              <meshStandardMaterial color={hairColor} roughness={0.55} />
            </mesh>
          ))}
        </group>
      )
    case 'pixie':
      return (
        <mesh position={[0, 0.04, 0]} scale={[1, 0.6, 1]}>
          <sphereGeometry args={[0.16, 26, 18, 0, Math.PI * 2, 0, Math.PI / 1.4]} />
          <meshStandardMaterial color={hairColor} roughness={0.6} />
        </mesh>
      )
    case 'short':
      return (
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.16, 26, 18, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
          <meshStandardMaterial color={hairColor} roughness={0.6} />
        </mesh>
      )
    case 'undercut':
      return (
        <>
          <mesh position={[0, 0.02, 0]}>
            <sphereGeometry args={[0.16, 26, 20, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
            <meshStandardMaterial color={hairColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.04, 0]}
            scale={[1, 0.3, 1]}>
            <sphereGeometry args={[0.17, 20, 16]} />
            <meshStandardMaterial color="#2f3544" roughness={0.5} />
          </mesh>
        </>
      )
    default:
      return null
  }
}

function BusinessMan({ position }) {
  const laptopRef = useRef()

  return (
    <SeatedPassenger
      position={position}
      orientation="left"
      torsoColor="#1f2937"
      accentColor="#213859"
      beltColor="#0f172a"
      bottomColor="#4a5568"
      shoeColor="#111827"
      hairColor={HAIR_COLORS.black}
      skinTone={SKIN_TONES.tan}
      hairStyle="short"
      leftArmConfig={{
        upperRotation: [-0.4, 0.18, 0.25],
        forearmRotation: [-1.25, 0.38, 0.2],
        wristOffset: [0, -0.22, 0.09]
      }}
      rightArmConfig={{
        upperRotation: [-0.38, -0.18, -0.2],
        forearmRotation: [-1.28, -0.35, -0.18],
        wristOffset: [0, -0.22, 0.09]
      }}
      onUpdate={(state) => {
        if (laptopRef.current) {
          const t = state.clock.getElapsedTime()
          laptopRef.current.rotation.x = -0.95 + Math.sin(t * 0.8) * 0.05
        }
      }}
    >
      <Tie />
      <Laptop ref={laptopRef} />
      <mesh position={[0, 0.65, 0.22]}>
        <boxGeometry args={[0.22, 0.08, 0.12]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.12} roughness={0.4} />
      </mesh>
    </SeatedPassenger>
  )
}

const Laptop = forwardRef(function Laptop(_, ref) {
  return (
    <group ref={ref} position={[0, 0.32, 0.2]}>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.02, 0.18]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.14, -0.06]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.02]} />
        <meshStandardMaterial color="#0f172a" emissive="#2563eb" emissiveIntensity={0.25} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.14, -0.055]}>
        <boxGeometry args={[0.22, 0.14, 0.002]} />
        <meshStandardMaterial color="#2563eb" emissive="#38bdf8" emissiveIntensity={0.25} roughness={0.25} />
      </mesh>
    </group>
  )
})

function Tie() {
  return (
    <group position={[0, 0.56, 0.12]}>
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.22, 0.02]} />
        <meshStandardMaterial color="#c026d3" roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.14, 0]} castShadow>
        <coneGeometry args={[0.035, 0.12, 16]} />
        <meshStandardMaterial color="#a21caf" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  )
}

function Student({ position }) {
  const bookRef = useRef()

  return (
    <SeatedPassenger
      position={position}
      orientation="right"
      torsoColor="#2563eb"
      accentColor="#3b82f6"
      beltColor="#1e293b"
      bottomColor="#1f2937"
      shoeColor="#0f172a"
      hairColor={HAIR_COLORS.brown}
      skinTone={SKIN_TONES.fair}
      hairStyle="ponytail"
      expression="smile"
      leftArmConfig={{
        upperRotation: [-0.25, -0.28, -0.25],
        forearmRotation: [-1.1, -0.3, -0.12],
        wristOffset: [0, -0.26, 0.06],
        handRotation: [-0.4, 0, 0],
        accessory: <Book ref={bookRef} />
      }}
      rightArmConfig={{
        upperRotation: [-0.48, 0.28, 0.22],
        forearmRotation: [-0.9, 0.2, 0.1],
        wristOffset: [0, -0.2, 0.04],
        handRotation: [0.5, 0, 0]
      }}
      onUpdate={(state) => {
        if (bookRef.current) {
          const t = state.clock.getElapsedTime()
          bookRef.current.rotation.x = -0.4 + Math.sin(t * 1.5) * 0.05
        }
      }}
    >
      <BackpackStrap />
      <mesh position={[0.08, 0.4, 0.28]}>
        <boxGeometry args={[0.08, 0.16, 0.04]} />
        <meshStandardMaterial color="#facc15" roughness={0.35} />
      </mesh>
    </SeatedPassenger>
  )
}

const Book = forwardRef(function Book(_, ref) {
  return (
    <group ref={ref} rotation={[-0.4, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.02, 0.24]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.16, 0.02, 0.24]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>
    </group>
  )
})

function BackpackStrap() {
  return (
    <group position={[0, 0.58, -0.04]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.02, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
    </group>
  )
}

function Elderly({ position }) {
  return (
    <SeatedPassenger
      position={position}
      orientation="left"
      torsoColor="#9c6644"
      accentColor="#c79563"
      beltColor="#6b4423"
      bottomColor="#4b5563"
      shoeColor="#2f2f2f"
      hairColor={HAIR_COLORS.grey}
      skinTone={SKIN_TONES.warm}
      hairStyle="bob"
      expression="smile"
      headAccessory={<Glasses />}
      leftArmConfig={{
        upperRotation: [-0.2, 0.12, 0.2],
        forearmRotation: [-0.9, 0.2, 0.15],
        wristOffset: [0, -0.24, 0.1]
      }}
      rightArmConfig={{
        upperRotation: [-0.05, -0.32, -0.18],
        forearmRotation: [-1.25, -0.2, -0.05],
        wristOffset: [0, -0.22, 0.1],
        handRotation: [0, 0, 0],
        accessory: <Cane />
      }}
    >
      <Scarf color="#d1d5db" />
    </SeatedPassenger>
  )
}

function Glasses() {
  return (
    <group position={[0, 0.04, 0.14]}>
      <mesh position={[-0.05, 0, 0]}>
        <torusGeometry args={[0.06, 0.008, 12, 20]} />
        <meshStandardMaterial color="#cbd5f5" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0.05, 0, 0]}>
        <torusGeometry args={[0.06, 0.008, 12, 20]} />
        <meshStandardMaterial color="#cbd5f5" roughness={0.2} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.008, 0.01]} />
        <meshStandardMaterial color="#cbd5f5" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[-0.12, 0.015, -0.02]}>
        <boxGeometry args={[0.04, 0.008, 0.12]} />
        <meshStandardMaterial color="#cbd5f5" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[0.12, 0.015, -0.02]}>
        <boxGeometry args={[0.04, 0.008, 0.12]} />
        <meshStandardMaterial color="#cbd5f5" metalness={0.4} roughness={0.2} />
      </mesh>
    </group>
  )
}

const Cane = (
  <group rotation={[-Math.PI / 2, 0, 0]}>
    <mesh>
      <cylinderGeometry args={[0.02, 0.02, 0.75, 10]} />
      <meshStandardMaterial color="#5b3314" roughness={0.5} />
    </mesh>
    <mesh position={[0, 0.34, 0.02]}>
      <torusGeometry args={[0.05, 0.01, 10, 20]} />
      <meshStandardMaterial color="#cbd5f5" metalness={0.6} roughness={0.3} />
    </mesh>
  </group>
)

function Scarf({ color }) {
  return (
    <group position={[0, 0.68, 0.12]}>
      <mesh>
        <torusGeometry args={[0.1, 0.02, 12, 24]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0.04, -0.12, 0]}>
        <boxGeometry args={[0.04, 0.16, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[-0.04, -0.14, 0]}>
        <boxGeometry args={[0.036, 0.18, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
    </group>
  )
}

function Mother({ position }) {
  const babyRef = useRef()

  return (
    <SeatedPassenger
      position={position}
      orientation="right"
      torsoColor="#ec4899"
      accentColor="#f472b6"
      beltColor="#7f1d1d"
      bottomColor="#4c1d95"
      shoeColor="#1f2937"
      hairColor={HAIR_COLORS.black}
      skinTone={SKIN_TONES.warm}
      hairStyle="bun"
      expression="smile"
      leftArmConfig={{
        upperRotation: [-0.12, -0.45, -0.25],
        forearmRotation: [-1.35, -0.3, -0.15],
        wristOffset: [0, -0.18, 0.12],
        handRotation: [0.3, 0, 0],
        accessory: <Baby ref={babyRef} />
      }}
      rightArmConfig={{
        upperRotation: [-0.35, 0.28, 0.18],
        forearmRotation: [-0.9, 0.22, 0.1],
        wristOffset: [0, -0.22, 0.08]
      }}
      onUpdate={(state) => {
        if (babyRef.current) {
          const t = state.clock.getElapsedTime()
          babyRef.current.position.y = Math.sin(t * 1.4) * 0.02
        }
      }}
    >
      <mesh position={[0, 0.62, 0.24]}>
        <boxGeometry args={[0.22, 0.08, 0.18]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.4} />
      </mesh>
    </SeatedPassenger>
  )
}

const Baby = forwardRef(function Baby(_, ref) {
  return (
    <group ref={ref} position={[0, -0.05, 0]}>
      <mesh position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[0.07, 18, 18]} />
        <meshStandardMaterial color={SKIN_TONES.fair} roughness={0.55} />
      </mesh>
      <mesh castShadow>
        <capsuleGeometry args={[0.08, 0.18, 14, 18]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.1, 0.05]}>
        <boxGeometry args={[0.12, 0.08, 0.14]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>
    </group>
  )
})

function Worker({ position }) {
  const toolRef = useRef()

  return (
    <SeatedPassenger
      position={position}
      orientation="left"
      torsoColor="#f97316"
      accentColor="#fde047"
      beltColor="#0f172a"
      bottomColor="#1f2937"
      shoeColor="#111827"
      hairColor={HAIR_COLORS.black}
      skinTone={SKIN_TONES.deep}
      hairStyle="undercut"
      expression="neutral"
      headAccessory={<Helmet />}
      leftArmConfig={{
        upperRotation: [-0.4, 0.18, 0.25],
        forearmRotation: [-1.15, 0.3, 0.18],
        wristOffset: [0, -0.22, 0.08]
      }}
      rightArmConfig={{
        upperRotation: [-0.2, -0.38, -0.2],
        forearmRotation: [-1.4, -0.2, -0.12],
        wristOffset: [0, -0.2, 0.12],
        handRotation: [0, 0, 0],
        accessory: <Tool ref={toolRef} />,
        animation: (state, forearm) => {
          const t = state.clock.getElapsedTime()
          forearm.rotation.z = Math.sin(t * 2.1) * 0.3 - 0.2
        }
      }}
    >
      <mesh position={[0, 0.5, 0.24]}>
        <boxGeometry args={[0.24, 0.08, 0.16]} />
        <meshStandardMaterial color="#1f2937" roughness={0.45} metalness={0.25} />
      </mesh>
    </SeatedPassenger>
  )
}

function Helmet() {
  return (
    <group position={[0, 0.14, 0]}>
      <mesh>
        <sphereGeometry args={[0.18, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fde047" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.03, 0.12]}>
        <boxGeometry args={[0.24, 0.04, 0.12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
    </group>
  )
}

const Tool = forwardRef(function Tool(_, ref) {
  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.015, 0.015, 0.32, 12]} />
        <meshStandardMaterial color="#cbd5f5" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.02]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} />
      </mesh>
    </group>
  )
})

function Tourist({ position }) {
  const cameraRef = useRef()

  return (
    <SeatedPassenger
      position={position}
      orientation="right"
      torsoColor="#14b8a6"
      accentColor="#22d3ee"
      beltColor="#0f172a"
      bottomColor="#1f2937"
      shoeColor="#111827"
      hairColor={HAIR_COLORS.blonde}
      skinTone={SKIN_TONES.fair}
      hairStyle="curly"
      expression="smile"
      headAccessory={<SunGlasses />}
      leftArmConfig={{
        upperRotation: [-0.48, -0.2, -0.28],
        forearmRotation: [-1.3, -0.24, -0.16],
        wristOffset: [0, -0.18, 0.16],
        handRotation: [0.4, 0, 0]
      }}
      rightArmConfig={{
        upperRotation: [-0.32, 0.28, 0.2],
        forearmRotation: [-1.05, 0.22, 0.14],
        wristOffset: [0, -0.24, 0.08],
        accessory: <Camera ref={cameraRef} />
      }}
      onUpdate={(state) => {
        if (cameraRef.current) {
          const t = state.clock.getElapsedTime()
          cameraRef.current.rotation.y = Math.sin(t * 1.8) * 0.4
          cameraRef.current.rotation.x = -0.3 + Math.sin(t * 1.2) * 0.2
        }
      }}
    >
      <mesh position={[0, 0.48, 0.24]}>
        <boxGeometry args={[0.24, 0.1, 0.06]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>
    </SeatedPassenger>
  )
}

const Camera = forwardRef(function Camera(_, ref) {
  return (
    <group ref={ref} position={[0, -0.03, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.12, 0.08]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.04, -0.05]}>
        <boxGeometry args={[0.12, 0.02, 0.02]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.25} roughness={0.2} />
      </mesh>
    </group>
  )
})

function SunGlasses() {
  return (
    <group position={[0, 0.04, 0.14]}>
      <mesh position={[-0.05, 0, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.12, 0.01, 0.01]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Doctor({ position }) {
  return (
    <SeatedPassenger
      position={position}
      orientation="left"
      torsoColor="#e2e8f0"
      accentColor="#cbd5f5"
      beltColor="#1f2937"
      bottomColor="#1f2937"
      shoeColor="#0f172a"
      hairColor={HAIR_COLORS.grey}
      skinTone={SKIN_TONES.fair}
      hairStyle="pixie"
      expression="thinking"
      headAccessory={<Headband color="#38bdf8" />}
      leftArmConfig={{
        upperRotation: [-0.22, 0.24, 0.18],
        forearmRotation: [-1.18, 0.16, 0.1],
        wristOffset: [0, -0.18, 0.06],
        handRotation: [0.3, 0, 0],
        accessory: <Clipboard />
      }}
      rightArmConfig={{
        upperRotation: [-0.15, -0.3, -0.12],
        forearmRotation: [-1.05, -0.24, -0.06],
        wristOffset: [0, -0.22, 0.1]
      }}
      onUpdate={(state, refs) => {
        if (refs.head) {
          const t = state.clock.getElapsedTime()
          refs.head.rotation.z = Math.sin(t * 0.6) * 0.08
        }
      }}
    >
      <Stethoscope />
    </SeatedPassenger>
  )
}

function Headband({ color }) {
  return (
    <mesh position={[0, 0.12, -0.02]}>
      <torusGeometry args={[0.16, 0.015, 12, 24, Math.PI]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  )
}

const Clipboard = (
  <group rotation={[-0.9, 0, 0]}>
    <mesh>
      <boxGeometry args={[0.18, 0.24, 0.01]} />
      <meshStandardMaterial color="#1f2937" roughness={0.4} />
    </mesh>
    <mesh position={[0, 0, 0.008]}>
      <boxGeometry args={[0.16, 0.2, 0.004]} />
      <meshStandardMaterial color="#f8fafc" roughness={0.2} />
    </mesh>
  </group>
)

function Stethoscope() {
  return (
    <group position={[0, 0.52, 0.16]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.01, 12, 28]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.08, -0.16, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.18, 12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      <mesh position={[-0.08, -0.16, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.18, 12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

function Artist({ position }) {
  const brushRef = useRef()

  return (
    <SeatedPassenger
      position={position}
      orientation="right"
      torsoColor="#8b5cf6"
      accentColor="#facc15"
      beltColor="#1f2937"
      bottomColor="#312e81"
      shoeColor="#111827"
      hairColor={HAIR_COLORS.auburn}
      skinTone={SKIN_TONES.tan}
      hairStyle="curly"
      expression="smile"
      leftArmConfig={{
        upperRotation: [-0.28, -0.36, -0.24],
        forearmRotation: [-1.1, -0.3, -0.2],
        wristOffset: [0, -0.18, 0.18],
        accessory: <Palette />
      }}
      rightArmConfig={{
        upperRotation: [-0.2, 0.4, 0.22],
        forearmRotation: [-1.35, 0.32, 0.18],
        wristOffset: [0, -0.18, 0.14],
        accessory: <Brush ref={brushRef} />
      }}
      onUpdate={(state) => {
        if (brushRef.current) {
          const t = state.clock.getElapsedTime()
          brushRef.current.rotation.z = Math.sin(t * 2.2) * 0.4 + 0.3
          brushRef.current.position.x = Math.sin(t * 2.2) * 0.05
        }
      }}
    >
      <Scarf color="#fb7185" />
    </SeatedPassenger>
  )
}

const Palette = (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <mesh>
      <torusGeometry args={[0.12, 0.04, 12, 24]} />
      <meshStandardMaterial color="#d9d3ce" roughness={0.4} />
    </mesh>
    {[[0.08, 0.04, '#ef4444'], [-0.06, 0.06, '#3b82f6'], [0.02, -0.06, '#22c55e']].map(([x, y, color], idx) => (
      <mesh key={idx} position={[x, y, 0.02]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
    ))}
  </group>
)

const Brush = forwardRef(function Brush(_, ref) {
  return (
    <group ref={ref} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 0.26, 10]} />
        <meshStandardMaterial color="#8b4513" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[0.02, 0.08, 12]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>
    </group>
  )
})

function Child({ position }) {
  const groupRef = useRef()
  const toyRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.06
      groupRef.current.rotation.y = Math.sin(t * 1.4) * 0.25
    }
    if (toyRef.current) {
      toyRef.current.rotation.x = Math.sin(t * 2) * 0.6
    }
  })

  return (
    <group position={position} ref={groupRef}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.22, 14, 18]} />
        <meshStandardMaterial color="#f87171" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.46, 0]} castShadow>
        <sphereGeometry args={[0.11, 20, 18]} />
        <meshStandardMaterial color={SKIN_TONES.fair} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.54, -0.02]}>
        <sphereGeometry args={[0.12, 18, 18, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        <meshStandardMaterial color={HAIR_COLORS.red} roughness={0.6} />
      </mesh>
      <mesh position={[-0.05, 0.48, 0.09]}>
        <sphereGeometry args={[0.015, 10, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.2} />
      </mesh>
      <mesh position={[0.05, 0.48, 0.09]}>
        <sphereGeometry args={[0.015, 10, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.42, 0.1]}>
        <boxGeometry args={[0.05, 0.01, 0.01]} />
        <meshStandardMaterial color="#cbd5f5" roughness={0.4} />
      </mesh>

      <mesh position={[-0.11, 0.27, 0]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.18, 10, 14]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>
      <mesh position={[0.11, 0.27, 0]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.18, 10, 14]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>

      <mesh position={[-0.06, 0.05, 0.05]} rotation={[Math.PI / 9, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.18, 10, 14]} />
        <meshStandardMaterial color="#1f2937" roughness={0.5} />
      </mesh>
      <mesh position={[0.06, 0.05, 0.05]} rotation={[Math.PI / 9, 0, 0]} castShadow>
        <capsuleGeometry args={[0.03, 0.18, 10, 14]} />
        <meshStandardMaterial color="#1f2937" roughness={0.5} />
      </mesh>

      <group ref={toyRef} position={[0, 0.24, 0.16]}>
        <mesh>
          <boxGeometry args={[0.12, 0.08, 0.12]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#facc15" roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
