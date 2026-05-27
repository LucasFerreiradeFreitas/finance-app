import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);
      login(response.data.user, response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Entrar</h1>
          <p className="text-sm mt-1" style={{ color: "#888" }}>
            Acesse sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm" style={{ color: "#888" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              className="px-4 py-3 rounded-lg text-sm text-white outline-none transition-colors"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm" style={{ color: "#888" }}>
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="px-4 py-3 rounded-lg text-sm text-white outline-none transition-colors"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
              }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: "#f87171" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3 rounded-lg text-sm font-medium transition-opacity"
            style={{
              backgroundColor: "#ffffff",
              color: "#0f0f0f",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: "#888" }}>
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-white hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
