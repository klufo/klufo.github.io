import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const titleRef = useScrollAnimation({
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  })

  const formRef = useScrollAnimation({
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  })

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitStatus('success')
    setFormState({ name: '', email: '', message: '' })
    setIsSubmitting(false)
    
    setTimeout(() => setSubmitStatus(null), 3000)
  }

  return (
    <div className="w-full">
      <h2 
        ref={titleRef}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 lg:mb-8 bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent"
      >
        Связаться со мной
      </h2>
      
      <p className="text-slate-400 text-center mb-8 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
        Есть идея для проекта или просто хочешь поздороваться? 
        Напиши мне — я всегда открыт к новым возможностям.
      </p>

      <div ref={formRef}>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="Ваше имя"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
              placeholder="Расскажите о своём проекте..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-emerald-400 text-center text-sm animate-pulse">
              Сообщение отправлено! Спасибо за связь.
            </p>
          )}
        </form>
      </div>

      <div className="mt-8 flex justify-center gap-4 sm:gap-6 lg:gap-8">
        <a 
          href="liatikirisa@gmail.com"
          className="text-slate-400 hover:text-cyan-400 transition-colors text-sm sm:text-base"
        >
          Email
        </a>
        <a 
          href="https://github.com/klufo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-cyan-400 transition-colors text-sm sm:text-base"
        >
          GitHub
        </a>
        <a 
          href="https://t.me/klufo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-cyan-400 transition-colors text-sm sm:text-base"
        >
          Telegram
        </a>
      </div>
    </div>
  )
}