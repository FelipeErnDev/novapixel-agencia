import Lenis from 'lenis'

export const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

export function getSectionScrollOffset(element) {
  if (!(element instanceof HTMLElement)) return 0

  const viewportHeight = window.innerHeight
  const styles = getComputedStyle(element)
  const rootStyles = getComputedStyle(document.documentElement)
  const scrollMargin = Number.parseFloat(styles.scrollMarginTop) || 0
  const scrollPadding = Number.parseFloat(rootStyles.scrollPaddingTop) || 0
  const sectionHeight = element.getBoundingClientRect().height
  const visibleHeight = Math.min(sectionHeight, viewportHeight)
  const centeredTop = (viewportHeight - visibleHeight) / 2

  return scrollMargin + scrollPadding - centeredTop
}

export function startLenis() {
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
