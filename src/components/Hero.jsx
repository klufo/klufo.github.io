// src/components/Hero.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import CharacterModel from './CharacterModel'
import Particles from './Particles'

export default function Hero() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 overflow-hidden">
      
      {/* 🎨 3D Сцена */}
      <Canvas
      
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
        shadows
        dpr={[1, 2]}
         gl={{ 
            antialias: true, 
            powerPreference: 'high-performance',
            alpha: true 
  }}
      >
        {/* === 🌸 АНИМЕ-ОСВЕЩЕНИЕ === */}
        
        {/* 1. Базовый мягкий свет (заполняющий) */}
        <ambientLight 
          intensity={0.4} 
          color="#ffe4e6"
        />
        
        {/* 2. Ключевой свет (основной источник, спереди-сверху) */}
        <directionalLight
          position={[4, 8, 4]}
          intensity={0.9}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        
        {/* 3. ✨ RIM LIGHT — розовый контур (главный секрет аниме!) */}
        <spotLight
          position={[-8, 4, -8]}
          angle={0.35}
          penumbra={0.9}
          intensity={1.5}
          color="#f472b6"
          castShadow={false}
        />
        
        {/* 4. Дополнительный акцент сзади-справа (фиолетовый) */}
        <spotLight
          position={[8, 3, -6]}
          angle={0.4}
          penumbra={0.8}
          intensity={0.8}
          color="#c084fc"
          castShadow={false}
        />
        
        {/* 5. Лёгкая подсветка снизу (для объёма) */}
        <pointLight
          position={[0, -2, 0]}
          intensity={0.3}
          color="#fbcfe8"
          distance={8}
        />

        {/* === 🌆 ОКРУЖЕНИЕ === */}
        <Environment preset="sunset" />
        
        {/* Мягкие тени под ногами */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.35}
          scale={20}
          blur={2.5}
          far={12}
          color="#1e1b4b"
        />

        {/* === 🦊 ПЕРСОНАЖ === */}
        <CharacterModel 
          position={[0, -1.2, 0]} 
          scale={1.5} 
        />

        <Particles count={150} color="#f472b6" />

        {/* === 🎮 КАМЕРА === */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.3}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>

      {/* === ✨ ТЕКСТОВЫЙ ОВЕРЛЕЙ === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
          Привет, я 180SX
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-slate-200 text-center max-w-2xl px-4 drop-shadow-md">
          Creative Developer & Character Designer
        </p>
      </div>

      {/* Декоративное свечение по краям */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
    </div>
  )
}