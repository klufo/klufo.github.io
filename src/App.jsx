import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber' // ✅ Добавь этот импорт, если нет
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CanvasLoader from './components/CanvasLoader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // ✅ CanvasLoader теперь внутри Canvas
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950">
        <Canvas>
          <CanvasLoader />
        </Canvas>
      </div>
    )
  }

  return (
    <main className="relative bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <Navbar />
      
      <section id="home" className="min-h-screen flex items-center">
        <Hero />
      </section>

      <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
        <About />
      </section>

      <section id="projects" className="py-20 px-4 bg-slate-900/50">
        <Projects />
      </section>

      <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
        <Contact />
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>© 2026 180SX • Создано с 💖 и Three.js</p>
      </footer>
    </main>
  )
}

export default App