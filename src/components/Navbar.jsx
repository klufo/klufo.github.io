// src/components/Navbar.jsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { id: 'home', title: 'Главная' },
  { id: 'about', title: 'Обо мне' },
  { id: 'projects', title: 'Проекты' },
  { id: 'contact', title: 'Контакты' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id) => {
    setActive(id)
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* Контейнер: логотип слева, меню по центру на широких экранах */}
        <div className="max-w-[1600px] mx-auto flex items-center justify-between lg:justify-center lg:gap-12">
          
          {/* Логотип - всегда слева */}
          <button 
            onClick={() => scrollTo('home')} 
            className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300"
          >
            klufo
          </button>

          {/* Десктоп меню - центрируется на lg+ экранах */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-10 2xl:gap-16">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-base xl:text-lg transition-colors ${
                    active === link.id 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Мобильное меню - всегда справа */}
          <button 
            className="lg:hidden text-slate-300 hover:text-white transition-colors ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильный дропдаун */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800">
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-left text-lg ${
                    active === link.id 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}