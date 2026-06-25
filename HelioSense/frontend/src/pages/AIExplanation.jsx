import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BrainCircuit } from 'lucide-react';

export default function AIExplanation() {
  const featureData = [
    { name: 'SXR Flux Derivative', importance: 85 },
    { name: 'HXR Impulsive Spike', importance: 78 },
    { name: 'SXR/HXR Ratio', importance: 62 },
    { name: 'Rolling Mean (1h)', importance: 45 },
    { name: 'Background Noise', importance: 15 },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuit className="w-8 h-8 text-space-purple" />
        <h1 className="text-3xl font-bold tracking-tight">Explainable AI (XAI)</h1>
      </div>
      <p className="text-slate-400 mb-8">Understanding which Aditya-L1 telemetry features drive the model's predictions.</p>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 shadow-xl border-space-purple/20">
        <h2 className="text-xl font-semibold mb-6 text-slate-200">Global Feature Importance (Random Forest)</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={featureData} margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false}/>
              <XAxis type="number" stroke="#64748b" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={150} tick={{fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#ffffff10'}} 
                contentStyle={{ backgroundColor: 'rgba(13, 17, 35, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value) => [`${value}%`, 'Importance Weight']}
              />
              <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
