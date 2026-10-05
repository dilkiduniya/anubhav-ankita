import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Lock, Key, X } from "lucide-react";
import confetti from "canvas-confetti";
import { audioManager } from "../utils/audioManager";

export default function SurpriseSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const startSurprise = () => {
    setIsOpen(true);
    setStep(1); // "Ankita..."
    audioManager.tryAutoplay();
  };

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    const t2 = setTimeout(() => setStep(2), 2200); // "If I had to choose one person..."
    const t3 = setTimeout(() => setStep(3), 5000); // "...to relive all these little moments with..."
    const t4 = setTimeout(() => setStep(4), 8200); // "...I'd still choose you."
    const t5 = setTimeout(() => {
      setStep(5); // "Every. Single. Time. ❤️"
      // Warm golden/crimson subtle confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F2C6A0", "#D94F70", "#8F183D", "#F7E7CE"],
          ticks: 300,
          gravity: 0.8,
        });
      } catch (err) {
        console.error(err);
      }
    }, 11200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isOpen]);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#090508] overflow-hidden text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#4A1022]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#F2C6A0]/20 shadow-2xl relative">
          <div className="w-12 h-12 rounded-full bg-[#1A0710] border border-[#F2C6A0]/30 flex items-center justify-center mx-auto mb-6 text-[#F2C6A0]">
            <Key className="w-5 h-5 animate-pulse" />
          </div>

          <h3 className="font-serif-cormorant italic text-2xl sm:text-3xl text-[#F7E7CE] mb-3">
            A Secret Note
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#F7E7CE]/60 mb-8 max-w-md mx-auto font-light">
            Something kept close to the heart, reserved only for this moment.
          </p>

          {/* Mysterious CTA Button */}
          <button
            onClick={startSurprise}
            className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#1A0710] via-[#4A1022] to-[#1A0710] border border-[#F2C6A0]/50 text-[#F2C6A0] text-xs sm:text-sm uppercase tracking-widest font-sans font-medium hover:border-[#F2C6A0] hover:shadow-[0_0_30px_rgba(242,198,160,0.35)] transition-all duration-300 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#D94F70] group-hover:rotate-45 transition-transform" />
            <span>There's something I haven't told you yet...</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Cinematic Reveal Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#090508]/98 backdrop-blur-2xl transition-opacity duration-1000">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#1A0710]/80 text-[#F7E7CE]/60 hover:text-[#F2C6A0] border border-[#F2C6A0]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl text-center space-y-8 px-4">
            {/* Step 1: Ankita... */}
            {step >= 1 && (
              <div className="animate-fade-in transition-all duration-1000">
                <h3 className="font-display-cinzel text-3xl sm:text-5xl font-bold tracking-widest text-[#F2C6A0] uppercase drop-shadow-lg">
                  Ankita...
                </h3>
              </div>
            )}

            {/* Step 2 */}
            {step >= 2 && (
              <div className="animate-fade-in transition-all duration-1000">
                <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F7E7CE]/90 leading-relaxed font-light">
                  "If I had to choose one person..."
                </p>
              </div>
            )}

            {/* Step 3 */}
            {step >= 3 && (
              <div className="animate-fade-in transition-all duration-1000">
                <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F7E7CE]/90 leading-relaxed font-light">
                  "...to relive all these little moments with..."
                </p>
              </div>
            )}

            {/* Step 4 */}
            {step >= 4 && (
              <div className="animate-fade-in transition-all duration-1000">
                <p className="font-serif-cormorant italic text-3xl sm:text-4xl md:text-5xl text-[#F2C6A0] leading-relaxed font-normal">
                  "...I'd still choose you."
                </p>
              </div>
            )}

            {/* Step 5: Climax */}
            {step >= 5 && (
              <div className="mt-8 pt-8 border-t border-[#F2C6A0]/20 animate-bounce transition-all duration-1000">
                <h2 className="font-display-cinzel text-2xl sm:text-4xl font-extrabold tracking-wider text-[#D94F70] uppercase flex items-center justify-center gap-3">
                  <span>Every. Single. Time.</span>
                  <span className="text-3xl">❤️</span>
                </h2>
                <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#F7E7CE]/70 mt-3">
                  — Always yours, Anubhav
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
