import { useState } from 'react'
import { Menu, X } from 'lucide-react' // npm install lucide-react

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип */}
        <button onClick={() => scrollTo('home')} className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          180SX
        </button>

        {/* Десктоп меню */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`transition-colors ${active === link.id ? 'text-pink-400' : 'text-slate-300 hover:text-white'}`}
              >
                {link.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Мобильное меню */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Мобильный дропдаун */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`text-left ${active === link.id ? 'text-pink-400' : 'text-slate-300'}`}
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