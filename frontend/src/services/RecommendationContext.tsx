import React, { createContext, useContext, useState } from 'react';

interface Recommendation {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  description: string;
  // Adicione outros campos conforme necessário
}

interface RecommendationContextProps {
  recommendations: Recommendation[]; // Lista de recomendações de jogos
  setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
  fetchRecommendations: () => void;
  getRecommendedGame: () => Recommendation | undefined; // Função para obter um jogo recomendado específico
}

const RecommendationContext = createContext<RecommendationContextProps | undefined>(undefined);

export const RecommendationProvider = ({ children }: { children: React.ReactNode }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('https://iplay-dte2ffd6aghdd2cx.brazilsouth-01.azurewebsites.net/recommendation');
      if (!response.ok) {
        throw new Error('Erro ao buscar recomendações');
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Erro ao buscar recomendações:', error);
    }
  };

  const getRecommendedGame = (): Recommendation | undefined => {
    // Aqui você pode adicionar lógica para retornar um jogo recomendado específico
    return recommendations.length > 0 ? recommendations[0] : undefined;
  };

  return (
    <RecommendationContext.Provider value={{ recommendations, setRecommendations, fetchRecommendations, getRecommendedGame }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
};
