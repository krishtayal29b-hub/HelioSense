import { motion } from 'framer-motion';

export default function History() {
  const events = [
    { date: '2023-09-02 14:30 UTC', class: 'X2.2', duration: '45 mins', desc: 'Aditya-L1 SoLEXS first light flare detection.' },
    { date: '2023-11-14 08:15 UTC', class: 'M5.1', duration: '20 mins', desc: 'Impulsive HXR burst recorded by HEL1OS.' },
    { date: '2024-02-09 22:45 UTC', class: 'X3.3', duration: '1.5 hrs', desc: 'Major long-duration event with severe radio blackout impact.' },
    { date: '2024-05-11 11:00 UTC', class: 'X1.5', duration: '30 mins', desc: 'Coronal mass ejection associated event.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Historical Event Replay</h1>
      <p className="text-slate-400 mb-8">Select a past solar flare event recorded by Aditya-L1 to replay the telemetry.</p>
      
      <div className="space-y-4">
        {events.map((ev, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.1 }} 
            className="glass-panel p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-space-800 transition-all cursor-pointer border-white/5 hover:border-space-accent/50 group"
          >
            <div>
              <div className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{ev.date}</div>
              <div className="text-sm text-slate-400 mt-1">{ev.desc}</div>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right flex sm:block items-center gap-4">
              <div className={`text-2xl font-black ${ev.class.startsWith('X') ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-orange-500'}`}>
                {ev.class}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{ev.duration}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
