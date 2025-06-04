import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Quiz from "./pages/Quiz";
import Recommendation from "./pages/Recommendation";
import { useAuth } from "./services/AuthContext";
import SidebarLayout from "./components/SidebarLayout";

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Redirecionamento automático com base na autenticação */}
      <Route path="/" element={<Navigate to={token ? "/profile" : "/login"} />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas privadas com layout */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          }
        />
        <Route
          path="/quiz"
          element={
            <SidebarLayout>
              <Quiz />
            </SidebarLayout>
          }
        />
        <Route
          path="/recommendation"
          element={
            <SidebarLayout>
              <Recommendation />
            </SidebarLayout>
          }
        />
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
