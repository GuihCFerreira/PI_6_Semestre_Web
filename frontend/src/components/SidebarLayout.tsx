import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import logo from '../assets/logo.png';

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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar fixa */}
      <div style={{
        width: 220,
        backgroundColor: '#4A2A6A',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        flexShrink: 0
      }}>
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <img src={logo} alt="Logo iPlay" style={{ width: '100%', maxWidth: 120, height: 'auto', margin: '0 auto' }} />
        </div>

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

      {/* Conteúdo com rolagem */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        backgroundColor: '#FCFCFC',
      }}>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
