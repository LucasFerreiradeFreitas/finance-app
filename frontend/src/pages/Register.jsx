import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Criar conta</h1>
          <p className="text-sm mt-1" style={{ color: "#888" }}>
            Preencha os dados para se cadastrar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm" style={{ color: "#888" }}>
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
              className="px-4 py-3 rounded-lg text-sm text-white outline-none"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
              }}
            />
          </div>

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
              className="px-4 py-3 rounded-lg text-sm text-white outline-none"
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
              className="px-4 py-3 rounded-lg text-sm text-white outline-none"
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
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: "#888" }}>
          Já tem conta?{" "}
          <Link to="/login" className="text-white hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
