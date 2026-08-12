"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Send, User, Phone, Users, MessageSquare, CheckCircle, Ticket, Printer, ShieldCheck } from "lucide-react";

interface SavedSubmission {
  ticketCode: string;
  full_name: string;
  phone: string;
  organization?: string;
  attendance: string;
  guest_count: number;
  notes: string;
  date: string;
}

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    attendance: "yes",
    guest_count: "0",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [savedSubmission, setSavedSubmission] = useState<SavedSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("police_rsvp_submission");
    if (existing) {
      try {
        setSavedSubmission(JSON.parse(existing));
      } catch (e) {
        console.error("Local submission parse error", e);
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.full_name.trim() || !formData.phone.trim()) {
      setErrorMsg("Та овог нэр болон утасны дугаараа бүрэн бөглөнө үү.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Алдаа гарлаа. Та дахин оролдоно уу.");
      }

      const submission: SavedSubmission = {
        ticketCode: data.ticketCode,
        full_name: formData.full_name,
        phone: formData.phone,
        attendance: formData.attendance,
        guest_count: Number(formData.guest_count),
        notes: formData.notes,
        date: new Date().toLocaleDateString("mn-MN"),
      };

      localStorage.setItem("police_rsvp_submission", JSON.stringify(submission));
      setSavedSubmission(submission);
      setShowModal(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Сүлжээний алдаа гарлаа. Та дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Шинээр бүртгүүлэхийн тулд өмнөх бүртгэлийг арилгах уу?")) {
      localStorage.removeItem("police_rsvp_submission");
      setSavedSubmission(null);
      setShowModal(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-16 px-4 z-10">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ОРОЛЦОХ БҮРТГЭЛИЙН ФОРМ
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-light">
            Та доорх формоор дамжуулан 100 жилийн ойн арга хэмжээнд оролцох хариугаа баталгаажуулна уу.
          </p>
        </div>

        {/* Existing Submission Card (If already submitted) */}
        {savedSubmission && !showModal && (
          <div className="police-glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Бүртгэл амжилттай баталгаажсан</h3>
              <p className="text-xs text-emerald-300 mt-1">Таны урилгын хариу хүлээн авагдсан байна.</p>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 text-left space-y-1.5">
              <p><strong className="text-white">Овог нэр:</strong> {savedSubmission.full_name}</p>
              <p><strong className="text-white">Утасны дугаар:</strong> {savedSubmission.phone}</p>
              <p><strong className="text-white">Бүртгэлийн код:</strong> <span className="text-cyan-300 font-mono font-bold">{savedSubmission.ticketCode}</span></p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                Дижитал мандат харах
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
              >
                Дахин бүртгүүлэх
              </button>
            </div>
          </div>
        )}

        {/* Main Form */}
        {(!savedSubmission || showModal) && (
          <form
            onSubmit={handleSubmit}
            className="police-glass-card p-6 sm:p-10 rounded-3xl border border-white/20 shadow-2xl space-y-6"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Овог, Нэр <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ж: Баатар овогтой Болд"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Утасны дугаар <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="ж: 99112233"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Attendance Choices */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Оролцох эсэх <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "yes", label: "Оролцоно" },
                    { key: "no", label: "Боломжгүй" },
                    { key: "maybe", label: "Эргэлзээтэй" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: opt.key })}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                        formData.attendance === opt.key
                          ? "bg-blue-600/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Дагалдан явах хүний тоо</span>
                </label>
                <select
                  value={formData.guest_count}
                  onChange={(e) => setFormData({ ...formData, guest_count: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                >
                  <option value="0">Ганцаараа (0 хүн)</option>
                  <option value="1">+ 1 Дагалдан хүн</option>
                  <option value="2">+ 2 Дагалдан хүн</option>
                  <option value="3">+ 3 Дагалдан хүн</option>
                  <option value="4">+ 4 Дагалдан хүн</option>
                </select>
              </div>

            </div>

            {/* Notes / Special Wish */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
                <span>Сэтгэгдэл / Ойн баярын мэндчилгээ</span>
              </label>
              <textarea
                rows={3}
                placeholder="Түүхт 100 жилийн ойн баярын мэндчилгээ эсвэл тусгай хүсэлт..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-base shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Боловсруулж байна...</span>
              ) : (
                <>
                  <Send className="w-5 h-5 text-blue-700" />
                  <span>УРИЛГЫН ХАРИУ БАТАЛГААЖУУЛАХ</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>

      {/* Digital Pass / Invitation Badge Modal */}
      {showModal && savedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 border-2 border-white/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.4)] space-y-6 text-center text-white animate-float">
            
            {/* Top Emblem Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <Image src="/y9hy5kZE.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white tracking-wider uppercase">ХОВД АЙМАГ ЦАГДААГИЙН ГАЗАР</h4>
                <p className="text-xs text-cyan-300 font-bold">100 ЖИЛИЙН ОЙН ХҮНДЭТГЭЛИЙН МАНДАТ</p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Ticket Info */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300">БҮРТГЭЛИЙН ДҮҮРЭН КОД</span>
              <div className="p-3 bg-slate-900 border border-cyan-400/50 rounded-2xl text-white font-mono font-black text-xl tracking-wider shadow-inner inline-block px-6">
                {savedSubmission.ticketCode}
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Овог нэр:</span>
                <span className="font-bold text-white">{savedSubmission.full_name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Утасны дугаар:</span>
                <span className="font-bold text-cyan-300">{savedSubmission.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Огноо & Байршил:</span>
                <span className="font-bold text-white">9-р сарын 4, Наадмын талбай</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Төлөв:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Баталгаажсан
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4 text-cyan-300" />
                <span>Хэвлэх / Хадгалах</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs transition-all"
              >
                Хаах
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
