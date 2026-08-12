import Image from "next/image";
import BackgroundVideo from "./components/BackgroundVideo";
import Hero from "./components/Hero";
import RsvpForm from "./components/RsvpForm";
import { MapPin, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-sans">
      
      {/* Background Video Component */}
      <BackgroundVideo />

      {/* Main Content Sections */}
      <main className="flex-1 w-full relative z-10 pt-6 sm:pt-10">
        <Hero />
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
