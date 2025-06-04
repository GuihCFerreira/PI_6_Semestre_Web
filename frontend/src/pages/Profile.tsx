// pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
}

const Profile: React.FC = () => {
  const { user, token } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        setError('Usuário não autenticado');
        setLoading(false);
        return;
      }

      if (!token) {
        setError('Token de autenticação não encontrado');
        setLoading(false);
        return;
      }

      try {
        const res = await api.get<User>(`/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar perfil do usuário:', err);
        if (err.response?.status === 401) {
          setError('Token inválido ou expirado');
        } else if (err.response?.status === 404) {
          setError('Usuário não encontrado');
        } else if (err.response?.status === 400) {
          setError('ID inválido');
        } else {
          setError('Não foi possível carregar os dados do perfil.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id, token]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando perfil...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ color: '#2C003E' }}>Meu Perfil</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
        <img
          src={userData?.photo}
          alt="Foto de perfil"
          style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <p>
            <strong>Nome:</strong> {userData?.name}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
