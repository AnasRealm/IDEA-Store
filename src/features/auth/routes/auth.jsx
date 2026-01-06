import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/signup/SignupForm';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
};

export default AuthRoutes;