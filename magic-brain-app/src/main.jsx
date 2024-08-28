import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage.jsx';
import AuthProvider from "./AuthProvider";
import Login from './Components/Login.jsx';
import Header from './Components/Header.jsx';
import Register from './Components/Register.jsx';
import ColorRecognition from './Components/ColorRecognition.jsx';
import FaceRecognition from './Components/FaceRecognition.jsx';
import CrossRoad from './Components/CrossRoad.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/colors" element={<ColorRecognition />} />
        <Route path="/faces" element={<FaceRecognition />} />
      </Routes>
    </Router>
    </AuthProvider>
  </StrictMode>,
)
