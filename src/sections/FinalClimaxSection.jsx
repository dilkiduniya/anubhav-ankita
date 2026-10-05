import React from "react";
import { Heart, RotateCcw } from "lucide-react";

export default function FinalClimaxSection() {
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="climax"
      className="relative min-h-screen py-28 sm:py-36 px-4 sm:px-6 bg-[#090508] flex items-center justify-center overflow-hidden text-center"
    >
      {/* Background Soft Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#8F183D]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col items-center space-y-8 sm:space-y-10">
        {/* Step 1: Ankita... */}
        <div>
          <h3 className="font-display-cinzel text-3xl sm:text-5xl font-bold tracking-widest text-[#F2C6A0] uppercase drop-shadow-lg">
            Ankita...
          </h3>
        </div>

        {/* Step 2: 6 April 2025 se shuru hui kahaani... */}
        <div>
          <h2 className="font-serif-cormorant italic text-3xl sm:text-5xl md:text-6xl text-[#F7E7CE] font-light leading-snug">
            "6 April 2025 se shuru hui kahaani..."
          </h2>
        </div>

        {/* Step 3: ...abhi khatam nahi hui. */}
        <div>
          <p className="font-serif-cormorant italic text-2xl sm:text-4xl md:text-5xl text-[#D94F70] font-normal leading-snug tracking-wide">
            "...abhi khatam nahi hui."
          </p>
        </div>

        {/* Step 4: Final Monogram & Glow */}
        <div className="flex flex-col items-center space-y-6">
          <div className="py-2 flex flex-col items-center">
            <div className="relative">
              <Heart className="w-16 h-16 text-[#D94F70] fill-[#D94F70] animate-pulse drop-shadow-[0_0_35px_#D94F70]" />
              <span className="absolute inset-0 rounded-full bg-[#D94F70]/20 blur-xl animate-ping" />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <h1 className="font-display-cinzel text-3xl sm:text-5xl font-black tracking-widest text-[#F7E7CE] uppercase flex items-center gap-3">
              <span>ANUBHAV</span>
              <span className="text-[#D94F70]">❤️</span>
              <span>ANKITA</span>
            </h1>

            <p className="font-display-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F2C6A0]">
              Forever in progress.
            </p>
          </div>

          {/* Subtext */}
          <div className="pt-4">
            <p className="font-serif-cormorant italic text-base sm:text-lg text-[#F7E7CE]/60">
              "Scroll back whenever you miss us."
            </p>
          </div>

          {/* Replay Button */}
          <div className="pt-6">
            <button
              onClick={handleReplay}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1A0710] border border-[#F2C6A0]/40 text-[#F2C6A0] text-xs uppercase tracking-widest font-sans font-medium hover:border-[#F2C6A0] hover:bg-[#4A1022] hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(242,198,160,0.25)] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#D94F70] group-hover:-rotate-90 transition-transform duration-500" />
              <span>Replay our story ↻</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
