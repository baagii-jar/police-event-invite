"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Loop timestamps (seconds)
  const START_TIME = 63; // 1:03
  const END_TIME = 144;  // 2:24

  useEffect(() => {
    // Attempt background video playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }

    // Initialize audio currentTime
    if (audioRef.current) {
      audioRef.current.currentTime = START_TIME;
    }
  }, []);

  // Monitor audio loop between 1:03 and 2:24
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      if (
        audioRef.current.currentTime >= END_TIME ||
        audioRef.current.currentTime < START_TIME
      ) {
        audioRef.current.currentTime = START_TIME;
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (!nextMuted) {
        if (audioRef.current.currentTime < START_TIME || audioRef.current.currentTime >= END_TIME) {
          audioRef.current.currentTime = START_TIME;
        }
        audioRef.current.play().catch((err) => console.log("Audio play error:", err));
      }
    }
  };

  const togglePlay = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (videoRef.current) {
      if (nextPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    if (audioRef.current && !isMuted) {
      if (nextPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      {/* Hidden Audio Player with 1:03 to 2:24 Loop */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        preload="auto"
        muted={isMuted}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = START_TIME;
            audioRef.current.play();
          }
        }}
      />

      {/* Background Video Container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          src="/nt6tEfvi.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105 transition-all duration-700"
        />
        {/* Slightly lighter dark police blue overlay for better background visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/45 to-slate-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-transparent to-slate-950/70" />
      </div>

      {/* Floating Media Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-full p-1.5 shadow-2xl">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-all duration-300 focus:outline-none"
          title={isMuted ? "Дуу нээх (1:03 - 2:24)" : "Дуу хаах"}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />}
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

