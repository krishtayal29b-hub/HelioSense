import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, CheckCircle2, Crosshair, BarChart } from 'lucide-react';

export default function ResearchLab() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const baseUrl = import.meta.env.VITE_API_URL || `${protocol}//localhost:8000`;
    fetch(`${baseUrl}/model/metrics`)
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(console.error);
  }, []);

  if (!metrics) return <div className="p-10 text-center animate-pulse">Loading Metrics...</div>;

  const [tn, fp] = metrics.confusion_matrix[0];
  const [fn, tp] = metrics.confusion_matrix[1];

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex items-center gap-3 mb-4">
        <FlaskConical className="w-8 h-8 text-space-accent" />
        <h1 className="text-3xl font-bold tracking-tight">Research Lab Metrics</h1>
      </div>
      <p className="text-slate-400 mb-8">Model evaluation metrics for the backend classifier.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 text-center border-t-2 border-t-green-500">
          <div className="text-3xl font-bold text-white mb-1">{(metrics.accuracy * 100).toFixed(1)}%</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">Accuracy</div>
        </div>
        <div className="glass-panel p-6 text-center border-t-2 border-t-blue-500">
          <div className="text-3xl font-bold text-white mb-1">{(metrics.precision * 100).toFixed(1)}%</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">Precision</div>
        </div>
        <div className="glass-panel p-6 text-center border-t-2 border-t-orange-500">
          <div className="text-3xl font-bold text-white mb-1">{(metrics.recall * 100).toFixed(1)}%</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">Recall</div>
        </div>
        <div className="glass-panel p-6 text-center border-t-2 border-t-purple-500">
          <div className="text-3xl font-bold text-white mb-1">{(metrics.f1_score * 100).toFixed(1)}%</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">F1 Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-200">Confusion Matrix</h2>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2"></div>
            <div className="p-2 font-bold text-slate-300">Predicted Neg</div>
            <div className="p-2 font-bold text-slate-300">Predicted Pos</div>

            <div className="p-4 font-bold text-slate-300 flex items-center justify-center">Actual Neg</div>
            <div className="p-4 bg-space-800 border border-white/10 rounded">
              <div className="text-2xl text-green-400 font-mono">{tn}</div>
              <div className="text-xs text-slate-500 mt-1">True Negative</div>
            </div>
            <div className="p-4 bg-space-800 border border-white/10 rounded">
              <div className="text-2xl text-red-400 font-mono">{fp}</div>
              <div className="text-xs text-slate-500 mt-1">False Positive</div>
            </div>

            <div className="p-4 font-bold text-slate-300 flex items-center justify-center">Actual Pos</div>
            <div className="p-4 bg-space-800 border border-white/10 rounded">
              <div className="text-2xl text-orange-400 font-mono">{fn}</div>
              <div className="text-xs text-slate-500 mt-1">False Negative</div>
            </div>
            <div className="p-4 bg-space-800 border border-white/10 rounded bg-space-accent/10">
              <div className="text-2xl text-green-400 font-mono">{tp}</div>
              <div className="text-xs text-slate-500 mt-1">True Positive</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8">
          <h2 className="text-xl font-bold mb-6 text-slate-200">Model Configuration</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex gap-2">
              <strong className="w-24 text-slate-400">Model Type:</strong> {metrics.model_type}
            </li>
            <li className="flex gap-2">
              <strong className="w-24 text-slate-400 shrink-0">Features:</strong> 
              <div className="flex flex-wrap gap-2">
                {metrics.features.map(f => (
                  <span key={f} className="px-2 py-1 bg-white/5 rounded text-xs font-mono border border-white/10">{f}</span>
                ))}
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
