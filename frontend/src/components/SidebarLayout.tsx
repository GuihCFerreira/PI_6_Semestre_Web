// components/SidebarLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    textDecoration: 'none',
    color: active ? '#FFF' : '#DDD',
    backgroundColor: active ? '#2C003E' : 'transparent',
    borderRadius: '8px',
    transition: '0.3s',
    fontWeight: active ? 'bold' : 'normal',
    display: 'block',
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: 220,
        backgroundColor: '#1E1E2F',
        color: '#FFF',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginBottom: 20 }}>🎮 iPlay</h2>

        <Link to="/profile" style={navStyle(isActive('/profile'))}>Perfil</Link>
        <Link to="/recommendation" style={navStyle(isActive('/recommendation'))}>Recomendações</Link>
        <Link to="/favorites" style={navStyle(isActive('/favorites'))}>Favoritos</Link>

        <button
          onClick={logout}
          style={{
            marginTop: 'auto',
            padding: '10px',
            backgroundColor: '#FF4D4D',
            border: 'none',
            borderRadius: '8px',
            color: '#FFF',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#FCFCFC' }}>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
