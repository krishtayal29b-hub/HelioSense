import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileType, CheckCircle } from 'lucide-react';

export default function DataUpload() {
  const [solexsStatus, setSolexsStatus] = useState('idle');
  const [hel1osStatus, setHel1osStatus] = useState('idle');

  const handleUpload = (type) => {
    const setStatus = type === 'solexs' ? setSolexsStatus : setHel1osStatus;
    setStatus('uploading');
    
    // Simulate upload delay
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">Data Upload Module</h1>
      <p className="text-slate-400 mb-10">Upload custom FITS or CSV telemetry from Aditya-L1 for offline analysis.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SoLEXS Upload */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-space-accent/20 flex items-center justify-center mb-4">
            <FileType className="w-8 h-8 text-space-accent" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-slate-200">SoLEXS SXR Data</h2>
          <p className="text-sm text-slate-400 mb-6">Soft X-ray spectrometer dataset</p>
          
          {solexsStatus === 'idle' && (
            <button onClick={() => handleUpload('solexs')} className="glass-button w-full flex justify-center items-center gap-2 hover:bg-space-accent/20 border-space-accent/40 text-space-accent">
              <UploadCloud className="w-5 h-5" /> Select File
            </button>
          )}
          {solexsStatus === 'uploading' && (
            <div className="w-full h-10 flex items-center justify-center text-space-accent animate-pulse">Uploading...</div>
          )}
          {solexsStatus === 'success' && (
            <div className="w-full h-10 flex items-center justify-center text-green-500 gap-2"><CheckCircle className="w-5 h-5" /> Uploaded</div>
          )}
        </motion.div>

        {/* HEL1OS Upload */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-solar-orange/20 flex items-center justify-center mb-4">
            <FileType className="w-8 h-8 text-solar-orange" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-slate-200">HEL1OS HXR Data</h2>
          <p className="text-sm text-slate-400 mb-6">Hard X-ray spectrometer dataset</p>
          
          {hel1osStatus === 'idle' && (
            <button onClick={() => handleUpload('hel1os')} className="glass-button w-full flex justify-center items-center gap-2 hover:bg-solar-orange/20 border-solar-orange/40 text-solar-orange">
              <UploadCloud className="w-5 h-5" /> Select File
            </button>
          )}
          {hel1osStatus === 'uploading' && (
            <div className="w-full h-10 flex items-center justify-center text-solar-orange animate-pulse">Uploading...</div>
          )}
          {hel1osStatus === 'success' && (
            <div className="w-full h-10 flex items-center justify-center text-green-500 gap-2"><CheckCircle className="w-5 h-5" /> Uploaded</div>
          )}
        </motion.div>
      </div>
      
      <div className="mt-10 p-6 glass-panel border-white/5 bg-space-900/50">
         <p className="text-sm text-slate-400">Note: Data must be formatted as CSV with columns <code>timestamp</code>, <code>flux</code>, or standard Level-1 FITS format. Max file size: 50MB.</p>
      </div>
    </div>
  );
}
