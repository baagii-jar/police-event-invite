"use client";

import { useState, useEffect, FormEvent } from "react";
import { Send, User, Phone, Users, MessageSquare, CheckCircle } from "lucide-react";

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
    <section id="rsvp" className="relative py-10 sm:py-16 px-3.5 sm:px-4 z-10">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            БАТАЛГААЖУУЛАЛТ
          </h2>
          <p className="text-slate-300 text-xs sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            Хэрэв та оролцохоор бол доорх хэсгийг нөхөж өгнө үү
          </p>
        </div>

        {/* Saved Submission Simple View */}
        {savedSubmission && !showModal && (
          <div className="police-glass-card p-6 sm:p-10 rounded-3xl border border-emerald-500/40 text-center space-y-5 max-w-md mx-auto shadow-[0_0_40px_rgba(16,185,129,0.25)]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Баталгаажуулсанд баярлалаа!
              </h3>
              <p className="text-sm sm:text-base text-emerald-300 font-medium">
                Таны урилга баталгаажлаа.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
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
            className="police-glass-card p-5 sm:p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl space-y-5 sm:space-y-6"
          >
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Full Name */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>Овог, Нэр <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ж: Баатар овогтой Болд"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>Утасны дугаар <span className="text-rose-400">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="ж: 99112233"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Attendance Choices */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Оролцох эсэх <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { key: "yes", label: "Оролцоно" },
                    { key: "no", label: "Боломжгүй" },
                    { key: "maybe", label: "Эргэлзээтэй" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: opt.key })}
                      className={`py-2.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold border transition-all duration-200 text-center flex items-center justify-center ${formData.attendance === opt.key
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
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>Дагалдан явах хүний тоо</span>
                </label>
                <select
                  value={formData.guest_count}
                  onChange={(e) => setFormData({ ...formData, guest_count: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
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
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>Сэтгэгдэл, мэндчилгээ</span>
                </label>
                <span className="text-slate-400 text-[11px] font-normal lowercase shrink-0">(заавал биш)</span>
              </div>
              <textarea
                rows={3}
                placeholder="Түүхт 100 жилийн ойн баярын мэндчилгээ..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm sm:text-base shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Боловсруулж байна...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700 shrink-0" />
                  <span>УРИЛГЫН ХАРИУ БАТАЛГААЖУУЛАХ</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>

      {/* Simplified Clean Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] space-y-6 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 mx-auto flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Баталгаажуулсанд баярлалаа!
              </h3>
              <p className="text-sm text-emerald-300 font-medium">
                Таны урилга баталгаажлаа.
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm transition-all shadow-lg"
            >
              Ойлголоо
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
