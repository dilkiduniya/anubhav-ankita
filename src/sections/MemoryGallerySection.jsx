import React, { useState } from "react";
import { Sparkles, X, ChevronLeft, ChevronRight, Calendar, Heart, ZoomIn } from "lucide-react";
import { memoriesData } from "../data/memories";

export default function MemoryGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleNext = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto((prev) => (prev + 1) % memoriesData.length);
  };

  const handlePrev = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto((prev) => (prev - 1 + memoriesData.length) % memoriesData.length);
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-[#090508] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#8F183D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Interactive 3D Museum</span>
          </div>

          <h2 className="font-display-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-[#F7E7CE] uppercase">
            Memory Gallery
          </h2>

          <p className="mt-3 font-serif-cormorant italic text-lg sm:text-xl text-[#F7E7CE]/70 max-w-xl mx-auto">
            Floating physical snapshots frozen in time. Click any card to expand.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 perspective-[1200px]">
          {memoriesData.map((item, index) => {
            const hasError = imageErrors[item.id];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(index)}
                className="group relative cursor-pointer rounded-3xl p-3.5 sm:p-4 glass-card-interactive transform-gpu transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:shadow-[0_20px_45px_rgba(143,24,61,0.35)]"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A0710] via-[#4A1022] to-[#090508] border border-[#F2C6A0]/20 shadow-inner">
                  {!hasError ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center filter saturate-105 contrast-105 group-hover:scale-108 transition-transform duration-700 ease-out"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1A0710] via-[#4A1022] to-[#090508]">
                      <Heart className="w-10 h-10 text-[#D94F70] mb-2 group-hover:scale-125 transition-transform" />
                      <span className="font-display-cinzel text-lg text-[#F2C6A0] tracking-wide">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#F7E7CE]/60 mt-1">
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* Gradient Light Sheen on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Expand Icon Badge */}
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-[#090508]/80 backdrop-blur-md border border-[#F2C6A0]/30 text-[#F2C6A0] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>

                  {/* Date Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#090508]/80 backdrop-blur-md border border-[#F2C6A0]/20 text-[10px] font-mono text-[#F2C6A0]">
                    {item.date}
                  </div>
                </div>

                {/* Card Description Footer */}
                <div className="pt-4 pb-1 px-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif-cormorant italic text-xl text-[#F7E7CE] group-hover:text-[#F2C6A0] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F7E7CE]/60 font-sans mt-0.5 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#4A1022]/60 border border-[#D94F70]/30 text-[#D94F70]">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Click-to-Expand Modal */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#090508]/90 backdrop-blur-2xl transition-all duration-300">
          <div className="relative max-w-4xl w-full rounded-3xl glass-panel border border-[#F2C6A0]/40 overflow-hidden shadow-[0_0_80px_rgba(143,24,61,0.6)] flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#090508]/80 text-[#F7E7CE] hover:text-[#F2C6A0] border border-[#F2C6A0]/30 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Box */}
            <div className="md:w-3/5 relative aspect-square sm:aspect-auto sm:min-h-[420px] bg-black flex items-center justify-center">
              {!imageErrors[memoriesData[selectedPhoto].id] ? (
                <img
                  src={memoriesData[selectedPhoto].image}
                  alt={memoriesData[selectedPhoto].title}
                  className="w-full h-full object-cover max-h-[75vh]"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1A0710] to-[#4A1022]">
                  <Heart className="w-16 h-16 text-[#D94F70] mb-4 animate-pulse" />
                  <span className="font-display-cinzel text-2xl text-[#F2C6A0]">
                    {memoriesData[selectedPhoto].title}
                  </span>
                </div>
              )}

              {/* Prev / Next controls on image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#090508]/70 text-[#F7E7CE] hover:text-[#F2C6A0] border border-[#F2C6A0]/30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#090508]/70 text-[#F7E7CE] hover:text-[#F2C6A0] border border-[#F2C6A0]/30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Info Box */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-widest bg-[#4A1022] text-[#F2C6A0]">
                    {memoriesData[selectedPhoto].tag}
                  </span>
                  <span className="text-xs font-mono text-[#F7E7CE]/60">
                    {memoriesData[selectedPhoto].date}
                  </span>
                </div>

                <h3 className="font-serif-cormorant italic text-3xl sm:text-4xl text-[#F7E7CE] font-medium leading-tight">
                  {memoriesData[selectedPhoto].title}
                </h3>

                <p className="mt-4 font-sans text-sm sm:text-base text-[#F7E7CE]/80 leading-relaxed font-light">
                  {memoriesData[selectedPhoto].caption}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F2C6A0]/15 flex items-center justify-between text-xs text-[#F7E7CE]/60">
                <span>
                  Snapshot {selectedPhoto + 1} of {memoriesData.length}
                </span>
                <span className="text-[#D94F70] flex items-center gap-1 font-serif-cormorant italic text-sm">
                  Anubhav & Ankita ❤️
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
