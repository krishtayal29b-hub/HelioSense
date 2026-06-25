import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import DataUpload from './pages/DataUpload';
import History from './pages/History';
import AIExplanation from './pages/AIExplanation';
import Alerts from './pages/Alerts';
import ResearchLab from './pages/ResearchLab';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-space-900 flex flex-col relative overflow-hidden text-slate-200">
        <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-space-purple/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-solar-orange/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <Navbar />
        <main className="flex-grow z-10 w-full mt-24 px-6 max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/nowcasting" element={<Dashboard />} />
            <Route path="/upload" element={<DataUpload />} />
            <Route path="/history" element={<History />} />
            <Route path="/explain" element={<AIExplanation />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/research" element={<ResearchLab />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
