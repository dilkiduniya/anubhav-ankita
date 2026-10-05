import React from "react";
import { Heart, Sparkles, ArrowDown, Play } from "lucide-react";
import HeroScene from "../three/HeroScene";
import { audioManager } from "../utils/audioManager";

export default function HeroSection({ onEnterStory }) {
  const handleEnterClick = () => {
    // Ensure music is active
    audioManager.tryAutoplay();
    
    // Smooth scroll to first chapter
    const target = document.getElementById("chapter-one");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (onEnterStory) onEnterStory();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090508] via-[#1A0710] to-[#090508] px-4 sm:px-6"
    >
      {/* 3D WebGL Canvas Scene */}
      <HeroScene />

      {/* Subtle Phulkari Ornamental Pattern Overlay */}
      <div className="absolute inset-0 phulkari-pattern opacity-40 pointer-events-none" />

      {/* Vignette & Soft Volumetric Glow */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#8F183D]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-20 pb-16">
        {/* Subtle romantic tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0710]/80 border border-[#F2C6A0]/25 backdrop-blur-md mb-8 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C6A0] animate-spin" style={{ animationDuration: "8s" }} />
          <span className="text-xs uppercase tracking-[0.25em] text-[#F2C6A0] font-medium font-sans">
            Our Private Digital Sanctuary
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#F2C6A0] animate-spin" style={{ animationDuration: "8s" }} />
        </div>

        {/* Primary Names Heading */}
        <h1 className="font-display-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-[#F7E7CE] uppercase flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 drop-shadow-2xl">
          <span className="gold-gradient-text">ANUBHAV</span>
          <span className="inline-flex items-center text-[#D94F70] text-3xl sm:text-5xl md:text-6xl animate-pulse">
            ❤️
          </span>
          <span className="gold-gradient-text">ANKITA</span>
        </h1>

        {/* Date and Line */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#F2C6A0]" />
          <p className="font-display-cinzel text-lg sm:text-2xl font-bold tracking-[0.3em] uppercase text-[#F2C6A0]">
            6 APRIL 2025
          </p>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#F2C6A0]" />
        </div>

        {/* Poetic Subheading */}
        <p className="mt-5 font-serif-cormorant italic text-xl sm:text-2xl md:text-3xl text-[#F7E7CE]/90 max-w-2xl font-light leading-relaxed">
          "The day two lives became one beautiful story."
        </p>

        {/* Punjabi Romantic Touch */}
        <p className="mt-2 text-xs sm:text-sm tracking-widest text-[#D94F70]/80 font-sans uppercase">
          Saadi Kahaani • The Eternal Chapter
        </p>

        {/* Enter Our Story Button */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3.5 px-8 py-4 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-[#4A1022] via-[#8F183D] to-[#4A1022] border border-[#F2C6A0]/40 text-[#F7E7CE] font-sans font-medium text-sm sm:text-base tracking-widest uppercase shadow-[0_0_35px_rgba(143,24,61,0.5)] hover:shadow-[0_0_50px_rgba(242,198,160,0.6)] hover:border-[#F2C6A0] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#F2C6A0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            <Play className="w-4 h-4 fill-current text-[#F2C6A0] group-hover:scale-110 transition-transform" />
            <span className="relative z-10 tracking-[0.2em]">Enter Our Story</span>
          </button>

          <span className="text-[11px] tracking-wider text-[#F7E7CE]/50">
            Scroll or click to explore our memories
          </span>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F7E7CE]/40 animate-bounce pointer-events-none">
          <ArrowDown className="w-4 h-4 text-[#F2C6A0]/70" />
        </div>
      </div>
    </section>
  );
}
