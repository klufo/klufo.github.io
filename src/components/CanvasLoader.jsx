// src/components/CanvasLoader.jsx
import { Html, useProgress } from '@react-three/drei'

export default function CanvasLoader() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 relative">
          {/* Круговой прогресс-бар */}
          <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f472b6"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - (progress || 0) / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
            {progress?.toFixed(0)}%
          </span>
        </div>
        <p className="text-slate-300">Загрузка активов...</p>
      </div>
    </Html>
  )
}