"use client";

import { MapPin, Calendar, Building2 } from "lucide-react";

export default function EventDetails() {
  return (
    <section id="details" className="relative py-8 px-4 z-10">
      <div className="max-w-3xl mx-auto">
        
        {/* Single Consolidated Location & Date Card */}
        <div id="location" className="police-glass-card p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl text-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Байршил & Хаяг
            </h3>
            <p className="text-cyan-300 font-bold text-base sm:text-lg">
              Ховд аймаг, Жаргалант сум
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Байршил</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">
                Цагдаагийн газрын төв байр, Төв талбай
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Хаяг</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">
                Ховд аймаг, Жаргалант сум, Төв гудамж
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Огноо</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">
                2026 оны 9-р сарын 4-ний өдөр (10:00 цаг)
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

