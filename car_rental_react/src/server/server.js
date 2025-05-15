// import express from 'express'; // Импортируем express
// import { Pool } from 'pg';      // Импортируем Pool из pg
// import cors from 'cors';        // Импортируем cors для разрешения кросс-доменных запросов
// import dotenv from 'dotenv';    // Для работы с переменными окружения

// dotenv.config(); // Загружаем переменные окружения из .env

// const app = express(); // Создаем экземпляр приложения Express
// const port = process.env.PORT || 5000;

// // Подключаем middleware
// app.use(cors());  // Включаем поддержку CORS
// app.use(express.json()); // Для парсинга JSON в теле запросов

// // Настроим подключение к базе данных
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
// });

// // Пример маршрута для получения данных
// app.get('/api/cars', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM cars');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     res.status(500).send('Ошибка при запросе автомобилей');
//   }
// });
// console.log("PG_USER:", process.env.PG_USER);
// console.log("PG_PASSWORD:", process.env.PG_PASSWORD);
// console.log("PG_HOST:", process.env.PG_HOST);
// console.log("PG_PORT:", process.env.PG_PORT);
// console.log("PG_DATABASE:", process.env.PG_DATABASE);


// // Запуск сервера
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });







import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Routes
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

app.post('/api/bookings', async (req, res) => {
  try {
    const { car_id, name, phone, start_date, end_date } = req.body;
    const result = await pool.query(
      'INSERT INTO booking (car_id, client_name, client_phone, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [car_id, name, phone, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Ошибка при создании бронирования');
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const { name, phone, question } = req.body;
    const result = await pool.query(
      'INSERT INTO application (client_name, client_phone, question) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, question]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).send('Ошибка при создании заявки');
  }
});

// Debug logs
console.log("PG_USER:", process.env.PG_USER);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_PORT:", process.env.PG_PORT);
console.log("PG_DATABASE:", process.env.PG_DATABASE);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});