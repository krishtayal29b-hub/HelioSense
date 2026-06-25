import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ShieldCheck, Zap, Sun, Wind, Radio, Layers, Eye, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ThreeSun from '../components/ThreeSun';

const fallbackHistory = [
  { time: '10:00', sxr: 1e-7, hxr: 2e-7, flare: null },
  { time: '10:10', sxr: 2e-7, hxr: 3e-7, flare: null },
  { time: '10:20', sxr: 8e-7, hxr: 5e-7, flare: 8e-7 },
  { time: '10:30', sxr: 3e-7, hxr: 4e-7, flare: null },
  { time: '10:40', sxr: 1e-6, hxr: 8e-7, flare: 1e-6 },
  { time: '10:50', sxr: 4e-7, hxr: 5e-7, flare: null },
  { time: '11:00', sxr: 2e-6, hxr: 1e-6, flare: 2e-6 },
  { time: '11:10', sxr: 7e-7, hxr: 6e-7, flare: null },
];
 fetch(`${import.meta.env.VITE_API_URL}/health`)
const activeRegions = [
  { id: 'AR4087', type: 'Beta-Gamma', area: '320 µHem', location: 'N18W25', className: 'M1.2' },
  { id: 'AR4086', type: 'Beta', area: '150 µHem', location: 'S12E40', className: 'C3.4' },
  { id: 'AR4085', type: 'Alpha', area: '80 µHem', location: 'N05E15', className: 'B1.0' },
];

export default function Dashboard() {
  const [dataHistory, setDataHistory] = useState([]);
  const [nowcast, setNowcast] = useState(null);
  const [wsStatus, setWsStatus] = useState('Connecting...');

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = import.meta.env.VITE_WS_URL || `${protocol}//import.meta.env.VITE_WS_URL`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => setWsStatus('Connected');
    ws.onclose = () => setWsStatus('Demo Mode');
    ws.onerror = () => setWsStatus('Demo Mode');

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'live_update') {
        const point = {
          time: new Date(payload.data.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
          sxr: payload.data.sxr_flux,
          hxr: payload.data.hxr_flux * 10,
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

  const chartData = dataHistory.length ? dataHistory : fallbackHistory;
  const probability = nowcast?.probability ?? 0.42;
  const alertLevel = nowcast?.alert_level || 'Moderate';
  const riskColor = alertLevel === 'High' ? 'text-red-500' :
                    alertLevel === 'Medium' || alertLevel === 'Moderate' ? 'text-orange-400' :
                    alertLevel === 'Watch' ? 'text-yellow-400' : 'text-green-400';

  return (
    <div className="relative pb-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_18%,rgba(249,115,22,0.18),transparent_28%),radial-gradient(circle_at_20%_35%,rgba(99,102,241,0.16),transparent_26%)]" />

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-solar-orange font-semibold tracking-[0.2em] uppercase">Aditya-L1 Solar Intelligence</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">Welcome back, Krish! <span className="inline-block animate-pulse">☀️</span></h1>
            <p className="text-slate-400 mt-2">Monitor solar activity, explore flare signals, and visualize the Sun in 3D.</p>
          </div>
          <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${wsStatus === 'Connected' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${wsStatus === 'Connected' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            </span>
            <span className="text-sm font-medium text-slate-300">{wsStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Solar Flare Risk" value={`${Math.round(probability * 100)}%`} sub="12% from yesterday" icon={<Sun />} color="text-solar-yellow" />
            <MetricCard title="Latest Flare" value={nowcast?.flare_class || 'M1.2'} sub="X-ray classification" icon={<Zap />} color="text-orange-400" />
            <MetricCard title="Active Regions" value="3" sub="1 new region" icon={<Activity />} color="text-green-400" />
            <MetricCard title="Solar Wind" value="523 km/s" sub="8% from yesterday" icon={<Wind />} color="text-sky-400" />
          </div>

          <div className="glass-panel border border-orange-500/30 bg-orange-500/10 p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 glow-box-orange">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <AlertTriangle className="text-solar-yellow" />
              </div>
              <div>
                <h3 className="font-bold text-white">{nowcast?.flare_detected ? `${nowcast?.flare_class} flare detected` : 'M1.2 flare activity detected'}</h3>
                <p className="text-sm text-slate-300">Minor radio blackout possible. Stay tuned for updates.</p>
              </div>
            </div>
            <button className="glass-button rounded-2xl px-5 py-3 text-sm">View Details →</button>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 flex flex-col min-h-[410px]">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2"><Activity className="text-space-accent" /> X-ray Flux</h2>
              <div className="flex gap-4 text-sm font-medium">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]"></div> SXR</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]"></div> HXR</div>
              </div>
            </div>
            <div className="flex-grow min-h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickMargin={10} minTickGap={30} />
                  <YAxis scale="log" domain={['auto', 'auto']} stroke="#64748b" tick={{fontSize: 12}} tickFormatter={(val) => val.toExponential(0)} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(13, 17, 35, 0.92)', borderColor: 'rgba(255, 255, 255, 0.12)', borderRadius: '14px', backdropFilter: 'blur(10px)' }} itemStyle={{ color: '#fff', fontWeight: 500 }} formatter={(value) => value ? value.toExponential(2) : 'N/A'} labelStyle={{ color: '#94a3b8', marginBottom: '8px' }} />
                  <Line type="monotone" dataKey="sxr" stroke="#f97316" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="hxr" stroke="#8b5cf6" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="flare" stroke="#ef4444" strokeWidth={5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="xl:col-span-5 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel relative overflow-hidden min-h-[530px] p-5">
            <div className="absolute inset-0 sun-grid opacity-30" />
            <div className="relative z-10 flex justify-between items-start mb-3">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">3D Sun <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">Live Visual</span></h2>
                <p className="text-sm text-slate-400 mt-1">Rotating plasma surface with glow layers</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"><Eye className="w-4 h-4" /></button>
                <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"><RotateCcw className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="relative z-10 h-[380px] md:h-[430px]">
              <ThreeSun />
            </div>
            <div className="relative z-10 grid grid-cols-3 gap-3 mt-3">
              <SunTool icon={<Sun />} label="Sun" active />
              <SunTool icon={<Radio />} label="Magnetogram" />
              <SunTool icon={<Layers />} label="Layers" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
            <RiskPanel alertLevel={alertLevel} probability={probability} riskColor={riskColor} nowcast={nowcast} />
            <ActiveRegions />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <MiniPanel title="Solar Wind" value="523" unit="km/s" desc="Density 5.1 p/cm³ • Bz -2.3 nT" />
        <MiniPanel title="Kp Index" value="3" unit="Unsettled" desc="Scale: 0 Quiet - 9 Extreme" />
        <ForecastDonut />
      </div>
    </div>
  );
}

function MetricCard({ title, value, sub, icon, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5 rounded-3xl hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start">
        <div className="text-sm text-slate-400 font-medium">{title}</div>
        <div className={`${color} opacity-90`}>{icon}</div>
      </div>
      <div className={`mt-5 text-3xl font-bold ${color}`}>{value}</div>
      <p className="mt-4 text-xs text-slate-400">↑ {sub}</p>
    </motion.div>
  );
}

function RiskPanel({ alertLevel, probability, riskColor, nowcast }) {
  return (
    <div className="glass-panel p-6 rounded-3xl">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Current Risk Level</h2>
        {alertLevel === 'High' ? <AlertTriangle className={`w-6 h-6 ${riskColor}`} /> : <ShieldCheck className={`w-6 h-6 ${riskColor}`} />}
      </div>
      <div className="flex items-center gap-5">
        <div className="relative flex items-center justify-center w-28 h-28">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
            <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className={`${riskColor} transition-all duration-1000 ease-out drop-shadow-[0_0_10px_currentColor]`} strokeDasharray={`${2 * Math.PI * 50}`} strokeDashoffset={`${2 * Math.PI * 50 * (1 - probability)}`} strokeLinecap="round" />
          </svg>
          <div className="text-3xl font-bold tracking-tighter">{Math.round(probability * 100)}<span className="text-xl text-slate-400">%</span></div>
        </div>
        <div>
          <div className={`text-2xl font-bold tracking-widest uppercase ${riskColor}`}>{alertLevel}</div>
          <p className="text-sm text-slate-400 mt-2">{nowcast?.explanation || 'Stable monitoring with moderate solar activity.'}</p>
        </div>
      </div>
    </div>
  );
}

function ActiveRegions() {
  return (
    <div className="glass-panel p-6 rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Active Regions</h2>
        <span className="text-sm text-space-accent">View All →</span>
      </div>
      <div className="space-y-3">
        {activeRegions.map((region) => (
          <div key={region.id} className="p-4 rounded-2xl bg-white/[0.035] border border-white/5 flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-white">{region.id}</div>
              <div className="text-xs text-orange-300">{region.type}</div>
            </div>
            <div className="text-xs text-slate-400 hidden sm:block">Area<br /><span className="text-slate-200">{region.area}</span></div>
            <div className="text-xs text-slate-400 hidden sm:block">Location<br /><span className="text-slate-200">{region.location}</span></div>
            <div className="text-right"><div className="text-xs text-slate-400">Class</div><div className="font-bold text-solar-yellow">{region.className}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SunTool({ icon, label, active }) {
  return (
    <button className={`rounded-2xl p-3 border text-xs flex flex-col items-center gap-2 transition-all ${active ? 'bg-space-accent/30 border-space-accent/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
      {icon}
      {label}
    </button>
  );
}

function MiniPanel({ title, value, unit, desc }) {
  const miniData = fallbackHistory.map((item, index) => ({ name: item.time, value: index % 2 ? 35 + index * 8 : 24 + index * 6 }));
  return (
    <div className="glass-panel p-6 rounded-3xl min-h-[190px]">
      <div className="flex justify-between mb-5"><h3 className="font-semibold text-lg">{title}</h3><span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Live</span></div>
      <div className="flex items-end justify-between gap-4">
        <div><span className="text-4xl font-bold text-white">{value}</span><span className="text-slate-400 ml-2">{unit}</span><p className="text-xs text-slate-400 mt-3">{desc}</p></div>
        <div className="h-24 w-32">
          <ResponsiveContainer width="100%" height="100%"><AreaChart data={miniData}><Area type="monotone" dataKey="value" stroke="#f97316" fill="#f9731633" strokeWidth={2} /></AreaChart></ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ForecastDonut() {
  return (
    <div className="glass-panel p-6 rounded-3xl min-h-[190px]">
      <div className="flex justify-between mb-4"><h3 className="font-semibold text-lg">Flare Forecast</h3><span className="text-xs text-slate-400">Next 24 Hours</span></div>
      <div className="flex items-center gap-5">
        <div className="w-24 h-24 rounded-full bg-[conic-gradient(#ef4444_0_15%,#f97316_15%_57%,#eab308_57%_85%,#22c55e_85%_100%)] flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.25)]">
          <div className="w-16 h-16 rounded-full bg-space-800 flex flex-col items-center justify-center"><span className="font-bold">42%</span><span className="text-[10px] text-slate-400">Moderate</span></div>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <p><span className="text-red-400">●</span> High 15%</p>
          <p><span className="text-orange-400">●</span> Moderate 42%</p>
          <p><span className="text-yellow-400">●</span> Low 28%</p>
          <p><span className="text-green-400">●</span> Very Low 15%</p>
        </div>
      </div>
    </div>
  );
}
