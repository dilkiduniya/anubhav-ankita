import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Smooth trail animation
  useEffect(() => {
    let animId;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center pinpoint */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#F2C6A0] pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPointer ? 1.8 : 1})`,
        }}
      />
      {/* Outer glowing aura */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D94F70]/40 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x - 16}px, ${trailingPos.y - 16}px, 0) scale(${isPointer ? 1.4 : 1})`,
          backgroundColor: isPointer ? "rgba(217, 79, 112, 0.15)" : "transparent",
          boxShadow: isPointer ? "0 0 20px rgba(242, 198, 160, 0.4)" : "none",
        }}
      />
    </>
  );
}
