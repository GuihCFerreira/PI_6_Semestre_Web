import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface FavoriteGame {
  id: string;
  user_id: string;
  game_id: number;
  name: string;
  header_image: string;
  short_description: string;
  release_date: string;
}

const FavoriteGamesPage: React.FC = () => {
  const [games, setGames] = useState<FavoriteGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get<FavoriteGame[]>('/games/favorite');
        setGames(res.data);
      } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
        setError('Erro ao carregar seus jogos favoritos.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando seus jogos favoritos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  }

  if (games.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>Você ainda não favoritou nenhum jogo.</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: '0 15px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#2C003E' }}>Seus Jogos Favoritos</h2>
        <button
          onClick={() => navigate('/profile')}
          style={{
            backgroundColor: '#59B2FF',
            color: 'white',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 14
          }}
        >
          Voltar para o Perfil
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20
        }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 16,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <img
              src={game.header_image}
              alt={game.name}
              style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }}
            />
            <h4 style={{ margin: '0 0 8px 0', color: '#2C003E' }}>{game.name}</h4>
            <p style={{ fontSize: 14, color: '#444', flexGrow: 1 }}>{game.short_description}</p>
            <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
              Lançamento: {formatDate(game.release_date)}
            </p>
            <button
              onClick={() => navigate(`/game/${game.game_id}`)}
              style={{
                marginTop: 12,
                backgroundColor: '#59B2FF',
                border: 'none',
                color: 'white',
                padding: '8px 12px',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 'bold',
                alignSelf: 'flex-start'
              }}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteGamesPage;
