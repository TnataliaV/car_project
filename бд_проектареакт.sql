CREATE DATABASE luxury_cars;

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    tank_capacity FLOAT NOT NULL,
    horsepower INTEGER NOT NULL,
    drive_type VARCHAR(50) NOT NULL,
    price VARCHAR(150) NOT NULL
);

CREATE TABLE booking (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES cars(id),
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20) NOT NULL UNIQUE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE application (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(100) not null,
    client_phone VARCHAR(20) NOT NULL UNIQUE,
    question TEXT NOT NULL,
    sending_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cars VALUES (1, 'Mercedes CLS 450 4matic', 'image-1.png', 3.0, 367, 'полный', 'от 12.000 ₽ до 19.000 ₽');

INSERT INTO cars VALUES (2, 'BMW X5', 'image-1.png', 4.0, 350, 'полный', 'от 14.000 ₽ до 20.000 ₽', 'premium'),
(3, 'Audi A8', 'image-1.png', 3.0, 455, 'передний', 'от 25.000 ₽ до 35.000 ₽', 'sports'),
(4, 'Porsche 911', 'image-1.png', 0, 279, 'полный', 'от 18.000 ₽ до 25.000 ₽', 'electric'),
(5, 'Tesla Model S', 'image-1.png', 3.0, 343, 'передний', 'от 20.000 ₽ до 30.000 ₽', 'convertible'),
(6, 'Mercedes S-Class Cabrio', 'image-1.png', 5.0, 320, 'задний', 'от 15.000 ₽ до 22.000 ₽', 'suv');


CREATE TABLE rental_rates (
  id SERIAL PRIMARY KEY,
  car_id INTEGER REFERENCES cars(id),
  price_1hour VARCHAR(50) NOT NULL,
  price_3hour VARCHAR(50) NOT NULL,
  price_halfday VARCHAR(50) NOT NULL,
  price_1day VARCHAR(50) NOT NULL,
  price_with_driver VARCHAR(50) NOT NULL,
  price_for_wedding VARCHAR(50) NOT NULL,
  price_photoshoots VARCHAR(50) NOT NULL,
);

INSERT INTO rental_rates VALUES (1, 1, '14.000 ₽', '16.000 ₽', '19.000 ₽', '17.000 ₽', '+3.000 ₽', '18.000 ₽', '12.000 ₽'),
(2, 2, '15.000 ₽', '17.000 ₽', '20.000 ₽', '18.000 ₽', '+3.500 ₽', '19.000 ₽', '13.000 ₽'),
(3, 3, '18.000 ₽', '20.000 ₽', '23.000 ₽', '21.000 ₽', '+4.000 ₽', '22.000 ₽', '15.000 ₽'),
(4, 4, '22.000 ₽', '24.000 ₽', '27.000 ₽', '25.000 ₽', '+5.000 ₽', '26.000 ₽', '18.000 ₽'),
(5, 5, '16.000 ₽', '18.000 ₽', '21.000 ₽', '19.000 ₽', '+4.000 ₽', '20.000 ₽', '14.000 ₽'),
(6, 6, '17.000 ₽', '19.000 ₽', '22.000 ₽', '20.000 ₽', '+4.500 ₽', '21.000 ₽', '15.000 ₽');