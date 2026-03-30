// src/components/SkillIcon3D.jsx
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

// Компонент для загрузки одной модели
function Model({ url, scale = 1, rotationSpeed = 0.003 }) {
  const meshRef = useRef()
  const { scene } = useGLTF(url)
  
  // Авто-вращение модели
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={scale}
    />
  )
}

// Заглушка пока модель грузится
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#22d3ee" wireframe />
    </mesh>
  )
}

// Основной компонент
export default function SkillIcon3D({ type }) {
  // Маппинг типов моделей на пути к файлам
  const modelPaths = {
    palette: '/models/palette.glb',
    laptop: '/models/laptop.glb',
    gamepad: '/models/gamepad.glb',
    sparkles: '/models/sparkles.glb'
  }

  const modelPath = modelPaths[type] || modelPaths.palette

  return (
    <div className="w-32 h-32 mx-auto">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ touchAction: 'none', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#22d3ee" />
        
        <Suspense fallback={<Loader />}>
          <Model url={modelPath} scale={3} rotationSpeed={0.003} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Прелоад моделей для производительности
useGLTF.preload('/models/palette.glb')
useGLTF.preload('/models/laptop.glb')
useGLTF.preload('/models/gamepad.glb')
useGLTF.preload('/models/sparkles.glb')