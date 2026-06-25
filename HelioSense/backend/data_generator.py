import pandas as pd
import numpy as np
import time
from datetime import datetime, timedelta

class SolarDataSimulator:
    def __init__(self):
        self.start_time = datetime.now()
        self.current_time = self.start_time
        
        # Base background fluxes (realistic order of magnitude for GOES/Aditya-L1 SXR)
        self.sxr_bg = 1e-8
        self.hxr_bg = 1e-9
        
        self.flare_active = False
        self.flare_start_time = None
        self.flare_peak_time = None
        self.flare_end_time = None
        self.flare_class = 'A'
        self.flare_max_sxr = 1e-8
        
        self.time_step = 1 # seconds for nowcast demo
        
    def generate_next_point(self):
        self.current_time += timedelta(seconds=self.time_step)
        
        # Random noise
        sxr_noise = np.random.normal(0, self.sxr_bg * 0.05)
        hxr_noise = np.random.normal(0, self.hxr_bg * 0.1)
        
        sxr_val = self.sxr_bg + sxr_noise
        hxr_val = self.hxr_bg + hxr_noise
        
        # Randomly trigger a flare (2% chance every second for demo purposes to see them often)
        if not self.flare_active and np.random.random() < 0.02:
            self.trigger_flare()
            
        if self.flare_active:
            # Calculate time since flare start
            dt = (self.current_time - self.flare_start_time).total_seconds()
            duration = (self.flare_end_time - self.flare_start_time).total_seconds()
            peak_dt = (self.flare_peak_time - self.flare_start_time).total_seconds()
            
            if dt > duration:
                self.flare_active = False
            else:
                # Flare profile: rapid rise, slow decay
                if dt <= peak_dt:
                    # Rise phase
                    progress = dt / peak_dt
                    sxr_val += (self.flare_max_sxr - self.sxr_bg) * (progress ** 2)
                    # HXR peaks earlier and harder (impulsive phase)
                    hxr_progress = min(1.0, dt / (peak_dt * 0.5))
                    hxr_val += (self.flare_max_sxr * 0.1 - self.hxr_bg) * (hxr_progress ** 3) * (1 - hxr_progress) * 4
                else:
                    # Decay phase
                    decay_progress = (dt - peak_dt) / (duration - peak_dt)
                    sxr_val += (self.flare_max_sxr - self.sxr_bg) * np.exp(-decay_progress * 5)
                    
        return {
            "timestamp": self.current_time.isoformat(),
            "sxr_flux": max(1e-9, sxr_val),
            "hxr_flux": max(1e-10, hxr_val),
            "flare_active": self.flare_active,
            "flare_class": self.flare_class if self.flare_active else None
        }

    def trigger_flare(self):
        self.flare_active = True
        self.flare_start_time = self.current_time
        
        # Randomly assign a class A, B, C, M, X
        classes = ['A', 'B', 'C', 'M', 'X']
        probs = [0.4, 0.3, 0.2, 0.08, 0.02]
        self.flare_class = np.random.choice(classes, p=probs)
        
        # Peak multipliers (Standard GOES classes)
        multipliers = {'A': 1e-7, 'B': 1e-6, 'C': 1e-5, 'M': 1e-4, 'X': 1e-3}
        base_peak = multipliers[self.flare_class]
        self.flare_max_sxr = base_peak * np.random.uniform(1.0, 9.9)
        
        # Duration: 15 to 60 seconds (scaled for rapid demo viewing)
        duration_sec = np.random.randint(15, 60) 
        self.flare_end_time = self.flare_start_time + timedelta(seconds=duration_sec)
        
        # Peak is usually 20-30% into the flare
        peak_sec = int(duration_sec * np.random.uniform(0.2, 0.3))
        self.flare_peak_time = self.flare_start_time + timedelta(seconds=max(2, peak_sec))

if __name__ == "__main__":
    sim = SolarDataSimulator()
    for _ in range(10):
        print(sim.generate_next_point())
