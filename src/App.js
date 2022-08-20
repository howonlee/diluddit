import './App.css';
import { Outlet } from "react-router-dom";
import Directory from './Directory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diluddit</h1>
      </header>
      <section className="App-section">
        <Outlet />
      </section>
    </div>
  );
}

export default App;
