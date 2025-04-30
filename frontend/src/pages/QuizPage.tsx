import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
  const [favoriteGames, setFavoriteGames] = useState('');
  const [operatingSystem, setOperatingSystem] = useState('');
  const [gameLanguage, setGameLanguage] = useState('Português');

  const [genres, setGenres] = useState('');
  const [mode, setMode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado');
      return;
    }

    try {
      const body = {
        FAVORITE_GAMES: favoriteGames.split(',').map(game => game.trim()),
        OPERATIONAL_SYSTEMS: [operatingSystem],
        GAME_LANGUAGE: gameLanguage,
        GENRES: genres ? genres.split(',').map(g => g.trim()) : [],
        MODE: mode ? [mode] : [],
      };

      await api.post('/quiz', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Quiz enviado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar quiz.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Responder Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>3 a 5 jogos que você gosta (separados por vírgula)</label><br />
          <input
            value={favoriteGames}
            onChange={e => setFavoriteGames(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Sistema Operacional</label><br />
          <select value={operatingSystem} onChange={e => setOperatingSystem(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
            <option value="Mac">Mac</option>
          </select>
        </div>

        <div>
          <label>Linguagem do Jogo</label><br />
          <select value={gameLanguage} onChange={e => setGameLanguage(e.target.value)} required>
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
            <option value="Espanhol">Espanhol</option>
          </select>
        </div>

        <div>
          <label>Gêneros favoritos (opcional)</label><br />
          <input
            value={genres}
            onChange={e => setGenres(e.target.value)}
            placeholder="Ex: RPG, Ação"
          />
        </div>

        <div>
          <label>Estilo de jogo preferido (opcional)</label><br />
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="">Qualquer um</option>
            <option value="SinglePlayer">Single Player</option>
            <option value="MultiPlayer">Multiplayer</option>
            <option value="PVP">PVP</option>
            <option value="COOP">COOP</option>
            <option value="MMO">MMO</option>
          </select>
        </div>

        <br />
        <button type="submit">Enviar Quiz</button>
      </form>
    </div>
  );
}
