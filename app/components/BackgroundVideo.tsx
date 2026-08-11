"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user interaction
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Background Video Container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          src="/nt6tEfvi.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
        />
        {/* Dark Police Blue Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-slate-950/80" />
      </div>

      {/* Floating Media Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full p-1.5 shadow-2xl">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-all duration-300 focus:outline-none"
          title={isMuted ? "Дуу нээх" : "Дуу хаах"}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
        </button>
        <div className="w-px h-5 bg-slate-700/60" />
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300 focus:outline-none"
          title={isPlaying ? "Түр зогсоох" : "Тоглуулах"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 text-cyan-400" />}
        </button>
      </div>
    </>
  );
}
