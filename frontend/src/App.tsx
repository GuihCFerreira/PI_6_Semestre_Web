import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Quiz from "./pages/Quiz";
import Recommendation from "./pages/Recommendation";
import { useAuth } from "./services/AuthContext";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Redirecionamento automático com base na autenticação */}
      <Route path="/" element={<Navigate to={token ? "/profile" : "/login"} />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/recommendation" element={<Recommendation />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
