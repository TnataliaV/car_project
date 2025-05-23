import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

app.get('/api/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM car');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).send('Ошибка при запросе автомобилей');
  }
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM car WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Автомобиль не найден');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).send('Ошибка при запросе автомобиля');
  }
});

console.log("PG_USER:", process.env.PG_USER);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_PORT:", process.env.PG_PORT);
console.log("PG_DATABASE:", process.env.PG_DATABASE);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});