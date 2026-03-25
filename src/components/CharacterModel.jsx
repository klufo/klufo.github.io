// src/components/CharacterModel.jsx
import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function CharacterModel({ 
  position = [0, -1.2, 0], 
  scale = 1.5 
}) {
  const { scene } = useGLTF('/models/character.glb')
  const modelRef = useRef()

  // 🎨 Настройка материалов под аниме-стиль
  useEffect(() => {
    if (!scene) return
    
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material
        
        // 🌸 Мягкие аниме-материалы
        mat.roughness = 0.5        // меньше бликов, мягче поверхность
        mat.metalness = 0.1        // почти нет металличности
        mat.envMapIntensity = 2.0  // усиленные отражения для "живого" вида
        
        // Если нужно принудительно применить текстуру:
        // if (mat.map) mat.map.anisotropy = 16
      }
    })
  }, [scene])

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      position={position} 
      scale={scale} 
      dispose={null}
    />
  )
}

// Прелоад для быстрой загрузки
useGLTF.preload('/models/character.glb')