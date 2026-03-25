// src/App.jsx
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Gallery from './components/Gallery'  // ← Новый импорт
import Contact from './components/Contact'
import CanvasLoader from './components/CanvasLoader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

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
      
      <section id="home" className="w-full">
        <Hero />
      </section>

      <section id="about" className="py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <About />
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 w-full bg-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Projects />
          </div>
        </div>
      </section>

      {/* ← Новая секция Gallery */}
      <section id="gallery" className="py-20 w-full">
        <Gallery />
      </section>

      <section id="contact" className="py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Contact />
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800 w-full">
        <p>© 2026 klufo. Created with React and Three.js</p>
      </footer>
    </main>
  )
}

export default App