"use client";

import Image from "next/image";
import { Shield, Calendar, MapPin, Send } from "lucide-react";

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full police-glass border-b border-slate-700/40 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Department Branding */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-slate-900 flex items-center justify-center">
            <Image
              src="/y9hy5kZE.jpg"
              alt="Police Emblem Logo"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                1926 - 2026
              </span>
              <span className="text-xs text-slate-300 font-medium">ХОВД АЙМГИЙН ЦАГДААГИЙН ГАЗРЫН 100Н ЖИЛИЙН ОЙ</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
              ХОВД АЙМАГ ЦАГДААГИЙН ГАЗАР
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-amber-400 transition-colors duration-200"
          >
            Эхлэл
          </button>
          <button
            onClick={() => scrollToSection("details")}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors duration-200"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            Хөтөлбөр & Мэдээлэл
          </button>
          <button
            onClick={() => scrollToSection("location")}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors duration-200"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            Байршил
          </button>
        </nav>

        {/* CTA RSVP Button */}
        <div>
          <button
            onClick={() => scrollToSection("rsvp")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Урилгад хариулах</span>
          </button>
        </div>

      </div>
    </header>
  );
}
