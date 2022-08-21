import './App.css';
import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
  const nav = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h1><a href="#" onClick={() => nav(-1)}>&#x2190;</a></h1>
        <h1><Link to="/">Diluddit</Link></h1>
      </header>
      <section className="App-section">
        <Outlet />
      </section>
    </div>
  );
}

export default App;
