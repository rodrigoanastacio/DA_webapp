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
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Contato', href: '#contato' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 group">
          <h1
            className={`font-montserrat text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}
          >
            Dayane{' '}
            <span className="text-amber-600 group-hover:text-amber-500 transition-colors">
              Anastácio
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                isScrolled ? 'text-slate-600' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="https://wa.me/5511999999999" // TODO: Add real number
            target="_blank"
            className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5"
          >
            Agendar Consultoria
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-50 p-2 text-slate-900"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full bg-white shadow-xl py-24 px-4 flex flex-col items-center gap-6 md:hidden border-b border-gray-100"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-800 hover:text-amber-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://wa.me/5511999999999"
              className="mt-4 px-8 py-3 rounded-full bg-slate-900 text-white font-bold w-full text-center hover:bg-amber-600 transition-colors"
            >
              Agendar Consultoria
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  )
}
