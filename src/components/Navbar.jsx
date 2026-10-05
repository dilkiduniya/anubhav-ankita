import React, { useState, useEffect } from "react";
import { Heart, Sparkles, BookOpen, Image, Star, Mail, Clock, Flame } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", href: "#story", icon: BookOpen },
    { label: "Memories", href: "#gallery", icon: Image },
    { label: "Reasons", href: "#reasons", icon: Sparkles },
    { label: "Love Orbit", href: "#orbit", icon: Star },
    { label: "Letter", href: "#letter", icon: Mail },
    { label: "Saat Phere", href: "#shaadi", icon: Flame },
    { label: "Together", href: "#countdown", icon: Clock },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#090508]/85 backdrop-blur-xl border-b border-[#F2C6A0]/10 py-3 shadow-[0_10px_30px_rgba(9,5,8,0.8)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Couple Monogram */}
        <a
          href="#hero"
          className="flex items-center gap-2 group text-[#F7E7CE] hover:text-[#F2C6A0] transition-colors"
        >
          <span className="font-display-cinzel text-lg sm:text-xl font-bold tracking-widest uppercase">
            Anubhav
          </span>
          <Heart className="w-4 h-4 text-[#D94F70] fill-[#D94F70] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 animate-pulse" />
          <span className="font-display-cinzel text-lg sm:text-xl font-bold tracking-widest uppercase">
            Ankita
          </span>
          <span className="hidden sm:inline-block ml-3 px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase bg-[#1A0710] border border-[#F2C6A0]/30 text-[#F2C6A0]/80">
            6 Apr 2025
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-[#F7E7CE]/70 hover:text-[#F2C6A0] hover:bg-[#1A0710]/60 transition-all"
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1A0710]/80 border border-[#F2C6A0]/20 text-[#F7E7CE] text-xs uppercase tracking-wider"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090508]/95 backdrop-blur-2xl border-b border-[#F2C6A0]/20 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wide text-[#F7E7CE]/80 hover:text-[#F2C6A0] py-1 border-b border-[#4A1022]/30 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#D94F70]">→</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
