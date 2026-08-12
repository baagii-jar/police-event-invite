"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface BackgroundVideoProps {
  hasStarted?: boolean;
}

export default function BackgroundVideo({ hasStarted = false }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Loop timestamps (seconds)
  const START_TIME = 63; // 1:03
  const END_TIME = 144;  // 2:24

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to half (50%) as requested
      audioRef.current.currentTime = START_TIME;
    }
  }, []);

  // When user opens cover (hasStarted changes to true), start video and sound automatically
  useEffect(() => {
    if (hasStarted) {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Video play error:", err);
        });
      }

      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        if (audioRef.current.currentTime < START_TIME || audioRef.current.currentTime >= END_TIME) {
          audioRef.current.currentTime = START_TIME;
        }
        audioRef.current.muted = false;
        setIsMuted(false);
        audioRef.current.play().catch((err) => {
          console.log("Audio autoplay error on click:", err);
        });
      }
    }
  }, [hasStarted]);

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
      audioRef.current.volume = 0.5;
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
      {/* Hidden Audio Player with 1:03 to 2:24 Loop and 50% Volume */}
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
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105 transition-all duration-700"
        />
        {/* Lighter dark police blue overlay for better background visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/45 to-slate-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-transparent to-slate-950/70" />
      </div>

      {/* Floating Media Controls (Only visible after user starts/opens invite) */}
      {hasStarted && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/70 rounded-full p-1.5 shadow-2xl">
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-all duration-300 focus:outline-none"
            title={isMuted ? "Дуу нээх (50% түвшин)" : "Дуу хаах"}
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
      )}
    </>
  );
}
