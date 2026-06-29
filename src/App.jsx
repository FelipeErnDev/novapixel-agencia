import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Clapperboard,
  Globe,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react'
import { lenis } from './lenis.js'

function CustomCursor() {
  const cursorRef = useRef(null)
  const position = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    if (!canUseCustomCursor) return undefined

    document.documentElement.classList.add('has-custom-cursor')

    const showCursor = () => {
      cursorRef.current?.classList.add('is-visible')
    }

    const hideCursor = () => {
      cursorRef.current?.classList.remove('is-visible')
    }

    const setCursorActive = (active) => {
      cursorRef.current?.classList.toggle('is-active', active)
    }

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }

      if (!cursorRef.current?.classList.contains('is-visible')) {
        position.current = { x: event.clientX, y: event.clientY }
        showCursor()
      }
    }

    const onPointerOver = (event) => {
      if (event.target.closest('a, button, summary, input, textarea, select, label')) {
        setCursorActive(true)
      }
    }

    const onPointerOut = (event) => {
      if (event.target.closest('a, button, summary, input, textarea, select, label')) {
        setCursorActive(false)
      }
    }

    let frame = 0
    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.14
      position.current.y += (target.current.y - position.current.y) * 0.14

      if (cursorRef.current) {
        const scale = cursorRef.current.classList.contains('is-active') ? 1.12 : 1
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }

      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseenter', showCursor)
    window.addEventListener('mouseleave', hideCursor)
    document.addEventListener('mouseover', onPointerOver, { passive: true })
    document.addEventListener('mouseout', onPointerOut, { passive: true })
    frame = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseenter', showCursor)
      window.removeEventListener('mouseleave', hideCursor)
      document.removeEventListener('mouseover', onPointerOver)
      document.removeEventListener('mouseout', onPointerOut)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}

function BrandMark({ className = 'brand-mark' }) {
  return (
    <span className={className}>
      <img src="/novapixel-icon.png" alt="NovaPixel" />
    </span>
  )
}

function WhatsAppIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  )
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M6.5 8.5h3v11h-3v-11ZM8 6.2A1.8 1.8 0 1 1 8 2.6a1.8 1.8 0 0 1 0 3.6ZM11.5 8.5h2.9v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v6.2h-3v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-3v-11Z" />
    </svg>
  )
}
const METHOD_STICKY_TOP = 100
const CONTACT_EMAIL = 'contato@novapixel.com'
const CONTACT_PHONE = '+55 48 98824-6549'
const WHATSAPP_NUMBER = '5548988246549'

function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function buildServiceWhatsappUrl(serviceName) {
  return buildWhatsappUrl(`Olá! Tenho interesse em ${serviceName}.`)
}

function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = document.querySelectorAll('[data-scroll-reveal]')

    if (!elements.length) return undefined

    if (prefersReduced) {
      elements.forEach((element) => element.classList.add('is-in-view'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in-view')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function HeroShowcase() {
  const serviceTiles = [
    { icon: Globe, label: 'Sites & plataformas' },
    { icon: Megaphone, label: 'Tráfego pago' },
    { icon: Clapperboard, label: 'Social & mentoria' },
  ]

  return (
    <div className="hero-showcase" aria-hidden="true">
      <div className="hero-showcase-bento">
        <article className="hero-showcase-tile hero-showcase-tile--hub" style={{ '--tile-delay': 0 }}>
          <div className="hero-showcase-pixel-grid">
            {Array.from({ length: 16 }, (_, index) => (
              <span key={index} style={{ '--pixel-i': index }} />
            ))}
          </div>
          <div className="hero-showcase-hub-copy">
            <span>Método NovaPixel</span>
            <strong>5 etapas para escalar</strong>
          </div>
        </article>

        <article className="hero-showcase-tile hero-showcase-tile--stat" style={{ '--tile-delay': 1 }}>
          <span>Clientes ativos</span>
          <strong>+150</strong>
        </article>

        <article
          className="hero-showcase-tile hero-showcase-tile--stat hero-showcase-tile--purple"
          style={{ '--tile-delay': 2 }}
        >
          <span>Impacto gerado</span>
          <strong>R$ 3M+</strong>
        </article>

        <article className="hero-showcase-tile hero-showcase-tile--services" style={{ '--tile-delay': 3 }}>
          {serviceTiles.map(({ icon: Icon, label }) => (
            <div key={label} className="hero-showcase-service-chip">
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </article>
      </div>
    </div>
  )
}

function App() {
  const whatsappUrl = buildWhatsappUrl('Olá! Quero aumentar as vendas da minha empresa.')
  const salesWhatsappUrl = buildWhatsappUrl('Olá! Quero aumentar minhas vendas.')

  const navigation = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Clientes', href: '#depoimentos' },
    { label: 'Método', href: '#metodo' },
    { label: 'Contato', href: '#contato' },
  ]

  const heroProof =
    'Mais de 150 clientes e R$ 3 milhões em impacto provam: o crescimento não é sorte, é método.'

  const tickerItems = [
    { highlight: '+150', label: 'clientes ativos' },
    { highlight: 'R$ 3M', label: 'em impacto' },
    { highlight: '+17 mil', label: 'na comunidade' },
    { highlight: '+1.800', label: 'sites entregues' },
    { highlight: '26 estados', label: 'de presença' },
  ]

  const serviceCategories = [
    {
      title: 'Sites & Plataformas',
      desc: 'Estrutura digital para apresentar, vender e escalar seu negócio online.',
      icon: Globe,
      items: [
        {
          name: 'Criação de Site',
          detail: 'Institucional, landing page e páginas de conversão',
        },
        {
          name: 'E-commerce',
          detail: 'Lojas virtuais integradas e otimizadas para vender',
        },
        {
          name: 'Plataformas',
          detail: 'Sistemas e plataformas digitais sob medida',
        },
      ],
    },
    {
      title: 'Conteúdo & Mídia',
      desc: 'Produção e gestão para manter sua marca presente e relevante.',
      icon: Clapperboard,
      items: [
        {
          name: 'Social Media',
          detail: 'Gestão, calendário e conteúdo para redes sociais',
        },
        {
          name: 'Captação de Conteúdo',
          detail: 'Vídeo profissional e mobile para redes, docs e storymaker',
        },
        {
          name: 'Fotos Profissionais',
          detail: 'Ensaios para pessoas, produtos e campanhas',
        },
      ],
    },
    {
      title: 'Marketing & Marca',
      desc: 'Estratégia, visibilidade e posicionamento para crescer com método.',
      icon: Megaphone,
      items: [
        {
          name: 'Tráfego Pago',
          detail: 'Campanhas em Google, Meta e outros canais',
        },
        {
          name: 'Design',
          detail: 'Identidade visual e branding',
        },
        {
          name: 'Mentoria de Marketing',
          detail: 'Estratégia de marketing para empreendedores e empresas',
        },
      ],
    },
  ]

  const reviews = [
    {
      name: 'Bruno Carvalho',
      meta: 'Local Guide · 124 avaliações',
      time: '8 meses atrás',
      text: 'O time da NovaPixel Agencia vem fazendo um grande impacto nas vendas e na geração de novos clientes para nós da Patrulha BT. O pessoal é muito profissional, dedicado e sempre disponível para esclarecer dúvidas. Quem começou com poucas vendas percebeu um crescimento considerável com o serviço deles.',
      photo: '/reviews/bruno-carvalho.jpg',
    },
    {
      name: 'Larissa Mendes',
      meta: '3 avaliações',
      time: '5 meses atrás',
      text: 'A NovaPixel Agencia transformou completamente nossa presença digital. Estratégia clara, execução impecável e resultados que aparecem mês após mês. Recomendo de olhos fechados para quem quer crescer com método.',
      photo: '/reviews/larissa-mendes.jpg',
    },
    {
      name: 'Thiago Nascimento',
      meta: '1 avaliação',
      time: '10 meses atrás',
      text: 'Profissionais extremamente competentes. Desde que começamos a trabalhar juntos, nosso faturamento cresceu de forma consistente. A equipe entende o negócio e propõe soluções que realmente funcionam.',
      photo: '/reviews/thiago-nascimento.jpg',
    },
    {
      name: 'Fernanda Lima',
      meta: 'Local Guide · 42 avaliações',
      time: '3 meses atrás',
      text: 'Contratei a NovaPixel Agencia para estruturar nosso marketing e o retorno superou todas as expectativas. Time acessível, transparente e focado em resultado. Hoje temos previsibilidade nas vendas.',
      photo: '/reviews/fernanda-lima.jpg',
    },
    {
      name: 'Gustavo Ribeiro',
      meta: '7 avaliações',
      time: '6 meses atrás',
      text: 'Excelente experiência do início ao fim. A consultoria ajudou a reorganizar nosso funil comercial e as campanhas passaram a gerar leads muito mais qualificados para o time de vendas.',
      photo: '/reviews/gustavo-ribeiro.jpg',
    },
    {
      name: 'Aline Cavalcanti',
      meta: '2 avaliações',
      time: '1 ano atrás',
      text: 'Vai muito além do marketing digital. Eles estão juntos com a gente, ajudando a melhorar a empresa em vários departamentos. Essa sinergia tem sido fundamental para o crescimento do negócio.',
      photo: '/reviews/aline-cavalcanti.jpg',
    },
    {
      name: 'Rodrigo Peixoto',
      meta: '5 avaliações',
      time: '4 meses atrás',
      text: 'A metodologia da NovaPixel Agencia é diferenciada. Cada etapa é pensada com base em dados e o acompanhamento é constante. Sentimos que temos um parceiro estratégico, não só uma agência.',
      photo: '/reviews/rodrigo-peixoto.jpg',
    },
    {
      name: 'Beatriz Oliveira',
      meta: 'Local Guide · 89 avaliações',
      time: '7 meses atrás',
      text: 'Resultados reais em poucos meses. O site ficou impecável, as campanhas performam bem e o suporte é rápido. Para quem busca crescimento com consistência, é a escolha certa.',
      photo: '/reviews/beatriz-oliveira.jpg',
    },
    {
      name: 'Rafael Costa',
      meta: '4 avaliações',
      time: '9 meses atrás',
      text: 'Equipe dedicada, entregas no prazo e foco em performance. Recebemos a consultoria e vimos impacto direto no faturamento. Já indicamos para outros empreendedores do nosso círculo.',
      photo: '/reviews/rafael-costa.jpg',
    },
  ]

  const faq = [
    {
      q: 'A NovaPixel Agencia é uma agência ou uma consultoria?',
      a: 'Somos uma consultoria de crescimento digital com execução própria. Atuamos como parceiros estratégicos do negócio — não entregamos apenas peças isoladas, mas construímos sistemas de marketing e vendas com método.',
    },
    {
      q: 'Para qual momento de empresa a NovaPixel Agencia é indicada?',
      a: 'A NovaPixel Agencia é indicada para negócios que já faturam e querem crescer com previsibilidade — empresas que entendem que marketing não é aposta, mas construção com método, processo e números.',
    },
    {
      q: 'Onde vocês atendem?',
      a: 'Atendemos em 26 estados do Brasil, com operação remota e encontros presenciais quando faz sentido para o projeto. O processo é pensado para funcionar independentemente da localização.',
    },
    {
      q: 'Quais são os planos?',
      a: 'Não trabalhamos com pacotes genéricos. Cada parceria é desenhada a partir do momento de maturidade do negócio, do faturamento e dos objetivos de crescimento — da percepção de marca até a escala com momentum.',
    },
    {
      q: 'Como começar uma conversa?',
      a: 'Preencha o formulário de contato ou fale direto pelo WhatsApp. A primeira conversa é gratuita, sem compromisso, para entender seu cenário e indicar o caminho mais adequado.',
    },
  ]

  const revenueOptions = [
    { id: 'below-10k', label: 'Abaixo de R$ 10 mil/mês' },
    { id: '10-50k', label: 'R$ 10 mil – 50 mil/mês' },
    { id: '50-100k', label: 'R$ 50 mil – 100 mil/mês' },
    { id: 'above-100k', label: 'Acima de R$ 100 mil/mês' },
  ]

  const contactCards = [
    { icon: Mail, label: 'E-mail', value: CONTACT_EMAIL, copyValue: CONTACT_EMAIL },
    { icon: Phone, label: 'WhatsApp', value: CONTACT_PHONE, copyValue: CONTACT_PHONE },
    { icon: MapPin, label: 'Localização', value: 'Atendemos 26 estados' },
  ]

  const socialLinks = [
    { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/novapixelagencia/', external: true },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://br.linkedin.com/company/nova-pixel-agencia', external: true },
    { icon: WhatsAppIcon, label: 'WhatsApp', href: whatsappUrl, external: true },
  ]

  const footerLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Clientes', href: '#depoimentos' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Método', href: '#metodo' },
    { label: 'FAQ', href: '#faq' },
  ]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    revenue: 'below-10k',
    message: '',
  })

  const handleFormChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const revenueLabel =
      revenueOptions.find((option) => option.id === formData.revenue)?.label ?? formData.revenue

    const message = [
      'Olá! Quero uma análise do meu cenário.',
      '',
      `Nome: ${formData.name}`,
      `E-mail: ${formData.email}`,
      `WhatsApp: ${formData.whatsapp}`,
      formData.company ? `Empresa: ${formData.company}` : null,
      `Faturamento: ${revenueLabel}`,
      formData.message ? `Cenário: ${formData.message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(buildWhatsappUrl(message), '_blank', 'noreferrer')
  }

  const methodSteps = [
    {
      key: '01',
      title: 'Posicionamento',
      badge: 'B',
      heading: 'Marca',
      lead: 'Posicionamento marca o primeiro degrau de maturidade do negócio.',
      desc: 'Para conquistar clientes, sua empresa precisa transmitir valor de forma clara ao público ideal. Ajustamos como você aparece no digital — site, páginas de conversão, identidade e redes — para construir uma presença sólida, coerente e capaz de despertar interesse real.',
      tags: ['Site corporativo', 'Páginas de conversão', 'Visual da marca', 'Social media'],
    },
    {
      key: '02',
      title: 'Captação',
      badge: 'L',
      heading: 'Oportunidades',
      lead: 'Captação é converter visibilidade em contatos com potencial real.',
      desc: 'Montamos campanhas, páginas e fluxos de aquisição para atrair visitantes certos, encher o funil com oportunidades qualificadas e dar ao comercial uma base estável para vender com menos incerteza.',
      tags: ['Mídia paga', 'Páginas de conversão', 'Tráfego orgânico'],
    },
    {
      key: '03',
      title: 'Operação',
      badge: 'O',
      heading: 'Estrutura Comercial',
      lead: 'Operação é o que mantém o crescimento vivo depois que a captação começa.',
      desc: 'Implantamos CRM, processos e cadências de vendas para o time fechar mais negócios, entregar com padrão e deixar de depender de esforço solto para atingir metas.',
      tags: ['Gestão de relacionamento', 'Processos', 'Capacitação'],
    },
    {
      key: '04',
      title: 'Análise',
      badge: 'O',
      heading: 'Performance',
      lead: 'Análise é observar, experimentar e decidir com critério.',
      desc: 'Acompanhamos indicadores, rodamos testes e escolhemos o que evoluir primeiro com base em números concretos — campanhas, páginas e rotinas passam a melhorar com escolhas fundamentadas.',
      tags: ['Testes A/B', 'Métricas', 'Painéis'],
    },
    {
      key: '05',
      title: 'Escala',
      badge: 'M',
      heading: 'Tração',
      lead: 'Escala é multiplicar o que já provou resultado com regularidade.',
      desc: 'Conectamos automações e ampliamos o que dá certo para sustentar avanço constante, repetível e duradouro no negócio.',
      tags: ['Automações', 'Rotinas', 'Expansão'],
    },
  ]

  const [activeMethod, setActiveMethod] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [copiedContact, setCopiedContact] = useState(null)
  const [headerFloating, setHeaderFloating] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 1024
  )
  const methodScrollerRef = useRef(null)
  const methodStickyRef = useRef(null)
  const activeStep = methodSteps[activeMethod]

  const handleFaqToggle = (index) => (event) => {
    event.preventDefault()
    setOpenFaqIndex((current) => (current === index ? null : index))
  }

  const copyContactValue = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedContact(label)
      window.setTimeout(() => setCopiedContact(null), 1800)
    } catch {
      const helper = document.createElement('textarea')
      helper.value = value
      helper.setAttribute('readonly', '')
      helper.style.position = 'absolute'
      helper.style.left = '-9999px'
      document.body.appendChild(helper)
      helper.select()
      document.execCommand('copy')
      document.body.removeChild(helper)
      setCopiedContact(label)
      window.setTimeout(() => setCopiedContact(null), 1800)
    }
  }

  const getStickyTopValue = useCallback(() => {
    const value = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--method-sticky-top')
    )
    return Number.isFinite(value) ? value : METHOD_STICKY_TOP
  }, [])

  const getMethodStickyTop = useCallback(() => {
    const sticky = methodStickyRef.current
    const scroller = methodScrollerRef.current
    if (!sticky || !scroller || window.innerWidth <= 1024) return METHOD_STICKY_TOP

    const stickyHeight = sticky.offsetHeight
    const viewport = window.innerHeight
    const minTop =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) +
        16 || METHOD_STICKY_TOP

    const headerEl = scroller.previousElementSibling
    if (headerEl?.classList.contains('method-header')) {
      const headerRect = headerEl.getBoundingClientRect()
      if (headerRect.bottom > minTop && headerRect.top < viewport * 0.8) {
        const available = viewport - headerRect.bottom - 32
        const offset = Math.max(16, (available - stickyHeight) / 2)
        return Math.round(headerRect.bottom + offset)
      }
    }

    return Math.round(Math.max(minTop, (viewport - stickyHeight) / 2))
  }, [])

  const getMethodScrollMetrics = useCallback(() => {
    const scroller = methodScrollerRef.current
    if (!scroller) return null

    const viewport = window.innerHeight
    const stickyTop = getStickyTopValue()
    const scrollableDistance = Math.max(1, scroller.offsetHeight - viewport + stickyTop)
    const rect = scroller.getBoundingClientRect()
    const scrolled = Math.min(
      scrollableDistance,
      Math.max(0, stickyTop - rect.top)
    )

    return { scrollableDistance, scrolled, stickyTop }
  }, [getStickyTopValue])

  const getStepFromScroll = useCallback(() => {
    const metrics = getMethodScrollMetrics()
    if (!metrics) return 0

    const progress = metrics.scrolled / metrics.scrollableDistance
    return Math.min(
      methodSteps.length - 1,
      Math.max(0, Math.floor(progress * methodSteps.length))
    )
  }, [getMethodScrollMetrics, methodSteps.length])

  const scrollToMethodStep = useCallback(
    (idx) => {
      if (window.innerWidth <= 1024) {
        setActiveMethod(idx)
        return
      }

      const scroller = methodScrollerRef.current
      if (!scroller) return

      const metrics = getMethodScrollMetrics()
      if (!metrics) return

      const progress = methodSteps.length <= 1 ? 0 : idx / (methodSteps.length - 1)
      const scrollerTop = lenis.scroll + scroller.getBoundingClientRect().top
      const target = scrollerTop + progress * metrics.scrollableDistance

      lenis.scrollTo(target, { duration: 1.05 })
    },
    [getMethodScrollMetrics, methodSteps.length]
  )

  useEffect(() => {
    const updateLayoutMode = () => {
      setIsMobileLayout(window.innerWidth <= 1024)
      if (window.innerWidth > 1024) {
        setMobileNavOpen(false)
      }
    }

    updateLayoutMode()
    window.addEventListener('resize', updateLayoutMode)

    return () => {
      window.removeEventListener('resize', updateLayoutMode)
    }
  }, [])

  useEffect(() => {
    if (!mobileNavOpen) return undefined

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    const updateMethodScroll = () => {
      if (window.innerWidth > 1024) {
        document.documentElement.style.setProperty(
          '--method-sticky-top',
          `${getMethodStickyTop()}px`
        )
        setActiveMethod(getStepFromScroll())
      } else {
        document.documentElement.style.removeProperty('--method-sticky-top')
      }
    }

    updateMethodScroll()
    lenis.on('scroll', updateMethodScroll)
    window.addEventListener('resize', updateMethodScroll)

    return () => {
      lenis.off('scroll', updateMethodScroll)
      window.removeEventListener('resize', updateMethodScroll)
    }
  }, [getMethodStickyTop, getStepFromScroll])

  useEffect(() => {
    const updateHeader = () => {
      setHeaderFloating(lenis.scroll > 48)
      setShowStickyCta(lenis.scroll > 360)
    }

    updateHeader()
    lenis.on('scroll', updateHeader)

    return () => {
      lenis.off('scroll', updateHeader)
    }
  }, [])

  useScrollReveal()

  return (
    <>
      <CustomCursor />
      <div className="site-shell">
        <div className="site-glow site-glow-left" aria-hidden="true" />
        <div className="site-glow site-glow-right" aria-hidden="true" />

        <header
          className={`site-header site-header-floating reveal ${headerFloating ? 'is-floating' : ''} ${mobileNavOpen ? 'is-nav-open' : ''}`}
        >
          <div className="site-header-inner">
            <a href="#inicio" className="brand" onClick={() => setMobileNavOpen(false)}>
              <BrandMark />
              <span>
                <strong>NovaPixel Agencia</strong>
                <small className="brand-tagline">Agencia digital</small>
              </span>
            </a>

            <nav className="site-nav site-nav--desktop" aria-label="Navegação principal">
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              className="header-cta header-cta--desktop"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Falar com a NovaPixel Agencia <ArrowRight size={16} />
            </a>

            <button
              type="button"
              className="site-nav-toggle"
              aria-expanded={mobileNavOpen}
              aria-controls="site-nav-panel"
              aria-label={mobileNavOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        <div
          id="site-nav-panel"
          className={`site-nav-panel ${mobileNavOpen ? 'is-open' : ''}`}
        >
          <nav className="site-nav site-nav--mobile" aria-label="Navegação mobile">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="header-cta header-cta--mobile"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileNavOpen(false)}
          >
            Falar no WhatsApp <ArrowRight size={16} />
          </a>
        </div>

        <div className="site-inner">
          <main>
            <section id="inicio" className="full-bleed hero-shell">
              <div className="hero-background" aria-hidden="true">
                <div className="hero-orb hero-orb-left" />
                <div className="hero-orb hero-orb-right" />
              </div>

              <div className="hero-shell-inner">
                <div className="hero-shell-body">
                  <div className="hero-layout">
                    <div className="hero-copy hero-copy-open">
                <div className="hero-stagger eyebrow" style={{ '--hero-delay': 0 }}>
                  <span>• crescendo negócios desde 2019</span>
                </div>
                <h1 className="hero-stagger" style={{ '--hero-delay': 1 }}>
                  <span className="brand-lime">Estratégia, design</span> e{' '}
                  <span className="brand-lime">tecnologia</span> para negócios que{' '}
                  <span className="brand-lime">performam.</span>
                </h1>
                <p className="hero-stagger mobile-hide" style={{ '--hero-delay': 2 }}>{heroProof}</p>

                <div className="hero-actions hero-stagger" style={{ '--hero-delay': 3 }}>
                  <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Falar com a NovaPixel Agencia <ArrowRight size={18} />
                  </a>
                  <a
                    className="secondary-button mobile-hide"
                    href={salesWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Quero aumentar minhas vendas
                  </a>
                </div>
                  </div>

                    <HeroShowcase />
                  </div>
                </div>
              </div>
            </section>

            <section className="stats-marquee" aria-label="Destaques em números">
              <div className="stats-marquee-track">
                {[0, 1].map((group) => (
                  <div key={group} className="stats-marquee-group" aria-hidden={group === 1}>
                    {tickerItems.map((item, index) => (
                      <React.Fragment key={`${group}-${item.highlight}`}>
                        <span className="stats-marquee-item">
                          <strong>{item.highlight}</strong> {item.label}
                        </span>
                        {index < tickerItems.length - 1 && (
                          <span className="stats-marquee-sep" aria-hidden="true">
                            ◆
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section id="servicos" className="full-bleed services-section">
              <div className="services-inner">
                <div className="services-header" data-scroll-reveal>
                  <span className="services-kicker">• o que fazemos</span>
                  <h2 className="services-title">
                    Soluções completas para{' '}
                    <span className="services-accent">crescer no digital.</span>
                  </h2>
                  <p className="services-lead">
                    Três frentes de atuação para cobrir presença digital, conteúdo e crescimento.
                  </p>
                </div>

                <div className="services-grid">
                  {serviceCategories.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <article
                        key={category.title}
                        className="service-category-card"
                        data-scroll-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                      >
                        <div className="service-category-head">
                          <span className="service-category-icon">
                            <Icon size={20} strokeWidth={1.8} />
                          </span>
                          <h3 className="service-category-title">{category.title}</h3>
                        </div>

                        <p className="service-category-lead">{category.desc}</p>

                        <ul className="service-category-list">
                          {category.items.map((item) => (
                            <li key={item.name} className="service-category-item">
                              <div className="service-category-copy">
                                <strong>{item.name}</strong>
                                <span>{item.detail}</span>
                              </div>
                              <a
                                className="service-category-cta"
                                href={buildServiceWhatsappUrl(item.name)}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Tenho interesse <ArrowRight size={14} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </article>
                    )
                  })}
                </div>
              </div>
            </section>

            <section id="depoimentos" className="full-bleed reviews-section">
              <div className="reviews-inner">
                <div className="reviews-header" data-scroll-reveal>
                  <span className="reviews-kicker">• o que nossos clientes dizem?</span>
                  <h2 className="reviews-title">
                    O resultado de nossos clientes{' '}
                    <span className="reviews-accent">é o nosso combustível.</span>
                  </h2>
                </div>

                <div className="reviews-grid">
                  {reviews.map((review, index) => (
                    <article
                      key={review.name}
                      className="review-card"
                      data-scroll-reveal
                      style={{ '--reveal-delay': `${(index % 3) * 70}ms` }}
                    >
                      <div className="review-card-top">
                        <div className="review-author">
                          <img
                            src={review.photo}
                            alt={`Foto de ${review.name}`}
                            className="review-photo"
                            loading="lazy"
                          />
                          <div>
                            <strong>{review.name}</strong>
                            <span>{review.meta}</span>
                          </div>
                        </div>
                      </div>

                      <div className="review-rating">
                        <div className="review-stars" aria-label="5 estrelas">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} size={14} fill="#fbbc04" stroke="#fbbc04" />
                          ))}
                        </div>
                        <span>{review.time}</span>
                      </div>

                      <p className="review-text">{review.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

          <section id="sobre" className="full-bleed about-section">
            <div className="about-inner">
              <div className="about-copy" data-scroll-reveal>
                <BrandMark className="about-logo" />
                <span className="about-kicker">
                  <span className="about-kicker-dot" aria-hidden="true" />
                  Quem somos
                </span>
                <h2 className="about-title">
                  Estratégia e execução com rosto, método e{' '}
                  <span className="about-accent">parceria de verdade.</span>
                </h2>
                <p className="about-lead">
                  Somos os sócios por trás da NovaPixel Agencia — unimos visão de negócio,
                  design e tecnologia para construir presença digital que performa e escala com
                  consistência.
                </p>
                <p className="about-text mobile-hide">
                  Acreditamos em processo, dados e proximidade. Cada projeto começa entendendo o
                  cenário do cliente e evolui com acompanhamento próximo, do branding à conversão.
                </p>
                <p className="about-tagline">Criar. Conectar. Expandir.</p>
              </div>

              <figure className="about-visual" data-scroll-reveal="scale" style={{ '--reveal-delay': '120ms' }}>
                <div className="about-visual-frame">
                  <img
                    src="/fundadores-novapixel.png"
                    alt="Fundadores da NovaPixel Agencia no escritório"
                    loading="lazy"
                  />
                </div>
              </figure>
            </div>
          </section>

          <section id="metodo" className="full-bleed method-section">
            <div className="method-inner">
              <div className="method-header" data-scroll-reveal>
                <span className="method-kicker">• método novapixel agencia</span>
                <h2 className="method-title">
                  Cinco etapas. <span className="method-accent">Um sistema.</span>
                </h2>
                <p className="method-sub mobile-hide">
                  Cada etapa eleva o próximo nível de maturidade do negócio.
                </p>
              </div>

              {isMobileLayout ? (
                <ol className="method-mobile-list">
                  {methodSteps.map((step) => (
                    <li className="method-mcard" key={step.key}>
                      <span className="method-mcard-badge">{step.badge}</span>
                      <div className="method-mcard-body">
                        <span className="method-mcard-flag">
                          ETAPA {step.key} · {step.title.toUpperCase()}
                        </span>
                        <h3>{step.heading}</h3>
                        <p>{step.lead}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div
                  className="method-scroller"
                  ref={methodScrollerRef}
                  style={{ '--method-step-count': methodSteps.length, '--reveal-delay': '100ms' }}
                  data-scroll-reveal
                >
                  <div className="method-sticky" ref={methodStickyRef}>
                    <nav className="method-steps-nav" aria-label="Etapas do método">
                      {methodSteps.map((step, idx) => (
                        <button
                          key={step.key}
                          type="button"
                          onClick={() => scrollToMethodStep(idx)}
                          className={`method-nav-item ${activeMethod === idx ? 'active' : ''}`}
                          aria-current={activeMethod === idx ? 'step' : undefined}
                        >
                          <span className="method-nav-badge">{step.badge}</span>
                          <span className="method-nav-copy">
                            <small>
                              {step.key} · {step.title.toUpperCase()}
                            </small>
                            <strong>{step.heading}</strong>
                          </span>
                        </button>
                      ))}
                    </nav>

                    <article className="method-panel" key={activeStep.key}>
                      <div className="method-panel-head">
                        <div className="method-badge">{activeStep.badge}</div>
                        <div>
                          <span className="method-flag">
                            ETAPA {activeStep.key} · {activeStep.title.toUpperCase()}
                          </span>
                          <h3>{activeStep.heading}</h3>
                        </div>
                      </div>

                      <p className="method-lead">{activeStep.lead}</p>
                      <p className="method-desc">{activeStep.desc}</p>

                      <div className="method-tags">
                        {activeStep.tags.map((tag) => (
                          <span key={tag} className="method-tag">
                            • {tag}
                          </span>
                        ))}
                      </div>

                      <div className="method-segments" aria-hidden="true">
                        {methodSteps.map((step, idx) => (
                          <span
                            key={step.key}
                            className={`method-segment ${idx <= activeMethod ? 'is-filled' : ''}`}
                          />
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="full-bleed faq-section" id="faq">
            <div className="faq-inner">
              <div className="faq-intro" data-scroll-reveal>
                <span className="faq-kicker">
                  <span className="faq-kicker-dot" aria-hidden="true" />
                  Perguntas frequentes
                </span>
                <h2 className="faq-title">
                  Tudo que você quer saber, <span className="faq-accent">sem rodeios.</span>
                </h2>
                <p className="faq-lead mobile-hide">
                  Não encontrou sua dúvida? Mande uma mensagem direto pelo{' '}
                  <a href="#contato">formulário de contato</a>.
                </p>
              </div>

              <div className="faq-list">
                {faq.map((item, index) => (
                  <details
                    key={item.q}
                    className="faq-item"
                    data-scroll-reveal
                    style={{ '--reveal-delay': `${index * 60}ms` }}
                    open={openFaqIndex === index}
                  >
                    <summary onClick={handleFaqToggle(index)}>
                      <span>{item.q}</span>
                      <span className="faq-toggle" aria-hidden="true" />
                    </summary>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="contato" className="full-bleed contact-section">
            <div className="contact-inner">
              <div className="contact-info" data-scroll-reveal>
                <span className="contact-kicker">• vamos conversar</span>
                <h2 className="contact-title">
                  Vamos crescer seu negócio <span className="contact-accent">juntos?</span>
                </h2>
                <p className="contact-lead mobile-hide">
                  Estamos ansiosos para trabalhar com você. A primeira conversa é gratuita e sem
                  compromisso.
                </p>

                <div className="contact-cards mobile-hide">
                  {contactCards.map((item) => {
                    const Icon = item.icon
                    const isCopied = copiedContact === item.label

                    if (item.copyValue) {
                      return (
                        <button
                          key={item.label}
                          type="button"
                          className={`contact-info-card contact-info-card--copy ${isCopied ? 'is-copied' : ''}`}
                          onClick={() => copyContactValue(item.label, item.copyValue)}
                          aria-label={`Copiar ${item.label}: ${item.value}`}
                        >
                          <span className="contact-info-icon">
                            <Icon size={18} />
                          </span>
                          <div>
                            <span className="contact-info-label">{item.label}</span>
                            <strong>{isCopied ? 'Copiado!' : item.value}</strong>
                          </div>
                        </button>
                      )
                    }

                    return (
                      <article key={item.label} className="contact-info-card">
                        <span className="contact-info-icon">
                          <Icon size={18} />
                        </span>
                        <div>
                          <span className="contact-info-label">{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      </article>
                    )
                  })}
                </div>

                <div className="contact-quick mobile-only">
                  <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Chamar no WhatsApp <ArrowRight size={18} />
                  </a>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => copyContactValue('E-mail', CONTACT_EMAIL)}
                  >
                    {copiedContact === 'E-mail' ? 'E-mail copiado!' : 'Copiar e-mail'}
                  </button>
                </div>

                <div className="contact-social mobile-hide">
                  <span className="contact-social-label">Siga a NovaPixel Agencia</span>
                  <div className="contact-social-links">
                    {socialLinks.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className="contact-social-button"
                          aria-label={item.label}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noreferrer' : undefined}
                        >
                          <Icon size={18} />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              <form
                className="contact-form"
                data-scroll-reveal
                style={{ '--reveal-delay': '120ms' }}
                onSubmit={handleFormSubmit}
              >
                <label className="form-field">
                  <span>Nome completo</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleFormChange('name')}
                    required
                  />
                </label>

                <div className="form-row">
                  <label className="form-field">
                    <span>E-mail</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleFormChange('email')}
                      required
                    />
                  </label>
                  <label className="form-field">
                    <span>WhatsApp</span>
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="(00) 00000-0000"
                      value={formData.whatsapp}
                      onChange={handleFormChange('whatsapp')}
                      required
                    />
                  </label>
                </div>

                <label className="form-field form-field--mobile-hide">
                  <span>Nome da empresa</span>
                  <input
                    type="text"
                    name="company"
                    placeholder="Nome da sua empresa"
                    value={formData.company}
                    onChange={handleFormChange('company')}
                  />
                </label>

                <fieldset className="form-field form-field--mobile-hide">
                  <legend>Faturamento mensal</legend>
                  <div className="revenue-grid">
                    {revenueOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`revenue-option ${formData.revenue === option.id ? 'is-selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="revenue"
                          value={option.id}
                          checked={formData.revenue === option.id}
                          onChange={handleFormChange('revenue')}
                        />
                        <span className="revenue-dot" aria-hidden="true" />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="form-field">
                  <span>{isMobileLayout ? 'Como podemos ajudar?' : 'Conte sobre seu cenário'}</span>
                  <small className="form-field--mobile-hide">
                    Qual o seu segmento? Quais são as maiores dificuldades enfrentadas hoje?
                  </small>
                  <textarea
                    name="message"
                    rows={isMobileLayout ? 3 : 5}
                    placeholder={
                      isMobileLayout
                        ? 'Ex: quero aumentar vendas no digital...'
                        : 'Ex: Sou do segmento de serviços B2B, tenho dificuldade em gerar leads qualificados e preciso estruturar minha presença digital...'
                    }
                    value={formData.message}
                    onChange={handleFormChange('message')}
                  />
                </label>

                <button type="submit" className="primary-button contact-submit">
                  {isMobileLayout ? (
                    <>
                      Enviar no WhatsApp <ArrowRight size={18} />
                    </>
                  ) : (
                    <>
                      Quero uma análise do meu cenário <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="form-disclaimer mobile-hide">
                  Ao enviar, você concorda em receber um retorno da equipe NovaPixel Agencia.
                </p>
              </form>
            </div>
          </section>
        </main>

        <section className="full-bleed footer-cta mobile-hide">
          <div className="footer-cta-inner" data-scroll-reveal="scale">
            <span className="footer-cta-kicker">Próximo passo</span>
            <h2>
              Vamos crescer seu negócio com <em>método</em>.
            </h2>
            <p>Estamos ansiosos para trabalhar com você. A primeira conversa é gratuita.</p>
            <div className="footer-cta-actions">
              <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                Falar com a NovaPixel Agencia <ArrowRight size={18} />
              </a>
              <a className="secondary-button" href="#metodo">
                Ver o Método em detalhe
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer full-bleed">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <a href="#inicio" className="brand footer-brand-link">
                  <BrandMark />
                  <span>
                    <strong>NovaPixel Agencia</strong>
                    <small>Agencia digital</small>
                  </span>
                </a>
                <p>
                  Estratégia, design e tecnologia para negócios que performam. Desde 2019.
                </p>
                <div className="contact-social">
                  <span className="contact-social-label">Siga a NovaPixel Agencia</span>
                  <div className="contact-social-links">
                    {socialLinks.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={`footer-${item.label}`}
                          href={item.href}
                          className="contact-social-button"
                          aria-label={item.label}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noreferrer' : undefined}
                        >
                          <Icon size={18} />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="footer-column">
                <span className="footer-column-title">Navegar</span>
                <nav className="footer-links" aria-label="Links do rodapé">
                  {footerLinks.map((item) => (
                    <a key={item.href} href={item.href}>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="footer-column">
                <span className="footer-column-title">Contato</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  {CONTACT_PHONE}
                </a>
                <span className="footer-contact-note">Atendimento em 26 estados</span>
                <a className="footer-contact-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Falar agora <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="footer-bottom">
              <small>© 2024 NovaPixel Agencia. Todos os direitos reservados.</small>
              <small className="footer-bottom-note">Crescendo negócios desde 2019</small>
            </div>
          </div>
        </footer>
        </div>
      </div>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir conversa no WhatsApp">
        <WhatsAppIcon />
      </a>

      <div className={`mobile-cta-bar ${showStickyCta ? 'is-visible' : ''}`}>
        <div className="mobile-cta-bar-text">
          <strong>Análise gratuita</strong>
          <span>Resposta rápida no WhatsApp</span>
        </div>
        <a
          className="mobile-cta-bar-action"
          href={salesWhatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon size={20} />
          Falar agora
        </a>
      </div>
    </>
  )
}

export default App
