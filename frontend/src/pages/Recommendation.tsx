// pages/Recommendation.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Game {
  name: string;
  game_id: number;
  header_image: string;
  short_description: string;
  release_date: string;
}

const Recommendation: React.FC = () => {
  const navigate = useNavigate();

  const handleNewQuiz = () => {
    navigate('/quiz'); // redireciona de volta ao quiz
  };
  const [recommendations, setRecommendations] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get<Game[]>('/games/recomendations');
        setRecommendations(res.data);
      } catch (err) {
        console.error('Erro ao buscar recomendações:', err);
        setError('Erro ao carregar recomendações');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando recomendações...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  if (recommendations.length === 0) return <div style={{ textAlign: 'center', marginTop: 40 }}>Nenhuma recomendação disponível.</div>;

  // Primeiro jogo como principal recomendado
  const mainGame = recommendations[0];
  // Outros jogos (exceto o primeiro)
  const otherGames = recommendations.slice(1);

  // Formatar data release para algo mais legível
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: '0 15px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2C003E', marginBottom: 16 }}>Jogo Recomendado</h2>
      <div
        style={{
          display: 'flex',
          gap: 20,
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: 40,
          alignItems: 'center'
        }}
      >
        <img
          src={mainGame.header_image}
          alt={mainGame.name}
          style={{ width: 200, height: 112, objectFit: 'cover', borderRadius: 12 }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#2C003E', margin: 0 }}>{mainGame.name}</h3>
          <p style={{ fontStyle: 'italic', color: '#666', fontSize: 14 }}>{formatDate(mainGame.release_date)}</p>
          <p style={{ marginTop: 8 }}>{mainGame.short_description}</p>
          <button
            style={{
              marginTop: 12,
              backgroundColor: '#59B2FF',
              border: 'none',
              color: 'white',
              padding: '10px 16px',
              borderRadius: 10,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => navigate(`/game/${mainGame.game_id}`)}
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      <h3 style={{ color: '#2C003E', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Outros Jogos Recomendados
        <button
          onClick={handleNewQuiz}
          style={{
            backgroundColor: '#2C003E',
            color: 'white',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 14
          }}
        >
          Fazer Outro Quiz
        </button>
      </h3>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20
        }}
      >
        {otherGames.map((game) => (
          <div
            key={game.game_id}
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
            <button
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
              onClick={() => navigate(`/game/${game.game_id}`)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
