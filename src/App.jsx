import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import TrainScene from './components/TrainScene'

function App() {
  return (
    <>
      <div className="overlay">
        <h1 className="title">TRAIN JOURNEY</h1>
        <div className="controls">
          <h3>Interactive Controls</h3>
          <p><strong>Left Click + Drag:</strong> Rotate view</p>
          <p><strong>Right Click + Drag:</strong> Pan around</p>
          <p><strong>Scroll:</strong> Zoom in/out</p>
          <p>Explore the train and observe the passengers!</p>
        </div>
      </div>
      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <TrainScene />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
