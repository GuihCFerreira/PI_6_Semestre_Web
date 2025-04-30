// src/components/GameCard.tsx
import { FC } from 'react';

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
}

const GameCard: FC<{ game: Game }> = ({ game }) => {
  return (
    <div>
      <img src={game.image} alt={game.name} width={150} />
      <h2>{game.name}</h2>
      <p>{game.description}</p>
    </div>
  );
};

export default GameCard;
