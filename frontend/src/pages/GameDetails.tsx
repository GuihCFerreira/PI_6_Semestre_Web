import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface GameDetail {
  id: string;
  game_id: number;
  name: string;
  short_description: string;
  about_the_game: string;
  header_image: string;
  release_date: string;
  supported_languages: string[];
  full_audio_languages: string[];
  publishers: string[];
  categories: string[];
  genres: string[];
  screenshots: string[];
  tags: string[];
  operational_systems: string[];
}

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`/games/${id}`);
        setGame(res.data);

        // Verifica se o jogo está nos favoritos
        try {
          await api.get(`/games/favorite/${res.data.game_id}`);
          setFavorited(true);
        } catch (err: any) {
          if (err.response && err.response.status === 404) {
            setFavorited(false); // não está favoritado
          } else {
            console.error("Erro ao verificar favoritos:", err);
          }
        }

      } catch (error) {
        console.error("Erro ao buscar detalhes do jogo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!game) return;
    try {
      await api.post('/games/favorite', {
        name: game.name,
        game_id: game.game_id,
        header_image: game.header_image,
        short_description: game.short_description,
        release_date: game.release_date.split('T')[0] // Formata para "YYYY-MM-DD"
      });
      setFavorited(true);
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando...</p>;
  if (!game) return <p style={{ textAlign: 'center' }}>Jogo não encontrado.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>{game.name}</h2>
      <img src={game.header_image} alt={game.name} style={{ width: '100%', borderRadius: 12 }} />
      <p><strong>Data de lançamento:</strong> {new Date(game.release_date).toLocaleDateString()}</p>
      <p><strong>Sobre:</strong> {game.about_the_game}</p>
      <p><strong>Gêneros:</strong> {game.genres.join(', ')}</p>
      <p><strong>Idiomas:</strong> {game.supported_languages.join(', ')}</p>
      <p><strong>Tags:</strong> {game.tags.join(', ')}</p>

      {/* Botões */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button
          onClick={() => navigate('/recommendation')}
          style={{
            backgroundColor: '#ccc',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Voltar
        </button>

        <button
          onClick={() => window.open(`https://store.steampowered.com/app/${game.game_id}`, '_blank')}
          style={{
            backgroundColor: '#59B2FF',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ver na Steam
        </button>

{favorited ? (
  <button
    onClick={async () => {
      if (!game) return;
      try {
        await api.delete(`/games/favorite/${game.game_id}`);
        setFavorited(false);
      } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
      }
    }}
    style={{
      backgroundColor: '#FF4D4D',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    Remover dos Favoritos
  </button>
) : (
  <button
    onClick={handleAddToFavorites}
    style={{
      backgroundColor: '#2C003E',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    Adicionar aos Favoritos
  </button>
)}

      </div>

      {/* Screenshots */}
      <div style={{ marginTop: 30 }}>
        <h4>Screenshots</h4>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
          {game.screenshots.map((s, i) => (
            <img key={i} src={s} alt={`screenshot-${i}`} style={{ width: 200, borderRadius: 8 }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
