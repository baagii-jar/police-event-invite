"use client";

import { useState } from "react";
import Image from "next/image";
import BackgroundVideo from "./components/BackgroundVideo";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import RsvpForm from "./components/RsvpForm";
import InvitationCover from "./components/InvitationCover";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Home() {
  const [showCover, setShowCover] = useState(true);

  return (
    <div className="relative min-h-screen flex flex-col text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans">
      
      {/* Interactive Invitation Cover Page */}
      {showCover && (
        <InvitationCover onOpen={() => setShowCover(false)} />
      )}

      {/* Background Video & Music Component (Starts playback after cover click, 50% volume) */}
      <BackgroundVideo hasStarted={!showCover} />

      {/* Re-open Cover Floating Button (Top right on mobile, non-obtrusive) */}
      {!showCover && (
        <button
          onClick={() => setShowCover(true)}
          className="fixed top-4 right-4 z-40 px-3.5 py-2 rounded-full bg-slate-900/85 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-400/40 shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all duration-300 transform hover:scale-105 active:scale-95"
          title="Урилгын нүүр хуудсыг дахин харах"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Урилгын нүүр</span>
        </button>
      )}

      {/* Main Content Sections */}
      <main className="flex-1 w-full relative z-10 pt-4 sm:pt-8">
        <Hero />
        <EventDetails />
        <RsvpForm />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 police-glass py-10 px-4 text-center text-xs text-slate-300">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              <Image src="/y9hy5kZE.jpg" alt="Police Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-white tracking-wider text-sm">
              ХОВД АЙМАГ ДАХЬ ЦАГДААГИЙН ГАЗАР
            </span>
          </div>

          <p className="text-slate-300 font-light max-w-lg mx-auto">
            Ховд аймгийн Цэргийн гавьяаны одонт Цагдаагийн газрын түүхт 100н жилийн ойн баярын цахим урилга.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" /> Ховд аймгийн Цагдаагийн газар, Наадмын талбай
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-white" /> Холбоо барих: 7043-2102
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
