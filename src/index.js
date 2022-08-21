import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Article from './Article';
import Directory from './Directory';
import Subreddit from './Subreddit';
import { NilOutlet } from './Utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Directory />} />
          <Route path="/r" element={<NilOutlet />}>
            <Route path=":subredditName" element={<NilOutlet />}>
              <Route index element={<Subreddit />} />
              <Route path="comments" element={<NilOutlet />}>
                <Route path=":id36" element={<Article />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
