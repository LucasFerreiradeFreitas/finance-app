import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", form);
      setForm({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });
      setShowForm(false);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("pt-BR");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0f0f" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid #2a2a2a" }}
      >
        <span className="text-sm font-medium text-white">Finance</span>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "#888" }}>
            {user?.name}
          </span>
          <button
            onClick={logout}
            className="text-sm transition-colors"
            style={{ color: "#888" }}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Saldo", value: balance, color: "#ededed" },
            { label: "Receitas", value: totalIncome, color: "#4ade80" },
            { label: "Despesas", value: totalExpense, color: "#f87171" },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-lg p-4 flex flex-col gap-1"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
              }}
            >
              <span className="text-xs" style={{ color: "#888" }}>
                {card.label}
              </span>
              <span
                className="text-lg font-semibold"
                style={{ color: card.color }}
              >
                {formatCurrency(card.value)}
              </span>
            </div>
          ))}
        </div>

        {/* Botão nova transação */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">Transacoes</span>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm px-4 py-2 rounded-lg transition-opacity"
            style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}
          >
            {showForm ? "Cancelar" : "Nova transacao"}
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="rounded-lg p-4 flex flex-col gap-3"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: "#888" }}>
                  Titulo
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ex: Salario"
                  required
                  className="px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: "#888" }}>
                  Valor
                </label>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: "#888" }}>
                  Tipo
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                  }}
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: "#888" }}>
                  Categoria
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Ex: Trabalho"
                  required
                  className="px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-xs" style={{ color: "#888" }}>
                  Data
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #2a2a2a",
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="py-2 rounded-lg text-sm font-medium mt-1"
              style={{ backgroundColor: "#ffffff", color: "#0f0f0f" }}
            >
              Salvar
            </button>
          </form>
        )}

        {/* Lista de transações */}
        <div className="flex flex-col gap-2">
          {loading ? (
            <p className="text-sm" style={{ color: "#888" }}>
              Carregando...
            </p>
          ) : transactions.length === 0 ? (
            <p className="text-sm" style={{ color: "#888" }}>
              Nenhuma transacao encontrada.
            </p>
          ) : (
            transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-white">{t.title}</span>
                  <span className="text-xs" style={{ color: "#888" }}>
                    {t.category} - {formatDate(t.date)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: t.type === "income" ? "#4ade80" : "#f87171",
                    }}
                  >
                    {t.type === "income" ? "+" : "-"}{" "}
                    {formatCurrency(parseFloat(t.amount))}
                  </span>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-xs transition-colors"
                    style={{ color: "#888" }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
