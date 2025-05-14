import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Main.scss';

import { getCars } from '../../api';
import axios from 'axios';

import image1 from '../../assets/img/image-1.png';
import image2 from '../../assets/img/image-2.png';
import image3 from '../../assets/img/image-3.png';
import image4 from '../../assets/img/image-4.png';
import image5 from '../../assets/img/image-5.png';
import image6 from '../../assets/img/image-6.png';

const Main = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  });

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        // Попробуем получить данные о популярных автомобилях
        const response = await getCars();
        console.log('Received popular cars:', response.data); // Логирование успешного ответа
        setPopularCars(response.data);
      } catch (error) {
        // Если ошибка, выводим больше информации в консоль
        console.error('Error fetching popular cars:', error.response ? error.response.data : error.message);
        alert('Ошибка при получении популярных автомобилей');
      }
    };

    fetchPopularCars();
  }, []);

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/applications', applicationForm);
      alert('Ваш вопрос успешно отправлен!');
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        question: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Произошла ошибка при отправке вопроса');
    }
  };

  return (
    <>
      <Header />

      <section id="cover" className="cover">
        <div className="container">
          <div className="heroContent">
            <h1>Luxury cars</h1>
            <p>Аренда элитных автомобилей в Сочи</p>
            <Link to="/catalog" className="ctaButton">
              Каталог автомобилей
            </Link>
          </div>
        </div>
      </section>

      <section id="about_Us" className="aboutUs">
        <div className="container">
          <h2>О НАС</h2>
          <p>Собственный автопарк «Luxury cars» представлен коллекцией элитных автомобилей...</p>
          <ul>
            <li>Выбрать марку престижного автомобиля по вашему желанию</li>
            <li>Быстро оформить заявку и договор аренды автомобиля в Сочи</li>
            <li>Получить все необходимые консультации по вопросам проката</li>
          </ul>
        </div>
      </section>

      <section id="popular" className="popular">
        <div className="container">
          <h2>ПОПУЛЯРНЫЕ АВТОМОБИЛИ</h2>
          <div className="carGrid">
            {popularCars.length > 0 ? (
              popularCars.map((car, index) => (
                <Link key={car.id} to={`/car/${car.id}`} className="carItem">
                  <img
                    src={require(`../../assets/img/image-${index + 1}.png`)}
                    alt={car.model}
                    className="carImage"
                  />
                  <h3>{car.model}</h3>
                  <p>{car.price}</p>
                </Link>
              ))
            ) : (
              <p>Загружаем автомобили...</p>
            )}
          </div>
          <Link to="/catalog" className="viewAllButton">
            Показать все автомобили
          </Link>
        </div>
      </section>

      <section id="questions" className="questions">
        <div className="container">
          <h2>У ВАС ОСТАЛИСЬ ВОПРОСЫ?</h2>
          <p>Оставьте заявку, мы свяжемся с вами и ответим на них</p>
          <form onSubmit={handleApplicationSubmit}>
            <div className="formRow">
              <input
                type="text"
                name="name"
                value={applicationForm.name}
                onChange={handleApplicationChange}
                placeholder="Ваше имя"
                required
                className="formInput"
              />
              <input
                type="email"
                name="email"
                value={applicationForm.email}
                onChange={handleApplicationChange}
                placeholder="E-mail"
                required
                className="formInput"
              />
              <input
                type="tel"
                name="phone"
                value={applicationForm.phone}
                onChange={handleApplicationChange}
                placeholder="Телефон"
                className="formInput"
              />
            </div>
            <textarea
              name="question"
              value={applicationForm.question}
              onChange={handleApplicationChange}
              placeholder="Опишите проблему"
              required
              className="formTextarea"
            ></textarea>
            <button type="submit" className="submitButton">
              Оставить заявку
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Main;
