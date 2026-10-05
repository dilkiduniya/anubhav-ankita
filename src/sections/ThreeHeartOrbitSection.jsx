import React from "react";
import { Sparkles, Orbit } from "lucide-react";
import HeartOrbitScene from "../three/HeartOrbitScene";

export default function ThreeHeartOrbitSection() {
  return (
    <section
      id="orbit"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#090508] overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Orbit className="w-3.5 h-3.5 text-[#D94F70]" />
            <span>Celestial Connection</span>
          </div>

          <h2 className="font-display-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-[#F7E7CE] uppercase">
            The Love Orbit
          </h2>

          <p className="mt-3 font-serif-cormorant italic text-lg sm:text-xl text-[#F7E7CE]/70 max-w-xl mx-auto">
            Anubhav & Ankita — two distinct paths orbiting around one eternal heartbeat.
          </p>
        </div>

        {/* 3D Heart Orbit Canvas */}
        <HeartOrbitScene />
      </div>
    </section>
  );
}
