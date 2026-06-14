import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Compare from './pages/Compare';
import Saved from './pages/Saved';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans transition-colors duration-300">
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

export default App;
