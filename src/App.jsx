import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Compare from './pages/Compare';
import Saved from './pages/Saved';
import Header from './components/Header/Header';
import WeatherAnimation from './components/WeatherAnimation/WeatherAnimation';
import { useSettings } from './context/SettingsContext';

function AppInner() {
  const { weatherCode, isDay } = useSettings();
  return (
    <BrowserRouter>
      <WeatherAnimation weatherCode={weatherCode} isDay={isDay} />
      <div className="relative min-h-screen font-sans transition-colors duration-300" style={{ zIndex: 3 }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return <AppInner />;
}

export default App;
