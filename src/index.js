import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ToDoList type="tareas" />} />
        <Route path="/tareas" element={<ToDoList type="tareas" />} />
        <Route path="/metas" element={<ToDoList type="metas" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();