// src/components/Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");  // Redireciona para login se não houver token
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://iplay-dte2ffd6aghdd2cx.brazilsouth-01.azurewebsites.net/user/1", // Substitua 1 pelo id correto
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        setError("Não foi possível carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {user ? (
        <div>
          <h2 className="text-2xl mb-4">Perfil de {user.name}</h2>
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-secondary text-white p-2 rounded-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Profile;
