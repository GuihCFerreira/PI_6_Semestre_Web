import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import logo from '../assets/logo.png'; // ajuste o caminho se necessário

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    textDecoration: 'none',
    color: '#FFF',
    backgroundColor: active ? '#1A002A' : '#3A1C5A',
    border: 'none',
    borderRadius: '8px',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'background-color 0.3s, transform 0.2s',
    cursor: 'pointer',
    display: 'block',
  });

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#4A2A6A',
    transform: 'scale(1.02)',
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: 220,
        backgroundColor: '#FCFCFC',
        color: '#FFF',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <img src={logo} alt="Logo iPlay" style={{ width: '100%', maxWidth: 120, height: 'auto', margin: '0 auto' }} />
        </div>

        {/* Links */}
        <Link
          to="/profile"
          style={{ ...navButtonStyle(isActive('/profile')) }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, navButtonStyle(isActive('/profile')))}
        >
          Perfil
        </Link>

        <Link
          to="/recommendation"
          style={{ ...navButtonStyle(isActive('/recommendation')) }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, navButtonStyle(isActive('/recommendation')))}
        >
          Recomendações
        </Link>

        <Link
          to="/favorites"
          style={{ ...navButtonStyle(isActive('/favorites')) }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, navButtonStyle(isActive('/favorites')))}
        >
          Favoritos
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            marginTop: 'auto',
            padding: '10px',
            backgroundColor: '#FF4D4D',
            border: 'none',
            borderRadius: '8px',
            color: '#FFF',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e03a3a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF4D4D'}
        >
          Sair
        </button>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#59B2FF' }}>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
