import express from "express";
import pool from "../db";
import cors from "cors";

import process from "node:process";
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
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
  try {
    const result = await pool.query("SELECT * FROM ALARMS");
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/alarms", async (req, res) => {
  const { time, text } = req.body;

  if (!time || !text) {
    return res.status(400).json({
      error: "time и text обязательны",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO alarms (time, text) VALUES ($1, $2) RETURNING *",
      [time, text],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/alarms/:id", async (req, res) => {
  const { id } = req.params;
  const { time, text } = req.body;

  try {
    const result = await pool.query(
      "UPDATE ALARMS SET time =$1, text=$2 where id = $3 RETURNING *",
      [time, text, id],
    );
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/alarms/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM alarms where id = $1", [id]);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/alarms/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM alarms where id = $1", [id]);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
export default app