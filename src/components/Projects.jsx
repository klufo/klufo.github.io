// src/components/Projects.jsx
import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const titleRef = useScrollAnimation({
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  })

  const gridRef = useScrollAnimation({
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  })

  const projects = [
    {
      id: 1,
      title: '3D Портфолио',
      description: 'Интерактивное портфолио с 3D-персонажем.',
      fullDescription: 'Полноценное портфолио разработчика с интерактивной 3D-сценой на Three.js. Включает анимации появления секций, адаптивный дизайн, форму контактов и частицы. Создано с использованием React, Vite, Tailwind CSS и GSAP.',
      image: '/images/my portfolio.png',
      tags: ['React', 'Three.js', 'GSAP', 'Tailwind'],
      githubUrl: 'https://github.com/klufo/klufo.github.io'
    },
    {
      id: 2,
      title: 'Конфигуратор персонажа',
      description: 'Веб-приложение для кастомизации 3D-аватаров.',
      fullDescription: 'Приложение позволяет пользователям настраивать внешний вид 3D-персонажа в реальном времени: менять одежду, аксессуары, цвета. Использует Zustand для управления состоянием и оптимизированный рендеринг для плавной работы.',
      image: '/images/config.png',
      tags: ['React', 'Zustand', 'Blender', 'WebGL'],
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Аниме-лендинг',
      description: 'Промо-страница с параллакс-эффектами.',
      fullDescription: 'Лендинг в аниме-стилистике с параллакс-скроллом, микро-анимациями при наведении и адаптивной версткой. Оптимизирован для быстрой загрузки и плавной прокрутки на всех устройствах.',
      image: '/images/anime landing.png',
      tags: ['Vue', 'GSAP', 'SCSS'],
      githubUrl: 'https://github.com/klufo/anime-landing',
      siteUrl: 'https://klufo.github.io/anime-landing/'
    }
  ]

  return (
    <div className="w-full">
      <h2 
        ref={titleRef}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent"
      >
        Мои Проекты
      </h2>
      
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  )
}

function ProjectCard({ project, index, onClick }) {
  const cardRef = useScrollAnimation({
    opacity: 0,
    y: 40,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'power2.out'
  })

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className="group block w-full text-left bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6 hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
    >
      <div className="aspect-video bg-slate-700/50 rounded-lg mb-4 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-slate-400 text-sm sm:text-base mb-4 line-clamp-2">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span 
            key={tag}
            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/10 text-cyan-300 text-xs sm:text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}