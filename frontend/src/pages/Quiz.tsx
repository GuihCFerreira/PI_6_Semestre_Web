import React, { useState } from 'react';
import { useQuiz } from '../services/QuizContext';

const Quiz = () => {
  const { submitQuiz } = useQuiz();
  
  // Estados para armazenar as respostas do quiz
  const [favoriteGames, setFavoriteGames] = useState<string>('');
  const [operatingSystem, setOperatingSystem] = useState<string>('');
  const [gameLanguage, setGameLanguage] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [categories, setCategories] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [developers, setDevelopers] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [camera, setCamera] = useState<string>('');
  const [graphicStyle, setGraphicStyle] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Organizando os dados do quiz para envio
    const quizData = {
      FAVORITE_GAMES: favoriteGames.split(','),
      OPERATIONAL_SYSTEMS: [operatingSystem],
      GAME_LANGUAGE: gameLanguage,
      GENRES: genres.split(','),
      CATEGORIES: categories.split(','),
      MODE: style,
      CAMERA: camera,
      STYLE: graphicStyle,
      PUBLISHERS: developers.split(','),
    };

    // Enviar os dados do quiz usando o contexto
    submitQuiz(quizData);

    // Exibir sucesso ou outra lógica pós-submissão
    alert('Quiz enviado com sucesso!');
  };

  return (
    <div className="quiz-form">
      <h2>Quiz de Preferências de Jogo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jogos Favoritos (separe por vírgula):</label>
          <input
            type="text"
            value={favoriteGames}
            onChange={(e) => setFavoriteGames(e.target.value)}
          />
        </div>

        <div>
          <label>Sistema Operacional:</label>
          <select
            value={operatingSystem}
            onChange={(e) => setOperatingSystem(e.target.value)}
          >
            <option value="Windows">Windows</option>
            <option value="Mac">Mac</option>
            <option value="Linux">Linux</option>
          </select>
        </div>

        <div>
          <label>Idioma do Jogo:</label>
          <select
            value={gameLanguage}
            onChange={(e) => setGameLanguage(e.target.value)}
          >
            <option value="Portuguese">Português</option>
            <option value="Other">Outro</option>
          </select>
        </div>

        <div>
          <label>Gêneros Favoritos (separe por vírgula):</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        </div>

        <div>
          <label>Categorias (opcional, separe por vírgula):</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>

        <div>
          <label>Tags dos Jogos (opcional, separe por vírgula):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label>Desenvolvedoras de Jogos (opcional, separe por vírgula):</label>
          <input
            type="text"
            value={developers}
            onChange={(e) => setDevelopers(e.target.value)}
          />
        </div>

        <div>
          <label>Estilo de Jogo:</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="Single Player">Single Player</option>
            <option value="MultiPlayer">MultiPlayer</option>
            <option value="PVP">PVP</option>
            <option value="COOP">COOP</option>
            <option value="MMO">MMO</option>
            <option value="Any">Qualquer um</option>
          </select>
        </div>

        <div>
          <label>Perspectiva de Câmera (opcional):</label>
          <select
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="First Person">Primeira Pessoa</option>
            <option value="Third Person">Terceira Pessoa</option>
            <option value="Top-Down">Top-Down</option>
            <option value="Any">Qualquer</option>
          </select>
        </div>

        <div>
          <label>Estilo de Gráfico (opcional):</label>
          <select
            value={graphicStyle}
            onChange={(e) => setGraphicStyle(e.target.value)}
          >
            <option value="Realistic">Realista</option>
            <option value="Pixelated">Pixelado / Retro</option>
            <option value="Cartoonish">Estilizado / Cartunescos</option>
            <option value="Minimalistic">Minimalista</option>
            <option value="Any">Qualquer um</option>
          </select>
        </div>

        <button type="submit">Enviar Quiz</button>
      </form>
    </div>
  );
};

export default Quiz;
