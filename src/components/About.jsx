import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function About() {
  const titleRef = useScrollAnimation({
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  })

  const contentRef = useScrollAnimation({
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  })

  const skillsRef = useScrollAnimation({
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  })

  const skills = [
    'React / Vite',
    'Three.js / R3F',
    'Tailwind CSS',
    'GSAP Animations',
    'Blender / 3D Modeling',
    'Git / GitHub'
  ]

  return (
    <div className="w-full">
      <h2 
        ref={titleRef}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 lg:mb-12 bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent"
      >
        Обо мне
      </h2>
      
      <div ref={contentRef} className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 text-center max-w-3xl mx-auto">
        <p className="mb-4">
          Привет! Я klufo — креативный разработчик и дизайнер. 
          Совмещаю технические навыки 
          с художественным видением.
        </p>
        <p>
          Моя цель — делать сложные технологии доступными и красивыми.
        </p>
      </div>

      <div ref={skillsRef}>
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 text-center">Навыки</h3>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
          {skills.map((skill, index) => (
            <span 
              key={skill}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300 text-sm sm:text-base hover:border-cyan-400 hover:text-cyan-300 transition-colors"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}