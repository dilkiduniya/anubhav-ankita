import React, { useState, useEffect } from "react";
import { Clock, Sparkles, Heart } from "lucide-react";
import { calculateTimeTogether } from "../utils/dateCalc";

export default function CountdownSection() {
  const [time, setTime] = useState(() => calculateTimeTogether("2025-04-06T00:00:00"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeTogether("2025-04-06T00:00:00"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Years", value: time.years },
    { label: "Months", value: time.months },
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative min-h-[85vh] py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#090508] via-[#1A0710] to-[#090508] overflow-hidden flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8F183D]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0710] border border-[#F2C6A0]/20 text-[11px] uppercase tracking-[0.25em] text-[#F2C6A0] mb-4">
            <Clock className="w-3.5 h-3.5 text-[#D94F70]" />
            <span>Since 6 April 2025</span>
          </div>

          <h2 className="font-display-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-[#F7E7CE] uppercase">
            And the story keeps going...
          </h2>

          <p className="mt-3 font-serif-cormorant italic text-lg sm:text-2xl text-[#F2C6A0] font-light">
            Every second counted, every heartbeat cherished.
          </p>
        </div>

        {/* Dynamic Animated Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="group p-5 sm:p-6 rounded-3xl glass-panel border border-[#F2C6A0]/25 shadow-xl transition-all duration-300 hover:border-[#F2C6A0] hover:-translate-y-1 flex flex-col items-center justify-center"
            >
              <span className="font-mono text-3xl sm:text-5xl font-bold text-[#F7E7CE] group-hover:text-[#F2C6A0] transition-colors drop-shadow-md">
                {String(stat.value).padStart(2, "0")}
              </span>
              <span className="mt-2 text-xs uppercase tracking-widest text-[#D94F70] font-medium font-sans">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Total Elapsed Milestones */}
        <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1A0710]/80 border border-[#F2C6A0]/20 backdrop-blur-md">
          <Heart className="w-4 h-4 text-[#D94F70] fill-[#D94F70] animate-pulse" />
          <span className="text-xs sm:text-sm text-[#F7E7CE]/90 font-mono">
            Over <strong className="text-[#F2C6A0]">{time.totalDays} days</strong> and{" "}
            <strong className="text-[#F2C6A0]">{time.totalHours.toLocaleString()} hours</strong> of choosing each other
          </span>
        </div>
      </div>
    </section>
  );
}
