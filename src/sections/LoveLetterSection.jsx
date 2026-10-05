import React from "react";
import { Sparkles, Heart, Feather, BookmarkCheck } from "lucide-react";
import { loveLetterData } from "../data/letter";

export default function LoveLetterSection() {
  return (
    <section
      id="letter"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#090508] overflow-hidden flex items-center justify-center"
    >
      {/* Background Volumetric Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8F183D]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Feather className="w-3.5 h-3.5 text-[#D94F70]" />
            <span>Unspoken Words</span>
          </div>

          <h2 className="font-display-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-[#F7E7CE] uppercase">
            {loveLetterData.title}
          </h2>

          <p className="mt-2 font-serif-cormorant italic text-base sm:text-lg text-[#F7E7CE]/70">
            {loveLetterData.subtitle}
          </p>
        </div>

        {/* Parchment Paper Love Letter Card */}
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#1A0710]/90 via-[#1A0710]/70 to-[#090508]/90 border border-[#F2C6A0]/30 shadow-[0_25px_70px_rgba(9,5,8,0.95)] backdrop-blur-xl">
          {/* Subtle Golden Thread Border Inset */}
          <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#F2C6A0]/15 pointer-events-none" />

          {/* Letter Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#F2C6A0]/15 text-xs text-[#F2C6A0]/70 font-mono">
            <span className="uppercase tracking-widest">{loveLetterData.date}</span>
            <span className="flex items-center gap-1.5 font-script-alex text-2xl text-[#D94F70]">
              Forever in progress
            </span>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-5 text-left text-sm sm:text-base md:text-lg text-[#F7E7CE]/90 font-light leading-relaxed font-sans">
            {loveLetterData.paragraphs.map((p, idx) => {
              if (idx === 0) {
                // Salutation
                return (
                  <p key={idx} className="font-serif-cormorant italic text-2xl sm:text-3xl text-[#F2C6A0] font-normal">
                    {p}
                  </p>
                );
              }
              if (idx === loveLetterData.paragraphs.length - 1) {
                // Sign-off
                return (
                  <div key={idx} className="pt-6 flex flex-col items-end">
                    <p className="font-script-alex text-3xl sm:text-4xl text-[#F2C6A0] tracking-wide">
                      {p}
                    </p>
                  </div>
                );
              }

              return (
                <p key={idx} className="whitespace-pre-line">
                  {p}
                </p>
              );
            })}
          </div>

          {/* Luxury Wax Seal Stamp */}
          <div className="mt-8 pt-6 border-t border-[#F2C6A0]/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8F183D] to-[#4A1022] border-2 border-[#F2C6A0]/50 shadow-[0_0_15px_rgba(143,24,61,0.6)] flex items-center justify-center text-xs font-display-cinzel font-bold text-[#F7E7CE]">
                A & A
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-mono tracking-widest text-[#F2C6A0]">
                  Official Seal
                </span>
                <span className="block text-xs text-[#F7E7CE]/60">
                  Signed with wholehearted certainty
                </span>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <p className="font-serif-cormorant italic text-xs text-[#F2C6A0]/80">
                "{loveLetterData.quoteStamp}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
