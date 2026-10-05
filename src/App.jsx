import React, { useState, useEffect } from "react";
import LoadingScreen from "./sections/LoadingScreen";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import SpotifyMiniPlayer from "./components/SpotifyMiniPlayer";
import { audioManager } from "./utils/audioManager";

import HeroSection from "./sections/HeroSection";
import FirstChapterSection from "./sections/FirstChapterSection";
import StoryTimelineSection from "./sections/StoryTimelineSection";
import PunjabiHeartSection from "./sections/PunjabiHeartSection";
import MemoryGallerySection from "./sections/MemoryGallerySection";
import ReasonsLoveSection from "./sections/ReasonsLoveSection";
import ThreeHeartOrbitSection from "./sections/ThreeHeartOrbitSection";
import SurpriseSection from "./sections/SurpriseSection";
import LoveLetterSection from "./sections/LoveLetterSection";
import VirtualShaadiSection from "./sections/VirtualShaadiSection";
import CountdownSection from "./sections/CountdownSection";
import FinalClimaxSection from "./sections/FinalClimaxSection";

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    // Attempt autoplay immediately as soon as the website is opened
    audioManager.tryAutoplay();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#090508] text-[#F7E7CE] selection:bg-[#8F183D] selection:text-[#F7E7CE]">
      {/* 1. Cinematic Loading Screen */}
      {!loadingDone && (
        <LoadingScreen onComplete={() => setLoadingDone(true)} />
      )}

      {/* Global Interactive Cursor for Desktop */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Spotify-Style Mini Music Player Fixed at Bottom */}
      <SpotifyMiniPlayer />

      {/* Main Experience Flow */}
      <main className="relative z-10 w-full overflow-hidden pb-20 sm:pb-24">
        {/* 2. Hero — "The Day It All Began" */}
        <HeroSection />

        {/* 3. The First Chapter — "And then... there was us." */}
        <FirstChapterSection />

        {/* 4. Our Story — Interactive Timeline */}
        <StoryTimelineSection />

        {/* 5. Punjabi Heart Section — "Thodi jehi Punjabi, thodi jehi pagalpan..." */}
        <PunjabiHeartSection />

        {/* 6. Memory Gallery — 3D Photo Wall */}
        <MemoryGallerySection />

        {/* 7. "Things I Love About You" — "Reasons? I could keep going..." */}
        <ReasonsLoveSection />

        {/* 8. The 3D Heart / Love Orbit — Celestial Orbit */}
        <ThreeHeartOrbitSection />

        {/* 9. A Small Surprise — Mysterious Whisper */}
        <SurpriseSection />

        {/* 10. Love Letter Section — "For Ankita" */}
        <LoveLetterSection />

        {/* 11. Grand Finale Chapter: Virtual Shaadi Ceremony (7 Pheras) */}
        <VirtualShaadiSection />

        {/* 12. Anniversary Countdown / Time Together */}
        <CountdownSection />

        {/* 13. Final Cinematic Scene */}
        <FinalClimaxSection />
      </main>

      {/* Minimal Footer with clearance for Spotify Player */}
      <footer className="py-8 pb-24 border-t border-[#F2C6A0]/10 bg-[#090508] text-center text-xs text-[#F7E7CE]/40 font-mono">
        <p>Crafted with love by Anubhav for Ankita • 6 April 2025</p>
      </footer>
    </div>
  );
}
