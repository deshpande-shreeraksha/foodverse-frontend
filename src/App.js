import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';

import Home from './components/Home';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
