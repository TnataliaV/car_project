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

SELECT * FROM cars;
