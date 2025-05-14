import express from 'express'; // Импортируем express
import { Pool } from 'pg';      // Импортируем Pool из pg
import cors from 'cors';        // Импортируем cors для разрешения кросс-доменных запросов
import dotenv from 'dotenv';    // Для работы с переменными окружения

dotenv.config(); // Загружаем переменные окружения из .env

const app = express(); // Создаем экземпляр приложения Express
const port = process.env.PORT || 5000;

// Подключаем middleware
app.use(cors());  // Включаем поддержку CORS
app.use(express.json()); // Для парсинга JSON в теле запросов

// Настроим подключение к базе данных
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Пример маршрута для получения данных
app.get('/api/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).send('Ошибка при запросе автомобилей');
  }
});
console.log("PG_USER:", process.env.PG_USER);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_PORT:", process.env.PG_PORT);
console.log("PG_DATABASE:", process.env.PG_DATABASE);


// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

