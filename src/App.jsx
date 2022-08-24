import './App.css';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h2><a href="#" onClick={() => nav(-1)}>&#x2190;</a></h2>
        <h2><Link to="/">Diluddit</Link></h2>
      </header>
      <section className="App-section">
        <Outlet />
      </section>
    </div>
  );
}

export default App;
