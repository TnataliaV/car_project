import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.scss';
import { getCars } from '../../api';
import { supabase } from '../../App';

// Импортируем все изображения
import heroBg from '../../assets/img/главная_машина.png';
import car1 from '../../assets/img/image-1.png';
import car2 from '../../assets/img/image-2.png';
import car3 from '../../assets/img/image-3.png';
import car4 from '../../assets/img/image-4.png';
import car5 from '../../assets/img/image-5.png';
import car6 from '../../assets/img/image-6.png';
import licenseIcon from '../../assets/img/права.png';
import experienceIcon from '../../assets/img/стаж.png';
import docsIcon from '../../assets/img/документы.png';
import questionBg from '../../assets/img/машина_б.png';
import mapBg from '../../assets/img/карта.png';
import socialIcons from '../../assets/img/соц.сети.png';

const Main = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const response = await getCars();
        setPopularCars(response.data);
      } catch (error) {
        console.error('Error fetching popular cars:', error);
        // Заглушка для демонстрации
        setPopularCars([
          { id: 1, image: car1 },
          { id: 2, image: car2 },
          { id: 3, image: car3 },
          { id: 4, image: car4 },
          { id: 5, image: car5 },
          { id: 6, image: car6 },
        ]);
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
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('application')
        .insert([
          {
            client_name: applicationForm.name,
            client_phone: applicationForm.phone,
            client_email: applicationForm.email,
            question: applicationForm.question
          }
        ]);
      
      if (error) throw error;
      
      alert('Ваш вопрос успешно отправлен!');
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        question: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Произошла ошибка при отправке вопроса: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="cover" className="cover" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="container">
          <div className="coverDescription">
            <h1>Luxury cars</h1>
            <p className="desktop-only">Аренда элитных автомобилей в Сочи</p>
            <Link to="/catalog" className="cta-button">
              Каталог автомобилей
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about_Us" className="aboutUs">
        <div className="container">
          <h2>О НАС</h2>
          <p>Собственный автопарк «Luxury cars» представлен коллекцией элитных автомобилей. Вы можете оформить
            услугу<br />
            проката авто люкс класса за считанные минуты и уже в течение часа оказаться за рулем одного из наших
            красавцев.</p>
          <p>Для тех, кто знает цену подлинному комфорту, компания «Luxury cars» предлагает услугу проката
            эксклюзивных<br />
            автомобилей в Сочи на самых привлекательных условиях!</p>
          <p>Уже сегодня мы предоставим вам все возможности для быстрого оформления аренды автомобиля
            премиум-класса.<br />
            Вы сможете:</p>
          <ul>
            <li>Выбрать марку престижного автомобиля по вашему желанию</li>
            <li>Быстро оформить заявку и договор аренды автомобиля в Сочи</li>
            <li>Получить все необходимые консультации по вопросам проката</li>
          </ul>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section id="popular" className="popular">
        <div className="container">
          <h2>ПОПУЛЯРНЫЕ АВТОМОБИЛИ</h2>
          <div className="carGrid">
            {popularCars.length > 0 ? (
              popularCars.map((car) => (
                <Link key={car.id} to={`/car/${car.id}`} className="carItem">
                  <img
                    src={car.image}
                    className="carImage"
                    alt={`Автомобиль ${car.id}`}
                  />
                </Link>
              ))
            ) : (
              <p>Загружаем автомобили...</p>
            )}
          </div>
          <div className="viewAllButton">
            <Link to="/catalog" className="cta-button">
              Показать все автомобили
            </Link>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="conditions">
        <div className="container">
          <h2>УСЛОВИЯ АРЕНДЫ</h2>
          <div className="conditions-cards">
            <div className="condition-card">
              <div className="icon"><img src={licenseIcon} alt="Права" /></div>
              <h4>Права</h4>
              <p>Наличие прав категории В</p>
            </div>
            <div className="condition-card central">
              <div className="icon"><img src={experienceIcon} alt="Стаж" /></div>
              <h4>Стаж работы</h4>
              <p>Не менее 3 лет</p>
            </div>
            <div className="condition-card">
              <div className="icon"><img src={docsIcon} alt="Документы" /></div>
              <h4>Документы</h4>
              <p>Паспорт РФ и водительское<br />удостоверение</p>
            </div>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section id="questions" className="questions" style={{ backgroundImage: `url(${questionBg})` }}>
        <div className="container">
          <div className="questions-desc">
            <h2>У ВАС ОСТАЛИСЬ ВОПРОСЫ?</h2>
            <p className="q-desktop-p">Оставьте заявку, мы свяжемся с вами и ответим на них</p>
          </div>
          <form onSubmit={handleApplicationSubmit} className="question-form">
            <div className="form-flex">
              <div className="inputs">
                <input
                  type="text"
                  name="name"
                  value={applicationForm.name}
                  onChange={handleApplicationChange}
                  placeholder="Ваше имя"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleApplicationChange}
                  placeholder="E-mail"
                />
                <input
                  type="tel"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleApplicationChange}
                  placeholder="Телефон"
                  required
                />
              </div>
              <textarea
                name="question"
                value={applicationForm.question}
                onChange={handleApplicationChange}
                placeholder="Опишите проблему"
                required
              ></textarea>
            </div>
            <div className="application">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="contacts" style={{ backgroundImage: `url(${mapBg})` }}>
        <div className="container">
          <div className="contacts-block">
            <h2>Контакты</h2>
            <ul>
              <li>Сочи. Россия</li>
              <li>+7 923 617 56 41</li>
              <li>Luxury_cars@mail.ru</li>
            </ul>
            <img src={socialIcons} alt="Социальные сети" className="social-icons" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;