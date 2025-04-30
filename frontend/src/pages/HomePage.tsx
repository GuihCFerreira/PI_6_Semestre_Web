// src/components/HomePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import GameCard from './GameCard';

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [usedSuggestions, setUsedSuggestions] = useState(0);
  const maxSuggestions = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data: lastQuiz } = await api.get('/quiz/user/last');
        const response = await api.get('/games/suggestions', {
          params: { quizId: lastQuiz.id },
        });
        setGames(response.data);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    };

    fetchGames();
  }, []);

  const handleNextSuggestion = () => {
    if (usedSuggestions < maxSuggestions) {
      setUsedSuggestions(usedSuggestions + 1);
      // Lógica para carregar a próxima sugestão
    } else {
      alert('Você atingiu o limite de sugestões diárias.');
    }
  };

  return (
    <div>
      <h1>Recomendações de Jogos</h1>
      {games.length > 0 ? (
        <div>
          <GameCard game={games[0]} />
          <button onClick={handleNextSuggestion}>Sugerir Outro</button>
        </div>
      ) : (
        <p>Carregando jogos...</p>
      )}
    </div>
  );
}
