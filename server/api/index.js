import express from "express";
import pool from "../db.js";
import cors from "cors";
import process from "node:process";

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-user-id"],
  }),
);
app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database:", res.rows);
  }
});

app.get("/api/alarms", async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ error: "user id required" });

  try {
    const result = await pool.query("SELECT * FROM alarms WHERE user_id = $1", [
      userId,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/alarms", async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ error: "user id required" });

  const { time, text } = req.body;
  if (!time || !text) {
    return res.status(400).json({
      error: "time и text обязательны",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO alarms (user_id, time, text) VALUES ($1, $2, $3) RETURNING *",
      [userId, time, text],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/alarms/:id", async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ error: "user id required" });

  const { id } = req.params;
  const { time, text } = req.body;

  if (!time || !text) {
    return res.status(400).json({
      error: "time и text обязательны",
    });
  }

  try {
    const result = await pool.query(
      "UPDATE alarms SET time = $1, text = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [time, text, id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Alarm not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/alarms/:id", async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ error: "user id required" });

  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM alarms WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Alarm not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/alarms/:id", async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ error: "user id required" });

  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM alarms WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Alarm not found" });
    }

    res.status(200).json({ message: "Alarm deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
export default app;
