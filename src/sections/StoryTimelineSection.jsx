import React, { useState } from "react";
import { Sparkles, Calendar, Quote, ChevronRight, Heart } from "lucide-react";
import { storyMilestones } from "../data/story";

export default function StoryTimelineSection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const current = storyMilestones[activeChapter];

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="story"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#090508] overflow-hidden"
    >
      {/* Dynamic background accent based on active chapter */}
      <div
        className="absolute top-1/3 right-10 w-96 h-96 rounded-full blur-[150px] transition-all duration-1000 pointer-events-none opacity-20"
        style={{ backgroundColor: current.accentColor }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Chronicle</span>
          </div>

          <h2 className="font-display-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#F7E7CE] uppercase">
            Our Story in Chapters
          </h2>
          <p className="mt-3 font-serif-cormorant italic text-lg sm:text-xl text-[#F7E7CE]/70 max-w-xl mx-auto">
            Click through the milestones that brought us to where we stand today.
          </p>
        </div>

        {/* Milestone Selector Ribbon */}
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 mb-12 sm:mb-16 overflow-x-auto pb-4 scrollbar-none px-2">
          {storyMilestones.map((item, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveChapter(idx)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? "bg-[#4A1022]/80 border-[#F2C6A0] shadow-[0_0_25px_rgba(242,198,160,0.3)] scale-105"
                    : "bg-[#1A0710]/40 border-[#F2C6A0]/15 hover:border-[#F2C6A0]/40 hover:bg-[#1A0710]"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                    isActive ? "bg-[#F2C6A0] scale-150 animate-ping" : "bg-[#8F183D]"
                  }`}
                />
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-[#F2C6A0]/70 font-mono">
                    {item.chapter}
                  </span>
                  <span
                    className={`block text-xs sm:text-sm font-display-cinzel tracking-wider uppercase ${
                      isActive ? "text-[#F7E7CE] font-bold" : "text-[#F7E7CE]/60"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Milestone Detailed Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#F2C6A0]/25 shadow-2xl relative overflow-hidden transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Photo / Frame */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1A0710] to-[#4A1022] border border-[#F2C6A0]/20 shadow-xl group">
              {!imageErrors[current.id] ? (
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 filter saturate-105 group-hover:scale-105"
                  onError={() => handleImageError(current.id)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1A0710] via-[#4A1022] to-[#090508]">
                  <Heart className="w-12 h-12 text-[#D94F70] mb-3 animate-pulse" />
                  <span className="font-display-cinzel text-xl text-[#F2C6A0]">
                    {current.title}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#F7E7CE]/60 mt-1">
                    {current.date}
                  </span>
                </div>
              )}

              {/* Tag / Date on image */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#090508]/80 backdrop-blur-md border border-[#F2C6A0]/30 text-xs font-mono text-[#F2C6A0]">
                {current.date}
              </div>

              {/* Corner Watermark */}
              <div className="absolute bottom-4 right-4 text-[10px] tracking-widest uppercase font-mono text-[#F7E7CE]/60 bg-[#090508]/70 px-2 py-0.5 rounded">
                {current.chapter}
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5 text-left">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#8F183D]/40 text-[#D94F70] text-xs font-mono tracking-wider border border-[#D94F70]/30">
                  {current.chapter}
                </span>
                <span className="text-xs tracking-widest text-[#F2C6A0]/80 font-sans uppercase">
                  {current.date}
                </span>
              </div>

              <h3 className="font-serif-cormorant italic text-3xl sm:text-4xl text-[#F7E7CE] font-medium leading-tight">
                {current.title}
              </h3>

              <h4 className="text-sm font-sans font-medium text-[#F2C6A0] tracking-wide">
                {current.subtitle}
              </h4>

              <p className="text-sm sm:text-base text-[#F7E7CE]/80 font-light leading-relaxed">
                {current.description}
              </p>

              {/* Poetic quote */}
              <div className="p-4 rounded-xl bg-[#1A0710]/70 border border-[#F2C6A0]/15 flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#D94F70] flex-shrink-0 mt-0.5" />
                <p className="font-serif-cormorant italic text-base sm:text-lg text-[#F2C6A0]">
                  "{current.quote}"
                </p>
              </div>

              {/* Next Chapter Quick CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#F7E7CE]/40">
                  Chapter {activeChapter + 1} of {storyMilestones.length}
                </span>
                {activeChapter < storyMilestones.length - 1 && (
                  <button
                    onClick={() => setActiveChapter((prev) => prev + 1)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#F2C6A0] hover:text-[#F7E7CE] transition-colors"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
