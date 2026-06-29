import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getSectionScrollOffset, lenis, startLenis } from './lenis.js'

startLenis()

document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#"]')
  if (!anchor) return

  const href = anchor.getAttribute('href')
  if (!href || href === '#') return

  const target = document.querySelector(href)
  if (!target) return

  event.preventDefault()
  lenis.scrollTo(target, { offset: getSectionScrollOffset(target) })
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
