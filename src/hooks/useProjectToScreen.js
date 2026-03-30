// src/hooks/useProjectToScreen.js
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export function useProjectToScreen(position3d) {
  const { camera, size } = useThree()
  const screenPos = useRef({ x: 0, y: 0, visible: false })
  
  // Вектор для проекции (создаём один раз для производительности)
  const vector = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    // Копируем 3D-позицию в вектор
    vector.set(position3d[0], position3d[1], position3d[2])
    
    // Проецируем в 2D-координаты экрана (от -1 до 1)
    vector.project(camera)
    
    // Конвертируем из [-1, 1] в пиксели экрана
    const x = (vector.x * 0.5 + 0.5) * size.width
    const y = (-(vector.y * 0.5) + 0.5) * size.height
    
    // Проверяем, виден ли объект (не за камерой и в пределах экрана)
    const visible = vector.z < 1 && vector.z > -1
    
    // Сохраняем результат
    screenPos.current = { x, y, visible }
  })

  return screenPos
}