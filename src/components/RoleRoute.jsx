// src/components/RoleRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleRoute({ roles = [], children }) {
  const { profile, loading } = useAuth(); // profile debe traer .rol
  if (loading) return null; // o spinner
  if (!profile) return <Navigate to="/login" replace />;
  return roles.includes(profile.rol) ? children : <Navigate to="/" replace />;
}
