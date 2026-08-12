"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

interface InvitationCoverProps {
  onOpen: () => void;
}

export default function InvitationCover({ onOpen }: InvitationCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleTap = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 500);
  };

  return (
    <div
      onClick={handleTap}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl transition-all duration-500 cursor-pointer select-none ${isOpening ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        }`}
    >
      {/* Background glowing effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[80px]" />
      </div>

      {/* Cover Card */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-blue-950/90 border border-white/20 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(56,189,248,0.25)] text-center text-white flex flex-col items-center justify-center gap-8 transform transition-all duration-300 hover:scale-[1.02]">

        {/* Emblem Logo */}
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-b from-white via-cyan-400 to-blue-900 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-950 flex items-center justify-center border-2 border-slate-900">
              <Image
                src="/y9hy5kZE.jpg"
                alt="Logo"
                fill
                priority
                className="object-cover scale-105"
              />
            </div>
          </div>
        </div>

        {/* Invitation Sentence */}
        <div>
          <p className="text-xl sm:text-2xl font-black text-white leading-relaxed tracking-tight max-w-sm mx-auto blue-white-gradient">
            Таныг Ховд аймгийн Цагдаагийн газрын 100 жилийн ойд урьж байна
          </p>
        </div>

        {/* УРИЛГА НЭЭХ Button (Same color & style as form submit button) */}
        <button
          type="button"
          className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-base tracking-wider uppercase shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5"
        >
          <Mail className="w-5 h-5 text-blue-700" />
          <span>УРИЛГА НЭЭХ</span>
        </button>

      </div>
    </div>
  );
}
