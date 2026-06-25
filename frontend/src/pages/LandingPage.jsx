import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, BrainCircuit, BarChart2, ShieldCheck, Bell, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing_bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating L1 Text (Right) */}
      <div className="hidden lg:block absolute right-24 top-1/3 text-right">
        <h3 className="text-4xl font-light text-white tracking-widest">L1</h3>
        <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase mt-1">Lagrange Point 1</p>
      </div>

      {/* Floating Solar Activity Card (Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hidden lg:flex absolute left-16 bottom-48 glass-panel p-5 rounded-[24px] flex-col gap-2 w-64 bg-[#0d1123]/80 border-white/10"
      >
        <h4 className="text-sm font-medium text-slate-300">Solar Activity</h4>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold text-white tracking-tight">X2.7</div>
            <div className="text-[10px] text-slate-400 mt-1">Current Flare Class</div>
          </div>
          {/* Mock sparkline */}
          <div className="w-24 h-12 flex items-end overflow-hidden">
            <svg viewBox="0 0 100 50" className="w-full h-full stroke-solar-orange fill-solar-orange/20 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
              <path d="M0,40 Q10,35 20,40 T40,30 T60,20 T70,35 T80,10 T100,25 L100,50 L0,50 Z" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Main Center Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center max-w-3xl flex flex-col items-center mt-10"
      >
        {/* Title */}
        <h1 className="text-7xl md:text-[5.5rem] font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
          Helio<span className="text-solar-orange drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">Sense</span>
        </h1>
        
        {/* Subtitles */}
        <p className="text-xl md:text-2xl text-slate-200 mb-6 font-medium tracking-wide">
          Solar Flare Forecasting using <br className="hidden md:block"/> Aditya-L1 Soft & Hard X-ray Data
        </p>
        
        <div className="text-sm md:text-base text-slate-400 mb-12 font-light leading-relaxed max-w-lg">
          <p className="text-white mb-2 font-medium tracking-wide">Predict. Protect. Prepare.</p>
          <p>Advanced nowcasting and forecasting of solar flares using combined Soft X-ray and Hard X-ray intelligence.</p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <Link to="/nowcasting" className="flex items-center gap-2 bg-gradient-to-r from-solar-orange to-solar-yellow hover:from-solar-yellow hover:to-solar-orange text-space-900 shadow-[0_0_20px_rgba(249,115,22,0.4)] text-base font-bold px-8 py-4 rounded-[30px] transition-all duration-300 transform hover:scale-105">
            <Activity className="w-5 h-5" /> Start Nowcasting
          </Link>
          <Link to="/forecast" className="flex items-center gap-2 text-base font-bold px-8 py-4 rounded-[30px] bg-[#0d1123]/60 hover:bg-[#1a1f38]/80 backdrop-blur-md border border-white/20 text-white transition-all duration-300">
            Explore Forecast <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </motion.div>
      
      {/* Bottom Feature Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 z-10"
      >
        <FeatureCard 
          icon={<Activity className="text-purple-400 w-6 h-6" />}
          title="Real-time Monitoring"
          desc="Soft X-ray & Hard X-ray live data analysis"
        />
        <FeatureCard 
          icon={<BrainCircuit className="text-blue-400 w-6 h-6" />}
          title="AI Nowcasting"
          desc="Detect solar flares before they peak"
        />
        <FeatureCard 
          icon={<BarChart2 className="text-green-400 w-6 h-6" />}
          title="Smart Forecasting"
          desc="5 min to 24 hour flare probability"
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-yellow-400 w-6 h-6" />}
          title="Space Weather Impact"
          desc="Stay ahead. Protect what matters"
        />
        <FeatureCard 
          icon={<Bell className="text-red-400 w-6 h-6" />}
          title="Intelligent Alerts"
          desc="Timely warnings you can trust"
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel p-5 rounded-[24px] bg-[#0d1123]/70 border-white/10 flex items-start gap-4 hover:bg-[#1a1f38]/80 transition-colors cursor-default">
      <div className="mt-1 drop-shadow-md">
        {icon}
      </div>
      <div>
        <h4 className="text-[13px] font-bold text-slate-200 mb-1 leading-tight">{title}</h4>
        <p className="text-[11px] text-slate-400 leading-snug">{desc}</p>
      </div>
    </div>
  )
}
