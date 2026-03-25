// src/components/SkillIcon3D.jsx
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

// Компонент для загрузки одной модели
function Model({ url, scale = 1 }) {
  const meshRef = useRef()
  const { scene } = useGLTF(url)
  
  // Плавное вращение, когда пользователь не взаимодействует
  useFrame((state) => {
    if (meshRef.current && !state.pointer.moved) {
      meshRef.current.rotation.y += 0.003
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
    <div className="w-24 h-24 mx-auto">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ touchAction: 'pan-y' }} // Разрешаем скролл страницы
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#22d3ee" />
        
        <Suspense fallback={<Loader />}>
          <Model url={modelPath} scale={2.5} />
        </Suspense>
        
        {/* Управление камерой */}
        <OrbitControls
          enablePan={false}        // Запрещаем перемещение камеры
          enableZoom={true}        // Разрешаем зум
          enableRotate={true}      // Разрешаем вращение
          minDistance={2}          // Минимальное приближение
          maxDistance={6}          // Максимальное удаление
          autoRotate={false}       // Отключаем авто-вращение (есть в useFrame)
          autoRotateSpeed={0.5}
          dampingFactor={0.1}      // Плавность остановки
          enableDamping={true}
        />
      </Canvas>
    </div>
  )
}

// Прелоад моделей для производительности
useGLTF.preload('/models/palette.glb')
useGLTF.preload('/models/laptop.glb')
useGLTF.preload('/models/gamepad.glb')
useGLTF.preload('/models/sparkles.glb')