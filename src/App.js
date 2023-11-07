import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './compoent/Registraion/Registraion';
import Login from './compoent/login/login';
import LandingPage from './compoent/landing page/landingpage';
import Dashboard from './compoent/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;