import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Login from './views/LoginPage/LoginPage';
import MainLayout from './layouts/MainLayout';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainLayout />} />
        
      </Routes>
    </Router>
  );
}

export default App;
