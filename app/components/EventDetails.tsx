"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  location?: string;
  responsible?: string;
  type?: string;
}

interface DaySchedule {
  dayId: string;
  dayLabel: string;
  date: string;
  dateFormatted: string;
  heading: string;
  badge?: string;
  items: ScheduleItem[];
}

const SCHEDULE_DATA: DaySchedule[] = [
  {
    dayId: "2026.09.03",
    dayLabel: "Эхний өдөр",
    date: "2026.09.03",
    dateFormatted: "2026.09.03 - Пүрэв гараг",
    heading: "Эхний өдрийн хөтөлбөр /2026.09.03/",
    badge: "Зочид угтан авах өдөр",
    items: [
      {
        id: 1,
        time: "Өдрийн турш",
        title: "Зочид, төлөөлөгчдийг угтаж авах",
        location: "Хурандаа овоо",
      },
      {
        id: 2,
        time: "Өдрийн турш",
        title: "Байрлах байршилд хүргэх",
        location: "Сургалтын төв, буудал",
      },
      {
        id: 3,
        time: "Орой",
        title: "Оройн хоол, амрах",
      },
    ],
  },
  {
    dayId: "2026.09.04",
    dayLabel: "2 дахь өдөр",
    date: "2026.09.04",
    dateFormatted: "2026.09.04 - Баасан гараг",
    heading: "2 дахь өдрийн хөтөлбөр /2026.09.04/",
    badge: "Баярын гол өдөр",
    items: [
      {
        id: 4,
        time: "08:00 - 09:00",
        title: "Өглөөний цай",
      },
      {
        id: 5,
        time: "09:00 - 11:00",
        title: "Баярын хурал",
        location: "Хөгжимт драмын театр",
      },
      {
        id: 6,
        time: "11:40 - 13:00",
        title: "Шинэ конторын барилгын нээлт",
      },
      {
        id: 7,
        time: "13:00 - 15:00",
        title: "Өдрийн хоол",
      },
      {
        id: 8,
        time: "15:00 - 16:00",
        title: "Ёслолын жагсаал",
        location: "Ард аюушийн талбайд",
      },
      {
        id: 9,
        time: "20:00",
        title: "Урлагийн шоу тоглолт",
        location: "Ард аюушийн талбай",
      },
    ],
  },
  {
    dayId: "2026.09.05",
    dayLabel: "3 дахь өдөр",
    date: "2026.09.05",
    dateFormatted: "2026.09.05 - Бямба гараг",
    heading: "3 дахь өдрийн хөтөлбөр /2026.09.05/",
    badge: "Наадмын өдөр",
    items: [
      {
        id: 10,
        time: "08:00 - 09:00",
        title: "Өглөөний цай",
      },
      {
        id: 11,
        time: "09:00 - 10:30",
        title: "Ховд аймгийн 4 зүгт гарах",
      },
      {
        id: 12,
        time: "10:30 - 11:40",
        title: "Генерал танхимын нээлт",
        location: "Аймгийн Музей",
      },
      {
        id: 13,
        time: "11:40 - 12:00",
        title: "Бөхийн барилдааны нээлт",
        location: "Наадмын талбай",
      },
      {
        id: 14,
        time: "12:00 - 17:00",
        title: "Бөхийн барилдааны үргэлжлэл",
        location: "Наадмын талбай",
      },
      {
        id: 15,
        time: "19:00",
        title: "Хүндэтгэлийн хүлээн авалт",
      },
    ],
  },
  {
    dayId: "2026.09.06",
    dayLabel: "4 дэх өдөр",
    date: "2026.09.06",
    dateFormatted: "2026.09.06 - Ням гараг",
    heading: "4 дэх өдрийн хөтөлбөр /2026.09.06/",
    badge: "Үдэлтийн өдөр",
    items: [
      {
        id: 16,
        time: "09:00 - 10:00",
        title: "Өглөөний цай",
      },
      {
        id: 17,
        time: "11:00 - 16:00",
        title: "Үдэлт",
      },
    ],
  },
];

export default function EventDetails() {
  return (
    <section id="details" className="relative py-8 sm:py-12 px-3 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center mb-8 space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest">
          <Calendar className="w-3.5 h-3.5" />
          <span>Арга Хэмжээний Хөтөлбөр</span>
        </div>

        <h2 className="text-2.5xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ӨДРИЙН ХӨТӨЛБӨР
        </h2>

        <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed px-2">
          Ховд аймгийн Цагдаагийн газрын 100-н жилийн ойн баярын арга хэмжээний
          2026 оны 9-р сарын 03-наас 06-ны өдрүүд дэх дэлгэрэнгүй дараалал
        </p>
      </div>

      {/* Main Responsive List View */}
      <div className="space-y-6 sm:space-y-8">
        {SCHEDULE_DATA.map((day) => (
          <div
            key={day.dayId}
            className="police-glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl"
          >
            {/* Day Header Bar */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                <h3 className="text-sm sm:text-lg font-black text-white truncate">
                  {day.heading}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-white font-bold bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/20 shrink-0">
                {day.date}
              </span>
            </div>

            {/* List Column Titles */}
            <div className="bg-slate-950/90 text-white uppercase tracking-wider text-[10px] sm:text-[11px] font-bold border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
              <div className="w-6 sm:w-8 shrink-0 text-center">№</div>
              <div className="flex-1 px-2">Арга хэмжээний агуулга</div>
              <div className="shrink-0 text-right w-24 sm:w-32">Цаг</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-800/60 bg-slate-900/40">
              {day.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 sm:gap-3 py-3.5 px-4 sm:px-6 hover:bg-white/5 transition-colors"
                >
                  {/* Left: Number */}
                  <div className="w-6 sm:w-8 shrink-0 text-center font-mono font-bold text-white text-xs sm:text-sm">
                    {item.id}
                  </div>

                  {/* Center: Title & Location */}
                  <div className="flex-1 min-w-0 px-1 sm:px-2">
                    <div className="font-semibold text-white text-xs sm:text-sm leading-snug">
                      {item.title}
                    </div>
                    {item.location && (
                      <div className="text-[11px] sm:text-xs text-amber-300 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Time */}
                  <div className="shrink-0 text-right font-mono text-[11px] sm:text-xs font-semibold text-white bg-slate-950/80 px-2 sm:px-2.5 py-1 rounded-lg border border-slate-800/80">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Bottom Note */}
      <div className="mt-8 p-3.5 sm:p-4 rounded-2xl police-glass border border-white/20 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-white shrink-0" />
        <span>
          Хөтөлбөрт өөрчлөлт орвол тухай бүр зохион байгуулах ажлын хэсгээс мэдээлэх болно.
        </span>
      </div>
    </section>
  );
}

