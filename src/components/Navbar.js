import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar combined-header">
      <div className="nav-left">
        <div className="nav-logo">🥗</div>
        <div className="nav-title">
          <h1>FOODVERSE</h1>
          <p className="tagline">Find recipes with what you have</p>
        </div>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
