// src/components/Hero.jsx
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import CharacterModel from './CharacterModel'
import InteractiveModel from './InteractiveModel'
import Particles from './Particles'
import InteractiveHotspot from './InteractiveHotspot'
import PopupPanel from './PopupPanel'

export default function Hero() {
  const [activePanel, setActivePanel] = useState(null)

  // 🎯 Refs для 2D-координат каждого хотспота (для привязки поп-апов)
  const projectsAnchorRef = useRef({ x: 0, y: 0, visible: false })
  const skillsAnchorRef = useRef({ x: 0, y: 0, visible: false })
  const photosAnchorRef = useRef({ x: 0, y: 0, visible: false })

  // 📸 Фотографии из Gallery.jsx
  const galleryPhotos = [
    { src: '/images/photo1.jpg', alt: 'Фото 1' },
    { src: '/images/photo2.jpg', alt: 'Фото 2' },
    { src: '/images/photo3.jpg', alt: 'Фото 3' }
  ]

  // Данные для панелей
  const panels = {
    projects: {
      title: 'Мои проекты',
      content: (
        <div className="space-y-3">
          {[
            { name: '3D Портфолио', tech: 'React + Three.js' },
            { name: 'Конфигуратор', tech: 'Zustand + Blender' },
            { name: 'Аниме-лендинг', tech: 'Vue + GSAP' }
          ].map((project, i) => (
            <div key={i} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400/50 transition-colors">
              <div className="font-medium text-white">{project.name}</div>
              <div className="text-sm text-slate-400">{project.tech}</div>
            </div>
          ))}
        </div>
      ),
      anchorRef: projectsAnchorRef,
      fallbackPosition: { top: '12vh', right: '6vw' }
    },
    skills: {
      title: 'Навыки',
      content: (
        <div className="flex flex-wrap gap-2">
          {['React', 'Three.js', 'Blender', 'GSAP', 'Tailwind', 'Git'].map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm rounded-full border border-cyan-500/20">
              {skill}
            </span>
          ))}
        </div>
      ),
      anchorRef: skillsAnchorRef,
      fallbackPosition: { bottom: '15vh', left: '5vw' }
    },
    photos: {
      title: 'Фото',
      content: (
        <div className="grid grid-cols-2 gap-3">
          {galleryPhotos.map((photo, index) => (
            <div 
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      ),
      anchorRef: photosAnchorRef,
      fallbackPosition: { bottom: '12vh', right: '7vw' }
    }
  }

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
        <directionalLight position={[4, 8, 4]} intensity={0.9} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
        <spotLight position={[-8, 4, -8]} angle={0.35} penumbra={0.9} intensity={1.5} color="#22d3ee" castShadow={false} />
        <spotLight position={[8, 3, -6]} angle={0.4} penumbra={0.8} intensity={0.8} color="#10b981" castShadow={false} />
        <pointLight position={[0, -2, 0]} intensity={0.3} color="#a5f3fc" distance={8} />

        <Environment preset="city" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.35} scale={20} blur={2.5} far={12} color="#1e1b4b" />

        {/* Главный персонаж */}
        <CharacterModel position={[0, -1.2, 0]} scale={1.5} />

        {/* Дополнительная интерактивная модель */}
        <InteractiveModel 
          position={[-1.2, 0.5, 0]} 
          scale={1.2}
          url="/models/my-model.glb"
        />
        
        {/* Частицы */}
        <Particles count={150} color="#22d3ee" />

        {/* 🔥 Невидимые хотспоты с привязкой к поп-апам */}
        <InteractiveHotspot 
          position={[0, -1.65, 0]}
          radius={0.3}
          onClick={() => setActivePanel('projects')}
          projectedRef={projectsAnchorRef}
        />
        <InteractiveHotspot 
          position={[-0.6, -1.65, 0.1]}
          radius={0.15}
          onClick={() => setActivePanel('skills')}
          projectedRef={skillsAnchorRef}
        />
        <InteractiveHotspot 
          position={[0.6, -1.65, 0.1]}
          radius={0.15}
          onClick={() => setActivePanel('skills')}
          projectedRef={skillsAnchorRef}
        />
        <InteractiveHotspot 
          position={[0, -0.8, 0]}
          radius={0.4}
          onClick={() => setActivePanel('photos')}
          projectedRef={photosAnchorRef}
        />

        {/* Управление камерой */}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minDistance={5}
          maxDistance={5}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.3}
          enableDamping
          dampingFactor={0.08}
          autoRotate={false}
        />
      </Canvas>

      {/* Текстовый оверлей */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center metallic-3d-text">
          Привет, я klufo
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl metallic-3d-text-sub">
          Creative Developer and Designer
        </p>
      </div>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden animate-bounce pointer-events-none z-10">
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Градиентный оверлей */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />

      {/* 🪟 Всплывающие панели с привязкой к 3D-хотспотам */}
      {Object.entries(panels).map(([key, panel]) => (
        <PopupPanel
          key={key}
          isOpen={activePanel === key}
          onClose={() => setActivePanel(null)}
          title={panel.title}
          anchorRef={panel.anchorRef}
          position={panel.fallbackPosition}
          animationOrigin="bottom"
        >
          {panel.content}
        </PopupPanel>
      ))}
    </div>
  )
}

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