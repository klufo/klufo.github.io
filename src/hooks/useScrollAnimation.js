// src/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(animationVars) {
  const elementRef = useRef(null)
  const animationVarsRef = useRef(animationVars)

  useEffect(() => {
    animationVarsRef.current = animationVars
  }, [animationVars])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Пропускаем элементы с металлическим текстом — у них своя CSS-анимация
    if (element.classList?.contains('metallic-3d-text') || 
        element.classList?.contains('metallic-3d-text-sub')) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        ...animationVarsRef.current
      })
    }, element)

    return () => ctx.revert()
  }, [])

  return elementRef
}