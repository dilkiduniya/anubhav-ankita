import React from "react";
import { Sparkles, Heart } from "lucide-react";

export default function PunjabiHeartSection() {
  return (
    <section id="punjabi" className="relative py-28 sm:py-36 px-4 sm:px-6 bg-gradient-to-b from-[#090508] via-[#1A0710] to-[#090508] overflow-hidden">
      {/* Phulkari Geometric Grid Background */}
      <div className="absolute inset-0 phulkari-pattern opacity-30 pointer-events-none" />

      {/* Warm Ambient Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8F183D]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Subtle Embroidered Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A1022]/60 border border-[#F2C6A0]/40 backdrop-blur-md mb-8 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#F2C6A0] animate-ping" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#F2C6A0] font-medium font-sans">
            Saada Ishq • Our Essence
          </span>
          <span className="w-2 h-2 rounded-full bg-[#F2C6A0] animate-ping" />
        </div>

        {/* Delicate Golden Phulkari SVG Embroidery Motif */}
        <div className="flex items-center justify-center gap-3 mb-8 opacity-80">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10L10 0L20 10L10 20L0 10Z" fill="url(#phulkariGold)" />
            <path d="M20 10L30 0L40 10L30 20L20 10Z" fill="url(#phulkariGold)" />
            <defs>
              <linearGradient id="phulkariGold" x1="0" y1="0" x2="40" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2C6A0" />
                <stop offset="1" stopColor="#D94F70" />
              </linearGradient>
            </defs>
          </svg>
          <span className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#F2C6A0]/40 to-transparent" />
          <Heart className="w-4 h-4 text-[#D94F70] fill-[#D94F70]" />
          <span className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#F2C6A0]/40 to-transparent" />
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10L10 0L20 10L10 20L0 10Z" fill="url(#phulkariGold2)" />
            <path d="M20 10L30 0L40 10L30 20L20 10Z" fill="url(#phulkariGold2)" />
            <defs>
              <linearGradient id="phulkariGold2" x1="0" y1="0" x2="40" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D94F70" />
                <stop offset="1" stopColor="#F2C6A0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Titles */}
        <h2 className="font-serif-cormorant italic text-3xl sm:text-5xl md:text-6xl text-[#F7E7CE] font-light leading-tight tracking-wide">
          "Thodi jehi Punjabi, thodi jehi pagalpan..."
        </h2>

        <p className="mt-4 font-serif-cormorant italic text-2xl sm:text-4xl text-[#F2C6A0] font-light tracking-wide">
          "...te poori tarah saadi kahaani."
        </p>

        {/* Narrative Glass Card with Phulkari Accent Borders */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl glass-panel border border-[#F2C6A0]/30 shadow-2xl relative overflow-hidden text-left">
          {/* Subtle gold stitch border pattern */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8F183D] via-[#F2C6A0] to-[#8F183D]" />

          <p className="font-sans text-base sm:text-lg text-[#F7E7CE]/90 leading-relaxed font-light">
            Koi filmy script nahi, koi banaawati baatein nahi. Just pure Punjabi warmth, endless teasing, looking out for each other, and those silent vows woven in laughter.
          </p>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#F7E7CE]/80 leading-relaxed font-light">
            Jadon tu gussa hovein te main manawa, jadon main pareshan hovan te teri ikk awaaz sab theek kar dave. That effortless balance where we don't have to pretend to be anyone else.
          </p>

          <div className="mt-8 pt-6 border-t border-[#F2C6A0]/15 flex items-center justify-between">
            <span className="font-serif-cormorant italic text-lg sm:text-xl text-[#F2C6A0]">
              Saadi jodi, rab di marzi.
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#D94F70] uppercase tracking-widest font-mono">
              <span>Anubhav</span>
              <span>❤️</span>
              <span>Ankita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
