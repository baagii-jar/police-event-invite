"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  return (
    <section className="relative flex flex-col justify-center items-center px-4 py-8 sm:py-12 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Prominent Large Logo Emblem */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-white rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-2 bg-gradient-to-b from-white via-cyan-500 to-blue-900 shadow-[0_0_50px_rgba(56,189,248,0.5)]">
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
        <div className="text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-widest mb-4">
          1926 — 2026 | ХОВД АЙМГИЙН ЦАГДААГИЙН ГАЗРЫН 100-Н ЖИЛИЙН ОЙ
        </div>

        {/* Main Event Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          <span className="block text-white">ХҮНДЭТГЭЛИЙН УРИЛГА</span>
          <span className="block blue-white-gradient mt-1.5">
            ХОВД АЙМГИЙН ЦАГДААГИЙН ГАЗАР
          </span>
        </h1>

        <p className="max-w-xl text-slate-200 text-sm sm:text-lg mb-8 leading-relaxed font-light">
          Ховд аймгийн Цэргийн гавьяаны одонт Цагдаагийн газрын түүхт <strong className="text-cyan-300 font-bold">100-н жилийн ойн баярт</strong> эрхэм таныг хүрэлцэн ирэхийг урьж байна.
        </p>

        {/* Clean Centered Location & Date (No time, clean layout) */}
        <div id="location" className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-10 text-center">
          <div className="py-2 space-y-1">
            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold block">Огноо</span>
            <p className="text-white font-black text-xl sm:text-2xl">9-р сарын 4-ний өдөр</p>
          </div>

          <div className="py-2 space-y-1">
            <span className="text-xs text-slate-300 uppercase tracking-widest font-semibold block">Байршил & Хаяг</span>
            <p className="text-white font-black text-lg sm:text-xl">Ховд аймгийн Цагдаагийн газар</p>
            <p className="text-sm text-cyan-300 font-medium">Наадмын талбай</p>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">
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
                className="police-glass p-2.5 sm:p-4 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center"
              >
                <span className="text-xl sm:text-3xl font-black text-white font-mono tracking-tight">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase tracking-wider mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
