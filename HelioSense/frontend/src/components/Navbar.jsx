import { Link, useLocation } from 'react-router-dom';
import { Sun } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Nowcasting', path: '/nowcasting' },
  { name: 'Forecast', path: '/forecast' },
  { name: 'Alerts', path: '/alerts' },
  { name: 'Research', path: '/research' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <Sun className="w-8 h-8 text-solar-orange group-hover:text-solar-yellow transition-colors duration-500" />
          <div className="absolute inset-0 bg-solar-orange/30 blur-md rounded-full"></div>
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">
          HelioSense
        </span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm transition-colors duration-300 drop-shadow-md",
                isActive ? "text-white font-medium" : "text-slate-300 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </div>

      <div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-[24px] border border-white/10 bg-[#0d1123]/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-200 leading-tight">Aditya-L1 Mission</span>
            <span className="text-[10px] text-slate-400 leading-none">Connected</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
