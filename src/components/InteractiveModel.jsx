// src/components/InteractiveModel.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function InteractiveModel({ position = [0, 0, 0], scale = 1, url }) {
  const meshRef = useRef()
  
  // Загружаем модель, если указан URL
  const { scene } = url ? useGLTF(url) : { scene: null }

  useFrame((state) => {
    if (meshRef.current) {
      // Горизонтальное вращение — постоянное плавное
      
      
      // Вертикальное вращение — зацикленное вверх/вниз (осцилляция)
      // Math.sin возвращает значение от -1 до 1, создавая плавное колебание
      const oscillationSpeed = 0.5      // Скорость колебаний (чем больше — тем быстрее)
      const maxAngle = 0.3              // Максимальный угол наклона в радианах (~17°)
      
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * oscillationSpeed) * maxAngle
    }
  })

  // Если модель не задана — показываем простой куб-заглушку
  if (!url || !scene) {
    return (
      <group position={position} scale={scale} ref={meshRef}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#22d3ee" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    )
  }

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={position} 
      scale={scale}
      castShadow
      receiveShadow
    />
  )
}

// Прелоад модели для производительности (замени путь на свой)
// useGLTF.preload('/models/твоя-модель.glb')