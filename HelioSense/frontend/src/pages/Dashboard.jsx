import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [dataHistory, setDataHistory] = useState([]);
  const [nowcast, setNowcast] = useState(null);
  const [wsStatus, setWsStatus] = useState('Connecting...');

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = import.meta.env.VITE_WS_URL || `${protocol}//localhost:8000/ws/live-data`;
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => setWsStatus('Connected');
    ws.onclose = () => setWsStatus('Disconnected');
    
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'live_update') {
        const point = {
          time: new Date(payload.data.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
          sxr: payload.data.sxr_flux,
          hxr: payload.data.hxr_flux * 10, // Scale HXR for visibility
          flare: payload.data.flare_active ? payload.data.sxr_flux : null
        };
        
        setDataHistory(prev => {
          const newHistory = [...prev, point];
          if (newHistory.length > 60) newHistory.shift();
          return newHistory;
        });
        
        setNowcast(payload.nowcast);
      }
    };
    
    return () => ws.close();
  }, []);

  const riskColor = nowcast?.alert_level === 'High' ? 'text-red-500' : 
                    nowcast?.alert_level === 'Medium' ? 'text-orange-500' :
                    nowcast?.alert_level === 'Watch' ? 'text-yellow-500' : 'text-green-500';

  const riskBg = nowcast?.alert_level === 'High' ? 'bg-red-500/10 border-red-500/30 glow-box-orange' : 
                 nowcast?.alert_level === 'Medium' ? 'bg-orange-500/10 border-orange-500/30 glow-box-orange' :
                 nowcast?.alert_level === 'Watch' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/5 border-green-500/20';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
      <div className="col-span-1 lg:col-span-3 flex justify-between items-end mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Nowcasting Dashboard</h1>
          <p className="text-slate-400 mt-1">Aditya-L1 SoLEXS & HEL1OS Data Stream</p>
        </div>
        <div className="flex items-center gap-2 glass-panel px-4 py-2 border-white/5 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${wsStatus === 'Connected' ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${wsStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
          <span className="text-sm font-medium text-slate-300">{wsStatus}</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-1 lg:col-span-2 glass-panel p-6 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="text-space-accent" />
            X-Ray Flux Waveform
          </h2>
          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]"></div> SXR</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#6366f1] shadow-[0_0_8px_#6366f1]"></div> HXR</div>
          </div>
        </div>
        
        <div className="flex-grow min-h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickMargin={10} minTickGap={30} />
              <YAxis scale="log" domain={['auto', 'auto']} stroke="#64748b" tick={{fontSize: 12}} tickFormatter={(val) => val.toExponential(0)} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(13, 17, 35, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#fff', fontWeight: 500 }}
                formatter={(value) => value ? value.toExponential(2) : 'N/A'}
                labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
              />
              <Line type="monotone" dataKey="sxr" stroke="#f97316" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="hxr" stroke="#6366f1" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="flare" stroke="#ef4444" strokeWidth={5} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="col-span-1 flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass-panel p-6 border ${riskBg} transition-colors duration-500 relative overflow-hidden`}
        >
          {nowcast?.alert_level === 'High' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
          )}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">Current Risk Level</h2>
            {nowcast?.alert_level === 'High' ? <AlertTriangle className={`w-6 h-6 ${riskColor}`} /> : <ShieldCheck className={`w-6 h-6 ${riskColor}`} />}
          </div>
          
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative flex items-center justify-center w-36 h-36 mb-4">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle 
                  cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  className={`${riskColor} transition-all duration-1000 ease-out drop-shadow-[0_0_10px_currentColor]`}
                  strokeDasharray={`${2 * Math.PI * 66}`}
                  strokeDashoffset={`${2 * Math.PI * 66 * (1 - (nowcast?.probability || 0))}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-4xl font-bold tracking-tighter">
                {Math.round((nowcast?.probability || 0) * 100)}<span className="text-2xl text-slate-400">%</span>
              </div>
            </div>
            
            <div className={`text-2xl font-bold tracking-widest uppercase ${riskColor}`}>
              {nowcast?.alert_level || 'Normal'}
            </div>
            
            {nowcast?.flare_detected && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-4 flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/50"
              >
                <Zap className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-red-100 font-bold">CLASS {nowcast?.flare_class} FLARE</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 flex-grow flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-space-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-space-purple"></span>
            </span>
            Surya AI Assistant
          </h2>
          
          <div className="bg-space-900/60 rounded-xl p-5 flex-grow border border-white/5 relative overflow-hidden group shadow-inner">
            <div className="absolute top-0 left-0 w-1 h-full bg-space-accent group-hover:bg-solar-yellow transition-colors duration-500"></div>
            <p className="text-slate-200 leading-relaxed font-mono text-sm">
              {nowcast?.explanation || "Initializing monitoring systems. Awaiting stable telemetry from Aditya-L1..."}
            </p>
            
            <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs text-slate-400">
              <div>Confidence: <span className="text-white font-mono text-sm ml-1">{(nowcast?.confidence * 100 || 0).toFixed(1)}%</span></div>
              <div>Mode: <span className="text-solar-yellow font-medium ml-1">Live Telemetry</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
