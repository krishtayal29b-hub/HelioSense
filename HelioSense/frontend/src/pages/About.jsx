import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-solar-orange to-solar-yellow">About Aditya-L1 & HelioSense</h1>
      
      <div className="space-y-8 text-slate-300 leading-relaxed text-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-4 text-white">The Aditya-L1 Mission</h2>
          <p>
            Aditya-L1 is the first space-based Indian mission to study the Sun. The spacecraft is placed in a halo orbit around the Lagrange point 1 (L1) of the Sun-Earth system, which is about 1.5 million km from the Earth. A major advantage of having a satellite in the halo orbit around the L1 point is continuously viewing the Sun without any occultation/eclipses.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-4 text-white">SoLEXS & HEL1OS Instruments</h2>
          <p className="mb-4">
            <strong className="text-solar-orange">SoLEXS (Solar Low Energy X-ray Spectrometer):</strong> Designed to measure the solar soft X-ray flux to study the heating mechanism of the solar corona and detect flares early.
          </p>
          <p>
            <strong className="text-space-accent">HEL1OS (High Energy L1 Orbiting X-ray Spectrometer):</strong> Designed to study solar flares in the hard X-ray energy band. It captures the impulsive phase of flares where non-thermal particle acceleration occurs.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-8 border-space-purple/30 bg-space-purple/5">
          <h2 className="text-2xl font-bold mb-4 text-white">HelioSense (SuryaFlare AI)</h2>
          <p className="mb-4">
            This application combines the theoretical telemetry of both SoLEXS and HEL1OS to predict, nowcast, and explain solar flares. By fusing Soft and Hard X-ray data, we can detect the thermal (slow heating) and non-thermal (sudden impulsive) phases of a flare with high accuracy.
          </p>
          <p className="text-sm text-slate-400 font-mono mt-8 border-t border-white/10 pt-4">
            Built as a prototype demonstration for space-weather forecasting UI/UX and ML pipeline integration.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
