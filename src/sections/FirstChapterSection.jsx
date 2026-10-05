import React, { useState } from "react";
import { Calendar, Sparkles, Heart, Compass } from "lucide-react";

export default function FirstChapterSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="chapter-one"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#090508] flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8F183D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#F2C6A0]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Chapter One</span>
          </div>

          <h2 className="font-serif-cormorant italic text-3xl sm:text-5xl md:text-6xl text-[#F7E7CE] font-normal tracking-wide">
            "And then... there was us."
          </h2>

          <p className="mt-4 font-display-cinzel text-sm sm:text-base tracking-[0.2em] uppercase text-[#D94F70]">
            6 APRIL 2025 — The beginning of our little universe.
          </p>
        </div>

        {/* 3D Floating Photograph Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Physical Card */}
          <div className="lg:col-span-7 flex justify-center perspective-[1000px]">
            <div className="group relative w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-3xl p-3 sm:p-4 glass-panel border border-[#F2C6A0]/30 shadow-[0_25px_60px_rgba(9,5,8,0.9)] transform transition-transform duration-700 ease-out hover:rotate-y-3 hover:-rotate-x-3 hover:scale-[1.02]">
              {/* Photo Frame Container */}
              <div className="relative w-full h-[82%] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A0710] via-[#4A1022] to-[#090508] border border-[#F2C6A0]/10">
                {!imgError ? (
                  <img
                    src="/images/photo1.jpg"
                    alt="Anubhav and Ankita - 6 April 2025"
                    className="w-full h-full object-cover object-center filter saturate-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#1A0710] via-[#4A1022]/80 to-[#090508]">
                    <div className="w-20 h-20 rounded-full bg-[#1A0710] border border-[#F2C6A0]/30 flex items-center justify-center mb-4 shadow-xl">
                      <Heart className="w-8 h-8 text-[#D94F70]" />
                    </div>
                    <span className="font-display-cinzel text-xl text-[#F2C6A0] tracking-wider">
                      Anubhav & Ankita
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#F7E7CE]/60 mt-1">
                      Our First Chapter
                    </span>
                  </div>
                )}

                {/* Subtle vignette on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090508]/80 via-transparent to-transparent pointer-events-none" />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#090508]/80 backdrop-blur-md border border-[#F2C6A0]/30 text-xs font-mono text-[#F2C6A0] flex items-center gap-1.5 shadow-md">
                  <Calendar className="w-3.5 h-3.5 text-[#D94F70]" />
                  <span>06 . 04 . 2025</span>
                </div>
              </div>

              {/* Physical Card Polaroid Style Caption Bottom */}
              <div className="h-[18%] pt-3 px-3 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-cormorant italic text-lg sm:text-xl text-[#F7E7CE]">
                    Where everything clicked into place.
                  </h4>
                  <p className="text-[11px] uppercase tracking-wider text-[#F2C6A0]/70 font-sans">
                    The Genesis of Anubhav & Ankita
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#F2C6A0]/30 flex items-center justify-center text-[#D94F70]">
                  ❤️
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Timeline Start */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
            <div className="w-12 h-1 bg-[#D94F70] rounded-full" />

            <h3 className="font-display-cinzel text-2xl sm:text-3xl text-[#F7E7CE] font-bold tracking-wide">
              The Genesis of Us
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#F7E7CE]/80 leading-relaxed font-light">
              Before this date, we were living in our own worlds. But on <strong className="text-[#F2C6A0] font-medium">6 April 2025</strong>, a quiet shift took place. Two paths crossed, conversations began to feel effortless, and before we knew it, every other thought started revolving around each other.
            </p>

            {/* Quote Card */}
            <div className="p-5 rounded-2xl glass-panel-subtle border-l-2 border-l-[#F2C6A0] text-left">
              <p className="font-serif-cormorant italic text-lg text-[#F2C6A0] leading-snug">
                "Kade sochiya vi nahi si, ki koi enna zaroori ho jaayega."
              </p>
              <span className="block mt-2 text-[11px] uppercase tracking-widest text-[#F7E7CE]/60">
                — A quiet thought that became reality
              </span>
            </div>

            {/* Subtle Origin Milestone Tracker */}
            <div className="pt-4 flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#D94F70] ring-4 ring-[#8F183D]/40" />
                <span className="w-0.5 h-12 bg-gradient-to-b from-[#D94F70] to-[#F2C6A0]/20" />
              </div>
              <div className="pb-6">
                <span className="text-xs uppercase tracking-widest text-[#D94F70] font-semibold">Origin Point</span>
                <p className="text-sm text-[#F7E7CE]/90 font-medium">6 April 2025 — Official Beginning</p>
                <p className="text-xs text-[#F7E7CE]/50">The universe whispered: it's time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
