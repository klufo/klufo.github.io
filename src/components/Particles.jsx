// src/components/Particles.jsx
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Base64 спрайт звезды (белая размытая точка)
const STAR_SPRITE ='/images/star-sprite.png'
export default function Particles({ count = 200 }) {
  const points = useRef()
  const { gl } = useThree()

  // Генерируем позиции и цвета для частиц один раз при старте
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    
    // Цвета: бирюзовый и зелёный
    const turquoise = new THREE.Color('#22d3ee')
    const green = new THREE.Color('#10b981')
    
    for (let i = 0; i < count; i++) {
      // Позиции частиц в пространстве
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      // Случайный цвет: бирюзовый или зелёный (50/50)
      const color = Math.random() > 0.5 ? turquoise : green
      cols[i * 3] = color.r
      cols[i * 3 + 1] = color.g
      cols[i * 3 + 2] = color.b
    }
    
    return { positions: pos, colors: cols }
  }, [count])

  // Загружаем текстуру звезды
  const starTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load(STAR_SPRITE)
    texture.needsUpdate = true
    return texture
  }, [])

  // Анимация частиц (каждый кадр)
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
      points.current.rotation.x = state.clock.elapsedTime * 0.02

      // Мерцание звёзд
      if (points.current.material) {
      const time = state.clock.elapsedTime
      points.current.material.opacity = 0.8 + Math.sin(time * 3) * 0.15
    }
    }
  })

  // Очистка текстуры при размонтировании
  useMemo(() => {
    return () => {
      if (starTexture) starTexture.dispose()
    }
  }, [starTexture])

  return (
    <points ref={points}>
      <bufferGeometry>
        {/* Позиции частиц */}
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        {/* Цвета частиц */}
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.40}
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
        map={starTexture}
        alphaMap={starTexture}
        alphaTest={0.01}
        toneMapped={false}
      />
    </points>
  )
}