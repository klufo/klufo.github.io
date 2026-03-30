// src/components/PopupPanel.jsx
import { useEffect, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function PopupPanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = { top: '100px', right: '40px' },  // Фолбэк-позиция
  animationOrigin = 'bottom',
  anchorRef  // ← Новый проп: ref с 2D-координатами хотспота
}) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)

  // Позиционирование панели относительно хотспота (если есть anchorRef)
  useLayoutEffect(() => {
    if (!isOpen || !anchorRef?.current || !panelRef.current) return
    
    const { x, y, visible } = anchorRef.current
    const panel = panelRef.current
    
    // Если хотспот не виден (за камерой) — скрываем панель
    if (!visible) {
      panel.style.display = 'none'
      return
    }
    
    panel.style.display = 'block'
    
    // Отступы от хотспота
    const offsetX = 40
    const offsetY = -20
    
    // Позиционируем панель справа-снизу от хотспота
    let left = x + offsetX
    let top = y + offsetY
    
    // Получаем размеры панели
    const rect = panel.getBoundingClientRect()
    
    // Если панель вылезает за правый край — сдвигаем влево от хотспота
    if (left + rect.width > window.innerWidth - 20) {
      left = x - rect.width - offsetX
    }
    
    // Если панель вылезает за низ — сдвигаем вверх
    if (top + rect.height > window.innerHeight - 20) {
      top = y - rect.height - offsetY
    }
    
    // Применяем позицию
    panel.style.left = `${Math.round(left)}px`
    panel.style.top = `${Math.round(top)}px`
    panel.style.position = 'fixed'
    panel.style.margin = '0'
    panel.style.transform = 'none'  // Сбрасываем возможные трансформации
    
  }, [isOpen, anchorRef])

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Закрытие по клику вне панели
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (overlayRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Класс анимации в зависимости от направления
  const animationClass = {
    top: 'animate-float-down',
    bottom: 'animate-float-up',
    left: 'animate-float-right',
    right: 'animate-float-left'
  }[animationOrigin] || 'animate-float-up'

  return createPortal(
    <div 
      ref={overlayRef}
      className="popup-overlay fixed inset-0 z-50"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        ref={panelRef}
        className={`relative w-80 max-h-[80vh] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden ${animationClass}`}
        style={{ 
          // Фолбэк-позиция, если нет anchorRef или он ещё не готов
          ...(!anchorRef?.current?.visible ? position : {}),
          pointerEvents: 'auto'
        }}
      >
        {/* Заголовок + кнопка закрытия */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>

        {/* Контент с прокруткой */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
          {children}
        </div>

        {/* Градиентный оверлей снизу для плавного завершения скролла */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </div>
    </div>,
    document.body
  )
}