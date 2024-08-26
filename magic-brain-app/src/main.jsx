import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import AuthProvider from "./AuthProvider";
import Login from './Components/Login.jsx';
import Header from './Components/Header.jsx';
import Register from './Register.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AuthProvider>
  </StrictMode>,
)
