"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, ChevronDown } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-09-04T10:00:00+08:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 py-12 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Prominent Large Logo Emblem */}
        <div className="relative mb-4 group cursor-pointer" onClick={() => scrollToSection("details")}>
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-white rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-2 bg-gradient-to-b from-white via-cyan-500 to-blue-900 shadow-[0_0_50px_rgba(56,189,248,0.5)]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-950 flex items-center justify-center border-4 border-slate-950">
              <Image
                src="/y9hy5kZE.jpg"
                alt="Police 100th Anniversary Logo Emblem"
                fill
                priority
                className="object-cover scale-105 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* 100 ЖИЛ Text Below Logo */}
        <div className="text-sm sm:text-base font-black text-cyan-300 uppercase tracking-widest mb-3">
          1926 — 2026 | 100 ЖИЛ
        </div>

        {/* Clean Subheader Text (Without Border) */}
        <div className="text-xs sm:text-sm font-extrabold text-slate-200 tracking-widest uppercase mb-4">
          ЦАГДААГИЙН БАЙГУУЛЛАГЫН 100 ЖИЛИЙН ОЙ
        </div>

        {/* Main Event Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
          <span className="block text-white">ХҮНДЭТГЭЛИЙН УРИЛГА</span>
          <span className="block blue-white-gradient mt-2">
            ХОВД АЙМАГ ДАХЬ ЦАГДААГИЙН ГАЗАР
          </span>
        </h1>

        <p className="max-w-2xl text-slate-200 text-base sm:text-lg mb-8 leading-relaxed font-light">
          Монгол улсад Цагдаагийн байгууллага үүсэн байгуулагдсаны түүхт <strong className="text-cyan-300 font-bold">100 жилийн ой</strong>,
          Ховд аймаг дахь Цагдаагийн газрын хүндэтгэлийн арга хэмжээнд таныг хүрэлцэн ирэхийг урьж байна.
        </p>

        {/* Location & Time Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
          <div className="police-glass-card p-5 rounded-2xl flex items-center gap-4 text-left border border-white/20">
            <div className="p-3.5 rounded-xl bg-blue-600/30 text-white border border-blue-400/40 shrink-0">
              <Calendar className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Хугацаа</span>
              <p className="text-white font-black text-base sm:text-xl">9-р сарын 4-ний өдөр</p>
              <p className="text-xs text-cyan-200">10:00 цагаас эхэлнэ</p>
            </div>
          </div>

          <div className="police-glass-card p-5 rounded-2xl flex items-center gap-4 text-left border border-cyan-400/30">
            <div className="p-3.5 rounded-xl bg-cyan-600/30 text-white border border-cyan-400/40 shrink-0">
              <MapPin className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Байршил</span>
              <p className="text-white font-black text-base sm:text-xl">Ховд аймаг</p>
              <p className="text-xs text-cyan-200">Жаргалант сум</p>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-2xl mb-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
            Арга хэмжээ эхлэхэд үлдсэн хугацаа
          </h3>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: "Өдөр", value: timeLeft.days },
              { label: "Цаг", value: timeLeft.hours },
              { label: "Минут", value: timeLeft.minutes },
              { label: "Секунд", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="police-glass p-3 sm:p-5 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center"
              >
                <span className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => scrollToSection("rsvp")}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-base tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Урилгад хариулах & Бүртгүүлэх
          </button>
          <button
            onClick={() => scrollToSection("location")}
            className="px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-base border border-slate-600 hover:border-slate-400 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Байршил харах</span>
            <ChevronDown className="w-4 h-4 text-cyan-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
