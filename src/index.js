import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Directory from './Directory';
import { SubredditParent, Subreddit } from './Subreddit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Directory />} />
          <Route path="/r" element={<SubredditParent />}>
            <Route path=":subredditName" element={<Subreddit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
