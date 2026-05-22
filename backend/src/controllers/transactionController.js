import pool from "../config/db.js";

// Criar transação
export const createTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO transactions (user_id, title, amount, type, category, date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [user_id, title, amount, type, category, date],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

// Listar transações do usuário
export const getTransactions = async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC`,
      [user_id],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

// Deletar transação
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transação não encontrada!" });
    }

    res.json({ message: "Transação deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};
