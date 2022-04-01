import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <div className="nav">
        <NavLink activeClassName="active" className="links" to="/register">
          Register
        </NavLink>
        <NavLink activeClassName="active" className="links" to="/login">
          Login
        </NavLink>
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
