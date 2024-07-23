import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Principal from './components/pages/Principal.jsx';
import LoginForm from './components/pages/LoginForm.jsx';
import Usuarios from './components/pages/Usuarios.jsx';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/principal' element={<Principal />} />
      <Route path='/usuarios' element={<Usuarios />} />
    </Routes>
  </BrowserRouter>
);

export default App;
