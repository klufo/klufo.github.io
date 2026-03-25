// src/components/Gallery.jsx
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SkillIcon3D from './SkillIcon3D'

export default function Gallery() {
  const titleRef = useScrollAnimation({
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  })

  const bioRef = useScrollAnimation({
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  })

  const galleryRef = useScrollAnimation({
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  })

  // Фотографии — замени на свои!
  const photos = [
    {
      src: '/images/photo1.jpg',
      alt: 'Фото 1'
    },
    {
      src: '/images/photo2.jpg',
      alt: 'Фото 2'
    },
    {
      src: '/images/photo3.jpg',
      alt: 'Фото 3'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Заголовок */}
      <h2 
        ref={titleRef}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent"
      >
        Еще немного обо мне
      </h2>

      {/* Биография */}
      <div ref={bioRef} className="text-center mb-12">
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Привет! Я klufo — креативный разработчик и дизайнер с страстью к созданию 
          уникальных цифровых опытов. Моя работа сочетает технические навыки с 
          художественным видением, чтобы создавать проекты, которые не только 
          функциональны, но и визуально впечатляют.
        </p>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mt-4">
        </p>
      </div>

      {/* Галерея фото */}
      <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div 
            key={index}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {/* Оверлей при наведении */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Дополнительные навыки/интересы с 3D иконками */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { type: 'palette', label: '3D Дизайн' },
          { type: 'laptop', label: 'Frontend' },
          { type: 'gamepad', label: 'Анимации' },
          { type: 'sparkles', label: 'UI/UX' }
        ].map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-400/30 transition-colors"
          >
            <SkillIcon3D type={item.type} />
            <span className="text-slate-300 text-sm mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}