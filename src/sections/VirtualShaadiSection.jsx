import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Flame, CheckCircle, RotateCcw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import MandapScene from "../three/MandapScene";
import { pherasData } from "../data/pheras";

export default function VirtualShaadiSection() {
  const [ceremonyStarted, setCeremonyStarted] = useState(false);
  const [currentPheraIndex, setCurrentPheraIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [funnyStage, setFunnyStage] = useState(0);

  const currentPhera = pherasData[currentPheraIndex] || pherasData[0];

  // Confetti bursts when completing each phera
  const triggerPheraConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FFA500", "#FFD700", "#D94F70", "#8F183D", "#F7E7CE"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextPhera = () => {
    triggerPheraConfetti();

    if (currentPheraIndex < pherasData.length - 1) {
      setCurrentPheraIndex((prev) => prev + 1);
    } else {
      // Completed all 7 pheras!
      setIsCompleted(true);
      // Grand celebratory shower
      setTimeout(() => {
        try {
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#FFA500", "#FFD700", "#D94F70", "#8F183D", "#F7E7CE"],
          });
        } catch (e) {
          console.error(e);
        }
      }, 400);
    }
  };

  // Timed humorous reveal after completion
  useEffect(() => {
    if (!isCompleted) {
      setFunnyStage(0);
      return;
    }

    const t1 = setTimeout(() => setFunnyStage(1), 2500); // "Ek minute..."
    const t2 = setTimeout(() => setFunnyStage(2), 5200); // "Shaadi website pe ho gayi..."
    const t3 = setTimeout(() => setFunnyStage(3), 8500); // "...ab asli wali ke liye tumhari permission chahiye. 😂❤️"

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isCompleted]);

  const handleReliveShaadi = () => {
    setCurrentPheraIndex(0);
    setIsCompleted(false);
    setFunnyStage(0);
  };

  return (
    <section
      id="shaadi"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#070306] overflow-hidden flex items-center justify-center text-center"
    >
      {/* INITIAL TEASER ENTRY STATE */}
      {!ceremonyStarted ? (
        <div className="relative z-10 max-w-2xl mx-auto w-full p-8 sm:p-12 rounded-3xl glass-panel border border-[#F2C6A0]/30 shadow-[0_25px_70px_rgba(9,5,8,0.95)]">
          <div className="w-16 h-16 rounded-full bg-[#1A0710] border border-[#F2C6A0]/30 flex items-center justify-center mx-auto mb-6 text-[#D94F70] shadow-xl">
            <Heart className="w-8 h-8 fill-current animate-pulse" />
          </div>

          <p className="font-serif-cormorant italic text-xl sm:text-2xl text-[#F2C6A0]/90 mb-3 tracking-wide">
            One More Surprise...
          </p>

          <h2 className="font-display-cinzel text-2xl sm:text-4xl font-bold tracking-wider text-[#F7E7CE] mb-8 leading-snug">
            "Ankita... ek last surprise hai 👀❤️"
          </h2>

          <button
            onClick={() => setCeremonyStarted(true)}
            className="group relative inline-flex items-center gap-3.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-gradient-to-r from-[#4A1022] via-[#8F183D] to-[#4A1022] border border-[#F2C6A0]/50 text-[#F7E7CE] font-sans font-medium text-sm sm:text-base tracking-widest uppercase shadow-[0_0_35px_rgba(143,24,61,0.6)] hover:shadow-[0_0_55px_rgba(242,198,160,0.7)] hover:border-[#F2C6A0] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10">Shaadi Karein? 😭❤️</span>
            <ArrowRight className="w-4 h-4 text-[#F2C6A0] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        /* FULL 3D MANDAP WEDDING CEREMONY */
        <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
          {/* 3D Mandap WebGL Scene Canvas */}
          <div className="absolute inset-0 -top-24 -bottom-24 pointer-events-none -z-10">
            <MandapScene currentPhera={currentPheraIndex} isCompleted={isCompleted} />
          </div>

          {/* Top Title Monogram */}
          <div className="mb-6 sm:mb-8 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0710]/80 border border-[#F2C6A0]/30 backdrop-blur-md mb-3 shadow-lg">
              <Flame className="w-3.5 h-3.5 text-[#FFA500] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] font-sans font-medium">
                The Sacred Vows
              </span>
              <Flame className="w-3.5 h-3.5 text-[#FFA500] animate-pulse" />
            </div>

            <h1 className="font-display-cinzel text-3xl sm:text-5xl font-black tracking-widest text-[#F7E7CE] uppercase flex items-center justify-center gap-3 drop-shadow-2xl">
              <span>ANUBHAV</span>
              <span className="text-[#D94F70] text-2xl sm:text-4xl">❤️</span>
              <span>ANKITA</span>
            </h1>

            <p className="mt-2 font-serif-cormorant italic text-lg sm:text-2xl text-[#F2C6A0] font-light">
              "Saat Phere. Ek Kahaani."
            </p>
          </div>

          {/* 7-Phera Indicator Ribbon */}
          {!isCompleted && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 px-4 py-2 rounded-full bg-[#090508]/80 backdrop-blur-md border border-[#F2C6A0]/20">
              {pherasData.map((p, idx) => {
                const isPassed = idx < currentPheraIndex;
                const isCurrent = idx === currentPheraIndex;
                return (
                  <div
                    key={p.number}
                    className="flex items-center gap-1.5"
                    title={`Phera ${p.number}: ${p.title}`}
                  >
                    <span
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#D94F70] text-[#090508] scale-110 shadow-[0_0_12px_#D94F70]"
                          : isPassed
                          ? "bg-[#4A1022] text-[#F2C6A0] border border-[#F2C6A0]/40"
                          : "bg-[#1A0710]/60 text-[#F7E7CE]/40 border border-[#F2C6A0]/10"
                      }`}
                    >
                      {isPassed ? "✓" : p.number}
                    </span>
                    {idx < pherasData.length - 1 && (
                      <span
                        className={`h-[1px] w-2 sm:w-4 ${
                          isPassed ? "bg-[#F2C6A0]/50" : "bg-[#F2C6A0]/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ACTIVE PHERA CARD */}
          {!isCompleted ? (
            <div className="w-full max-w-2xl p-7 sm:p-10 rounded-3xl glass-panel border border-[#F2C6A0]/35 shadow-[0_25px_70px_rgba(9,5,8,0.95)] backdrop-blur-2xl transition-all duration-700">
              {/* Phera Counter Badge */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F2C6A0]/15">
                <span className="px-3 py-1 rounded-full bg-[#4A1022]/80 border border-[#F2C6A0]/30 text-xs font-mono uppercase tracking-widest text-[#F2C6A0]">
                  Phera {currentPhera.number} of 7
                </span>
                <span className="font-serif-cormorant italic text-sm text-[#D94F70]">
                  {currentPhera.titleHindi}
                </span>
              </div>

              {/* Title & Vow */}
              <h3 className="font-serif-cormorant italic text-3xl sm:text-4xl text-[#F2C6A0] mb-4 font-normal">
                Phera {currentPhera.number} — {currentPhera.title}
              </h3>

              <p className="font-sans text-base sm:text-xl text-[#F7E7CE] leading-relaxed font-light mb-6 px-2">
                "{currentPhera.vow}"
              </p>

              <p className="text-xs sm:text-sm text-[#F7E7CE]/60 italic font-serif-cormorant mb-8">
                {currentPhera.meaning}
              </p>

              {/* Complete Phera Button */}
              <button
                onClick={handleNextPhera}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-[#8F183D] via-[#D94F70] to-[#8F183D] text-[#F7E7CE] font-sans font-medium text-xs sm:text-sm uppercase tracking-widest border border-[#F2C6A0]/50 shadow-[0_0_25px_rgba(217,79,112,0.5)] hover:shadow-[0_0_40px_rgba(242,198,160,0.6)] hover:border-[#F2C6A0] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-[#F2C6A0] group-hover:scale-110 transition-transform" />
                <span>Phera Complete ❤️</span>
              </button>
            </div>
          ) : (
            /* AFTER 7TH PHERA: CELEBRATION CLIMAX & PLAYFUL REVEAL */
            <div className="w-full max-w-2xl p-8 sm:p-12 rounded-3xl glass-panel border border-[#F2C6A0]/40 shadow-[0_30px_90px_rgba(143,24,61,0.5)] backdrop-blur-2xl transition-all duration-1000 space-y-6">
              {/* Grand Completion Stamp */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F183D]/60 border border-[#F2C6A0]/40 text-xs uppercase tracking-widest text-[#F2C6A0] font-mono shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FFA500]" />
                <span>7/7 — Saat Phere Complete ❤️</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFA500]" />
              </div>

              <h2 className="font-display-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#F7E7CE] uppercase">
                ANUBHAV ❤️ ANKITA
              </h2>

              <p className="font-display-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F2C6A0]">
                6 April 2025 — The beginning of us.
              </p>

              <p className="font-serif-cormorant italic text-xl sm:text-2xl text-[#D94F70]">
                "Aur aaj... ek aur chapter officially likh diya. 👀❤️"
              </p>

              {/* FUNNY REVEAL SEQUENCE */}
              <div className="pt-6 border-t border-[#F2C6A0]/20 space-y-4">
                {funnyStage >= 1 && (
                  <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#F2C6A0] animate-fadeIn">
                    "Ek minute..."
                  </p>
                )}

                {funnyStage >= 2 && (
                  <p className="font-serif-cormorant italic text-xl sm:text-2xl text-[#F7E7CE] animate-fadeIn">
                    "Shaadi website pe ho gayi..."
                  </p>
                )}

                {funnyStage >= 3 && (
                  <div className="animate-fadeIn space-y-3 pt-2">
                    <p className="font-serif-cormorant italic text-2xl sm:text-3xl text-[#D94F70] font-normal leading-snug">
                      "...ab asli wali ke liye tumhari permission chahiye. 😂❤️"
                    </p>
                    <p className="font-display-cinzel text-xs tracking-widest uppercase text-[#F2C6A0]/80">
                      To be continued... 👀
                    </p>
                  </div>
                )}
              </div>

              {/* CEREMONY REPLAY BUTTON */}
              <div className="pt-6">
                <button
                  onClick={handleReliveShaadi}
                  className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1A0710] border border-[#F2C6A0]/40 text-[#F2C6A0] text-xs uppercase tracking-widest font-sans font-medium hover:border-[#F2C6A0] hover:bg-[#4A1022] hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D94F70] group-hover:-rotate-90 transition-transform duration-500" />
                  <span>Relive Our Shaadi ❤️</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
