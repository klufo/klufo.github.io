// src/components/Hero.jsx
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import CharacterModel from './CharacterModel'
import Particles from './Particles'

export default function Hero() {
  return (
    <div className="relative h-screen w-full min-h-[70vh] md:min-h-screen bg-gradient-to-b from-slate-900 via-slate-950/40 to-slate-950 overflow-hidden">
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
        shadows
        dpr={[1, 2]}
        style={{ touchAction: 'auto' }}
      >
        <ShadowSetup />
        
        {/* Освещение */}
        <ambientLight intensity={0.4} color="#ecfeff" />
        
        <directionalLight
          position={[4, 8, 4]}
          intensity={0.9}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        
        <spotLight
          position={[-8, 4, -8]}
          angle={0.35}
          penumbra={0.9}
          intensity={1.5}
          color="#22d3ee"
          castShadow={false}
        />
        
        <spotLight
          position={[8, 3, -6]}
          angle={0.4}
          penumbra={0.8}
          intensity={0.8}
          color="#10b981"
          castShadow={false}
        />
        
        <pointLight
          position={[0, -2, 0]}
          intensity={0.3}
          color="#a5f3fc"
          distance={8}
        />

        {/* Окружение и тени */}
        <Environment preset="city" />
        
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.35}
          scale={20}
          blur={2.5}
          far={12}
          color="#1e1b4b"
        />

        {/* Персонаж и частицы */}
        <CharacterModel position={[0, -1.2, 0]} scale={1.5} />
        <Particles count={150} color="#22d3ee" />

        {/* Управление камерой */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.3}
          enableDamping
          dampingFactor={0.08}
          autoRotate={false}
          autoRotateSpeed={0.4}
        />
      </Canvas>

      {/* Текстовый оверлей */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
        
        {/* Металлический заголовок */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center metallic-3d-text">
          Привет, я klufo
        </h1>
        
        {/* Металлический подзаголовок */}
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl metallic-3d-text-sub">
          Creative Developer and Designer
        </p>
      </div>

      {/* Индикатор прокрутки для мобильных */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden animate-bounce pointer-events-none">
        <svg 
          className="w-6 h-6 text-cyan-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>

      {/* Градиентный оверлей снизу */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
    </div>
  )
}

// Компонент для настройки теней
function ShadowSetup() {
  const { gl } = useThree()
  
  useEffect(() => {
    if (gl) {
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFShadowMap
    }
  }, [gl])
  
  return null
}