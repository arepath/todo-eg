import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/index';
import ToDoList from './components/ToDoList';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ToDoList type="tareas" />} />
        <Route path="/tareas" element={<ToDoList type="tareas" />} />
        <Route path="/metas" element={<ToDoList type="metas" />} />
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();