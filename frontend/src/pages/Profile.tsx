import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  photo: string | null;
}

const Profile: React.FC = () => {
  const { user, token } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!user?.id || !token) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get<User>(`/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao carregar perfil:', err);
      if (err.response?.status === 401) setError('Token inválido ou expirado');
      else if (err.response?.status === 404) setError('Usuário não encontrado');
      else setError('Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const uploadImage = async (file: File) => {
    if (!token) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      await api.post('/user/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchUserData(); // Atualiza os dados para mostrar a nova foto
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      alert('Erro ao enviar a imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (!token) return;
    setUploading(true);
    try {
      await api.delete('/user/image', {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUserData(); // Atualiza o perfil para refletir remoção
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      alert('Erro ao remover a imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Opcional: validar tipo e tamanho do arquivo aqui
      uploadImage(file);
      event.target.value = ''; // reset input para poder enviar a mesma imagem novamente, se quiser
    }
  };

  if (loading) {
    return (
      <div style={styles.centered}>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.centered, color: 'red' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Meu Perfil</h1>
      <div style={styles.card}>
        <img
          src={userData?.photo || '/default-avatar.png'}
          alt="Foto de perfil"
          style={styles.avatar}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ marginTop: 12 }}
        />

        {userData?.photo && (
          <button
            onClick={removeImage}
            disabled={uploading}
            style={styles.removeButton}
          >
            Remover Foto
          </button>
        )}

        <div style={{ marginTop: 16 }}>
          <p><strong>Nome:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: '30px 20px',
    backgroundColor: '#FCFCFC',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    color: '#2C003E',
    fontSize: '28px',
    marginBottom: '24px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #59B2FF',
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    cursor: 'pointer',
  },
  centered: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
  },
};

export default Profile;
