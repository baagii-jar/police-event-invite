"use client";

export default function EventDetails() {
  return (
    <section id="details" className="relative py-10 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Centered Location Info (Without Border & Bigger Font) */}
        <div id="location" className="text-center space-y-3 py-6 font-medium text-slate-200">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Байршил & Хаяг
          </h3>
          <p className="text-base sm:text-xl text-cyan-300 font-bold">
            Ховд аймаг, Жаргалант сум
          </p>
          <div className="space-y-2 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto pt-2 leading-relaxed">
            <p><strong className="text-white font-bold">Байршил:</strong> Ховд аймаг дахь Цагдаагийн газрын төв байр, Төв талбай</p>
            <p><strong className="text-white font-bold">Хаяг:</strong> Ховд аймаг, Жаргалант сум, Төв гудамж</p>
            <p><strong className="text-white font-bold">Огноо:</strong> 2026 оны 9-р сарын 4-ний өдөр</p>
          </div>
        </div>

      </div>
    </section>
  );
}
