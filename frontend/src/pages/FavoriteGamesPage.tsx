import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Heart } from 'lucide-react';

interface FavoriteGame {
  id: string;
  user_id: string;
  game_id: number;
  name: string;
  header_image: string;
  short_description: string;
  release_date: string;
}

const FavoriteGamesPage = () => {
  const [games, setGames] = useState<FavoriteGame[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get('/games/favorite');
        setGames(res.data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full mt-12 text-[#2C003E] font-semibold">
        Carregando favoritos...
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex justify-center items-center h-full mt-12 text-gray-500">
        Nenhum jogo favoritado ainda.
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FCFCFC] min-h-screen">
      <h2 className="text-3xl font-bold text-[#2C003E] mb-6">🎮 Meus Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map(game => (
          <div
            key={game.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigate(`/game/${game.game_id}`)}
          >
            <div className="relative">
              <img
                src={game.header_image}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                <Heart className="text-red-500 w-5 h-5 fill-red-500" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#2C003E] truncate">{game.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {game.short_description}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Lançado em: {new Date(game.release_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteGamesPage;
