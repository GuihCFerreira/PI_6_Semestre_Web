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
      <div className="flex justify-center items-center h-full text-[#2C003E] font-semibold text-xl">
        Carregando seus jogos favoritos...
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-[#2C003E] text-lg">
        Você ainda não favoritou nenhum jogo.
      </div>
    );
  }

  return (
    <div className="bg-[#FCFCFC] h-full flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2C003E]">Seus Jogos Favoritos</h1>
        <button
          onClick={() => navigate('/profile')}
          className="bg-[#59B2FF] hover:bg-[#3a9ee7] text-white font-semibold px-4 py-2 rounded-xl transition"
        >
          Voltar para o Perfil
        </button>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {games.map((game) => (
          <div
            key={game.id}
            className="flex bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 cursor-pointer"
            onClick={() => navigate(`/game/${game.game_id}`)}
          >
            <img
              src={game.header_image}
              alt={game.name}
              className="w-48 h-28 object-cover rounded-xl mr-4"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-xl font-bold text-[#2C003E]">{game.name}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{game.short_description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  Lançamento: {new Date(game.release_date).toLocaleDateString()}
                </span>
                <Heart className="text-[#FF4D4D] w-5 h-5 fill-[#FF4D4D]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteGamesPage;
