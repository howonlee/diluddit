import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Directory from './Directory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diluddit</h1>
      </header>
      <section className="App-section">
        <Routes>
          <Route path="/" element={<Directory />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
