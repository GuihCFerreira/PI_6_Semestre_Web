import React, { useEffect } from 'react';
import { useRecommendation } from '../services/RecommendationContext';

const Recommendation = () => {
  const { recommendations, fetchRecommendations, getRecommendedGame } = useRecommendation();

  useEffect(() => {
    // Buscar recomendações quando o componente for montado
    fetchRecommendations();
  }, [fetchRecommendations]);

  const recommendedGame = getRecommendedGame();

  return (
    <div className="recommendation-page">
      <h2>Jogo Recomendado</h2>

      {recommendedGame ? (
        <div className="recommended-game">
          <img src={recommendedGame.imageUrl} alt={recommendedGame.name} />
          <h3>{recommendedGame.name}</h3>
          <p>{recommendedGame.genre}</p>
          <p>{recommendedGame.description}</p>
          <button>Ver Detalhes</button>
        </div>
      ) : (
        <p>Carregando recomendações...</p>
      )}

      <div className="other-recommendations">
        <h3>Outros Jogos Recomendados</h3>
        <ul>
          {recommendations.map((game, index) => (
            <li key={index}>
              <div>
                <img src={game.imageUrl} alt={game.name} />
                <h4>{game.name}</h4>
                <p>{game.genre}</p>
                <button>Ver Detalhes</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommendation;
