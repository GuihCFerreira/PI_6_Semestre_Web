import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://iplay-dte2ffd6aghdd2cx.brazilsouth-01.azurewebsites.net/quiz";

const QuizForm: React.FC = () => {
  const [formData, setFormData] = useState({
    FAVORITE_GAMES: [""],
    OPERATIONAL_SYSTEMS: "",
    GAME_LANGUAGE: "",
    GENRES: [],
    CATEGORIES: [],
    STYLE: [],
    CAMERA: [],
    MODE: "",
    PUBLISHERS: [],
  });

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "FAVORITE_GAMES" || name === "GENRES" || name === "CATEGORIES" || name === "PUBLISHERS") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((v) => v.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.FAVORITE_GAMES.length < 3 ||
      !formData.OPERATIONAL_SYSTEMS ||
      !formData.GAME_LANGUAGE
    ) {
      setError("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    try {
      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Quiz enviado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar quiz. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Responda ao Quiz</h2>

      <label>Jogos que você gosta (mínimo 3, separados por vírgula):</label>
      <input name="FAVORITE_GAMES" onChange={handleChange} className="input" />

      <label>Sistema Operacional:</label>
      <select name="OPERATIONAL_SYSTEMS" onChange={handleChange} className="input">
        <option value="">Selecione</option>
        <option value="Windows">Windows</option>
        <option value="Linux">Linux</option>
        <option value="Mac">Mac</option>
      </select>

      <label>Linguagem preferida do jogo:</label>
      <select name="GAME_LANGUAGE" onChange={handleChange} className="input">
        <option value="">Selecione</option>
        <option value="Português">Português</option>
        <option value="Outras">Outras</option>
      </select>

      <label>Gêneros favoritos (mínimo 3, separados por vírgula):</label>
      <input name="GENRES" onChange={handleChange} className="input" />

      <label>Categorias (opcional):</label>
      <input name="CATEGORIES" onChange={handleChange} className="input" />

      <label>Tags dos games (opcional):</label>
      <input name="STYLE" onChange={handleChange} className="input" />

      <label>Desenvolvedoras (opcional):</label>
      <input name="PUBLISHERS" onChange={handleChange} className="input" />

      <label>Modo de jogo preferido:</label>
      <select name="MODE" onChange={handleChange} className="input">
        <option value="">Selecione</option>
        <option value="Single Player">Single Player</option>
        <option value="Multiplayer">Multiplayer</option>
        <option value="PVP">PVP</option>
        <option value="COOP">COOP</option>
        <option value="MMO">MMO</option>
        <option value="Qualquer um">Qualquer um</option>
      </select>

      <label>Perspectiva da câmera (opcional):</label>
      <select name="CAMERA" onChange={handleChange} className="input">
        <option value="">Selecione</option>
        <option value="2D">2D</option>
        <option value="3D">3D</option>
        <option value="Primeira Pessoa">Primeira Pessoa</option>
        <option value="Terceira Pessoa">Terceira Pessoa</option>
        <option value="Top-Down">Top-Down</option>
        <option value="Qualquer">Qualquer</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="mt-4 bg-[#2C003E] text-white px-4 py-2 rounded">
        Enviar Quiz
      </button>
    </form>
  );
};

export default QuizForm;
