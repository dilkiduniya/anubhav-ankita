import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  ListMusic,
  Repeat,
  Heart,
  Music,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { audioManager } from "../utils/audioManager";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function SpotifyMiniPlayer() {
  const [state, setState] = useState(audioManager.getState());
  const [isDragging, setIsDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(setState);
    return () => unsubscribe();
  }, []);

  const {
    playlist,
    currentIndex,
    currentTrack,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    isLooping,
  } = state;

  // Handle Seek Dragging (Mouse & Touch)
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setDragRatio(ratio);
    };

    const handleUp = () => {
      audioManager.isDraggingSeek = false;
      setIsDragging(false);
      if (duration > 0) {
        audioManager.seekTo(dragRatio * duration);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, dragRatio, duration]);

  const handleStartSeek = (e) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioManager.isDraggingSeek = true;
    setIsDragging(true);
    setDragRatio(ratio);
  };

  const handleBarClick = (e) => {
    if (isDragging) return;
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioManager.seekRatio(ratio);
  };

  // Active display progress (dragged or actual)
  const displayProgress = isDragging
    ? dragRatio
    : duration > 0
    ? currentTime / duration
    : 0;

  const displayCurrentTime = isDragging
    ? dragRatio * duration
    : currentTime;

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl select-none">
      {/* Playlist Popover Drawer */}
      {showPlaylist && (
        <div className="mb-2 p-4 rounded-3xl glass-panel border border-[#F2C6A0]/30 shadow-[0_20px_50px_rgba(9,5,8,0.95)] backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2C6A0]/15">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-[#D94F70]" />
              <span className="font-display-cinzel text-xs uppercase tracking-widest text-[#F2C6A0] font-semibold">
                Anubhav & Ankita's Playlist
              </span>
            </div>
            <button
              onClick={() => setShowPlaylist(false)}
              className="text-xs text-[#F7E7CE]/60 hover:text-[#F2C6A0] px-2 py-1 rounded"
            >
              Close ✕
            </button>
          </div>

          <div className="space-y-2">
            {playlist.map((track, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    audioManager.selectTrack(idx);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#4A1022]/70 border-[#F2C6A0]/40 text-[#F7E7CE] shadow-md"
                      : "bg-[#1A0710]/40 border-transparent hover:border-[#F2C6A0]/20 hover:bg-[#1A0710]/80 text-[#F7E7CE]/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail / Status */}
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black/40 flex-shrink-0 border border-[#F2C6A0]/20">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && isPlaying && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                          <span className="w-0.5 bg-[#F2C6A0] rounded-full animate-bounce h-3" />
                          <span className="w-0.5 bg-[#D94F70] rounded-full animate-bounce h-4 delay-100" />
                          <span className="w-0.5 bg-[#F7E7CE] rounded-full animate-bounce h-2 delay-200" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display-cinzel text-sm font-semibold tracking-wide text-[#F7E7CE]">
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#F2C6A0]/70 font-sans">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#F7E7CE]/40">
                      {isSelected && isPlaying ? "Playing" : `Track 0${idx + 1}`}
                    </span>
                    <button
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isSelected && isPlaying
                          ? "bg-[#D94F70] text-[#090508]"
                          : "bg-[#1A0710] text-[#F2C6A0]"
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Mini Player Deck */}
      <div className="relative rounded-2xl sm:rounded-3xl glass-panel border border-[#F2C6A0]/30 shadow-[0_15px_40px_rgba(9,5,8,0.95)] px-4 py-2.5 sm:px-6 sm:py-3 text-[#F7E7CE] backdrop-blur-2xl transition-all duration-300">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* LEFT: Track Info & Album Art */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 max-w-[35%] sm:max-w-[28%]">
            {/* Spinning Vinyl Style Cover */}
            <div
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#F2C6A0]/30 shadow-md ${
                isPlaying ? "animate-[spin_12s_linear_infinite]" : ""
              }`}
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              {/* Vinyl center hole */}
              <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#090508] border border-[#F2C6A0]/40" />
            </div>

            {/* Song Title & Artist */}
            <div className="truncate text-left">
              <h4 className="font-display-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#F7E7CE] truncate drop-shadow-sm">
                {currentTrack.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-[#F2C6A0]/80 font-sans truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* CENTER: Player Controls & Scrub Bar */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-xl">
            {/* Control Buttons */}
            <div className="flex items-center gap-3 sm:gap-5 mb-1 sm:mb-1.5">
              {/* Loop / Repeat Toggle */}
              <button
                onClick={() => audioManager.toggleLoop()}
                title={isLooping ? "Repeat All: ON" : "Repeat All: OFF"}
                className={`hidden sm:block p-1.5 transition-colors ${
                  isLooping ? "text-[#F2C6A0]" : "text-[#F7E7CE]/40 hover:text-[#F7E7CE]"
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>

              {/* Previous Track */}
              <button
                onClick={() => audioManager.prevTrack()}
                title="Previous / Restart"
                className="p-1.5 sm:p-2 text-[#F7E7CE]/70 hover:text-[#F2C6A0] transition-colors cursor-pointer hover:scale-110 active:scale-95"
              >
                <SkipBack className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
              </button>

              {/* Play / Pause Primary Button */}
              <button
                onClick={() => audioManager.togglePlay()}
                title={isPlaying ? "Pause" : "Play"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#8F183D] to-[#D94F70] text-[#F7E7CE] border border-[#F2C6A0]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(217,79,112,0.5)] cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={() => audioManager.nextTrack()}
                title="Next Song"
                className="p-1.5 sm:p-2 text-[#F7E7CE]/70 hover:text-[#F2C6A0] transition-colors cursor-pointer hover:scale-110 active:scale-95"
              >
                <SkipForward className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
              </button>

              {/* Mobile Playlist toggle */}
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                title="Playlist"
                className="sm:hidden p-1.5 text-[#F2C6A0] transition-colors"
              >
                <ListMusic className="w-4 h-4" />
              </button>
            </div>

            {/* Continuous Spotify Scrub/Seek Progress Bar */}
            <div className="w-full flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-[#F7E7CE]/70">
              <span className="w-7 sm:w-9 text-right tabular-nums">
                {formatTime(displayCurrentTime)}
              </span>

              {/* Interactive Bar with Grabbable Thumb */}
              <div
                ref={progressBarRef}
                onClick={handleBarClick}
                onMouseDown={handleStartSeek}
                onTouchStart={handleStartSeek}
                className="relative flex-1 h-3 sm:h-4 flex items-center cursor-pointer group py-1"
              >
                {/* Background Track */}
                <div className="w-full h-1 sm:h-1.5 bg-[#1A0710] rounded-full overflow-hidden border border-[#F2C6A0]/10">
                  {/* Filled Track with smooth romantic gradient */}
                  <div
                    className="h-full bg-gradient-to-r from-[#8F183D] via-[#D94F70] to-[#F2C6A0] rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(0, displayProgress * 100))}%`,
                    }}
                  />
                </div>

                {/* Draggable Dot / Thumb */}
                <div
                  className="absolute w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#F7E7CE] rounded-full shadow-[0_0_10px_#F2C6A0] border border-[#8F183D] transition-transform duration-75 ease-out transform -translate-x-1/2 group-hover:scale-125"
                  style={{
                    left: `${Math.min(100, Math.max(0, displayProgress * 100))}%`,
                  }}
                />
              </div>

              <span className="w-7 sm:w-9 text-left tabular-nums text-[#F7E7CE]/50">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* RIGHT: Volume & Playlist Controls (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 min-w-[20%] justify-end">
            {/* Playlist Button */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              title="View Playlist (2 songs)"
              className={`p-2 rounded-xl border transition-all ${
                showPlaylist
                  ? "bg-[#4A1022] text-[#F2C6A0] border-[#F2C6A0]/40 shadow-sm"
                  : "bg-transparent text-[#F7E7CE]/60 border-transparent hover:text-[#F2C6A0]"
              }`}
            >
              <ListMusic className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group">
              <button
                onClick={() => audioManager.toggleMute()}
                title={isMuted ? "Unmute" : "Mute"}
                className="p-1 text-[#F7E7CE]/70 hover:text-[#F2C6A0] transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#D94F70]" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => audioManager.setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-[#1A0710] rounded-full accent-[#F2C6A0] cursor-pointer"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
