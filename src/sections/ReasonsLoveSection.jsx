import React from "react";
import { Sparkles, Smile, HeartHandshake, Flame, Coffee, Crown, Compass, Heart } from "lucide-react";
import { reasonsData } from "../data/reasons";

const iconMap = {
  Sparkles,
  Smile,
  HeartHandshake,
  Flame,
  Coffee,
  Crown,
  Compass,
};

export default function ReasonsLoveSection() {
  return (
    <section
      id="reasons"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#090508] via-[#1A0710] to-[#090508] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8F183D]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Heart className="w-3 h-3 text-[#D94F70]" />
            <span>Things I Cherish</span>
          </div>

          <h2 className="font-serif-cormorant italic text-3xl sm:text-5xl md:text-6xl text-[#F7E7CE] font-normal tracking-wide">
            "Reasons? I could keep going..."
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-[#F7E7CE]/70 max-w-xl mx-auto font-light">
            A small glimpse of the countless things that make you completely unforgettable.
          </p>
        </div>

        {/* 3D Depth Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-[1000px]">
          {reasonsData.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="group relative p-7 rounded-3xl glass-card-interactive transform-gpu transition-all duration-500 hover:-translate-y-2 hover:rotate-1 hover:border-[#F2C6A0]/60 flex flex-col justify-between"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Subtle Card Accent Light */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#8F183D]/20 rounded-full blur-2xl group-hover:bg-[#F2C6A0]/20 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#1A0710] border border-[#F2C6A0]/20 flex items-center justify-center text-[#F2C6A0] shadow-md group-hover:scale-110 group-hover:border-[#F2C6A0]/60 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-[#F2C6A0]/60 font-semibold tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-widest font-mono text-[#D94F70]">
                    {item.highlight}
                  </span>

                  <h3 className="font-serif-cormorant italic text-2xl text-[#F7E7CE] font-medium mt-1 mb-3 group-hover:text-[#F2C6A0] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-[#F7E7CE]/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2C6A0]/10 flex items-center justify-between text-[11px] text-[#F7E7CE]/40">
                  <span>From Anubhav</span>
                  <span className="text-[#D94F70]">❤️ For Ankita</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
