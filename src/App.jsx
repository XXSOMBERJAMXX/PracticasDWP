import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Login from './views/LoginPage/LoginPage';
import MainLayout from './layouts/MainLayout';
import GroupLayout from './layouts/GroupLayout';
import Sidebar from './components/Sidebar';
import Register from './views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainLayout />} />
        <Route path="/groups" element={<GroupLayout />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;
