import React, { useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";
import { audioManager } from "../utils/audioManager";

export default function LoadingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Attempt instant autoplay as soon as the site is loaded
    audioManager.tryAutoplay();

    // Cinematic Story Beats
    const t1 = setTimeout(() => setStep(1), 500);   // "Some stories are written..."
    const t2 = setTimeout(() => setStep(2), 2200);  // "...some are meant to be lived."
    const t3 = setTimeout(() => setStep(3), 4000);  // "Anubhav × Ankita" & "6 April 2025"
    const t4 = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 900);
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleManualEnter = () => {
    // Ensure audio starts immediately on click/tap if autoplay was blocked
    audioManager.tryAutoplay();
    setExiting(true);
    setTimeout(onComplete, 500);
  };

  return (
    <div
      onClick={handleManualEnter}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090508] transition-all duration-1000 cursor-pointer ${
        exiting ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4A1022]/40 via-[#1A0710]/70 to-[#090508] pointer-events-none" />

      {/* Cinematic Content Box */}
      <div className="relative z-10 max-w-2xl px-6 text-center flex flex-col items-center">
        {/* Line 1 */}
        <div
          className={`transition-all duration-1000 transform ${
            step >= 1
              ? "opacity-100 translate-y-0 filter blur-0"
              : "opacity-0 translate-y-4 filter blur-sm"
          }`}
        >
          <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F7E7CE]/90 tracking-wide font-light">
            Some stories are written...
          </p>
        </div>

        {/* Line 2 */}
        <div
          className={`mt-4 transition-all duration-1000 delay-200 transform ${
            step >= 2
              ? "opacity-100 translate-y-0 filter blur-0"
              : "opacity-0 translate-y-4 filter blur-sm"
          }`}
        >
          <p className="font-serif-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F2C6A0] tracking-wide font-light">
            ...some are meant to be lived.
          </p>
        </div>

        {/* Reveal Step 3: Anubhav × Ankita */}
        <div
          className={`mt-10 sm:mt-12 flex flex-col items-center transition-all duration-1000 transform ${
            step >= 3
              ? "opacity-100 scale-100 filter blur-0"
              : "opacity-0 scale-95 filter blur-md"
          }`}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#F2C6A0] to-transparent mb-6 opacity-60" />

          <h1 className="font-display-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-widest text-[#F7E7CE] uppercase flex items-center justify-center gap-3 sm:gap-5">
            <span>Anubhav</span>
            <span className="text-[#D94F70] text-2xl sm:text-4xl">×</span>
            <span>Ankita</span>
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F2C6A0]/80 font-sans font-light">
            <span>6 April 2025</span>
            <span className="text-[#D94F70]">•</span>
            <span>The beginning of us</span>
          </div>

          <button
            onClick={handleManualEnter}
            className="mt-10 text-[11px] uppercase tracking-widest text-[#F2C6A0]/70 hover:text-[#F7E7CE] px-4 py-2 rounded-full border border-[#F2C6A0]/20 hover:border-[#F2C6A0]/50 transition-colors"
          >
            Click anywhere to enter →
          </button>
        </div>
      </div>
    </div>
  );
}
