export default function Projects() {
  const projects = [
    { title: 'Проект 1', desc: 'Описание проекта...', tags: ['React', 'Three.js'] },
    { title: 'Проект 2', desc: 'Аниме-портфолио...', tags: ['GSAP', 'Tailwind'] },
    { title: 'Проект 3', desc: '3D Конфигуратор...', tags: ['Blender', 'WebGL'] },
  ]

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
        Мои Проекты
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {projects.map((p, i) => (
          <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-pink-400 transition">
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            <p className="text-slate-400 mb-4">{p.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {p.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-pink-500/10 text-pink-300 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}