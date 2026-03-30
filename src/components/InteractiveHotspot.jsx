// src/components/InteractiveHotspot.jsx
import { useRef } from 'react'
import { useProjectToScreen } from '../hooks/useProjectToScreen'

export default function InteractiveHotspot({ 
  position = [0, 0, 0], 
  radius = 0.4, 
  onClick, 
  onHover,
  projectedRef  // ← Новый проп: ref для передачи 2D-координат
}) {
  const meshRef = useRef()
  
  // Получаем 2D-позицию на экране из 3D-координат
  const screenPos = useProjectToScreen(position)
  
  // Передаём координаты наружу через ref (если предоставлен)
  if (projectedRef && projectedRef.current) {
    projectedRef.current = screenPos.current
  }

  return (
    <group position={position}>
      {/* Невидимая, но кликабельная сфера */}
      <mesh
        ref={meshRef}
        visible={true}  // ← Важно: visible={true} для работы кликов
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover?.(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover?.(false)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.(e)
        }}
      >
        <sphereGeometry args={[radius * 1.5, 16, 16]} />
        {/* Полностью прозрачный материал — невидимый, но принимает события */}
        <meshBasicMaterial transparent opacity={0} /> // елси 0.3 будет видно
      </mesh>
    </group>
  )
}