import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Forecast() {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const baseUrl = import.meta.env.VITE_API_URL || `${protocol}//localhost:8000`;
    fetch(`${baseUrl}/predict/forecast`)
      .then(res => res.json())
      .then(data => {
        const formatted = Object.keys(data).map(key => ({
          timeWindow: key,
          probability: Math.round(data[key] * 100)
        }));
        setForecastData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-slate-100 tracking-tight">Solar Flare Forecast</h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 shadow-2xl border-white/5">
        <h2 className="text-xl font-semibold mb-6 text-slate-300">Probability of Occurrence by Time Window</h2>
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false}/>
              <XAxis dataKey="timeWindow" stroke="#64748b" tick={{fill: '#94a3b8'}} />
              <YAxis stroke="#64748b" domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                cursor={{fill: '#ffffff10'}} 
                contentStyle={{ backgroundColor: 'rgba(13, 17, 35, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value) => [`${value}%`, 'Probability']}
              />
              <Bar dataKey="probability" fill="#eab308" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
