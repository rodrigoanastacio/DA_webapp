'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { name: 'O que eu entrego', href: '#servicos' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Depoimentos', href: '#depoimentos' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-brand-navy/5 py-3 border-b border-gray-100'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 group">
          <h1 className="font-montserrat text-xl md:text-2xl font-black uppercase tracking-tighter text-brand-navy">
            Dayane{' '}
            <span className="text-brand-gold group-hover:text-brand-gold/80 transition-colors">
              Anastácio
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative text-xs font-black uppercase tracking-[0.2em] text-brand-navy overflow-hidden py-2"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transition-transform duration-300 -translate-x-[105%] group-hover:translate-x-0" />
            </Link>
          ))}

          <Link
            href="/diagnostico-de-gestao"
            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              isScrolled
                ? 'bg-brand-navy text-white shadow-xl shadow-brand-navy/20 hover:scale-105'
                : 'bg-white text-brand-navy border border-brand-navy/10 hover:bg-brand-navy hover:text-white'
            }`}
          >
            Agendar Reunião
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden relative z-50 p-2 cursor-pointer flex items-center justify-center transition-colors ${
            isMobileMenuOpen || !isScrolled ? 'text-white' : 'text-brand-navy'
          }`}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-brand-navy z-40 flex flex-col items-center justify-center gap-12 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-[0.3em] text-white hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/diagnostico-de-gestao"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 px-10 py-5 bg-brand-gold text-brand-navy text-lg font-bold uppercase tracking-widest rounded-2xl"
            >
              Iniciar Conversa
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  )
}
