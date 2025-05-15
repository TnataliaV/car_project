import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Car.scss';
import axios from 'axios';


const Car = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', {
        car_id: id,
        ...bookingForm
      });
      alert('Ваше бронирование успешно оформлено!');
      setBookingForm({
        name: '',
        phone: '',
        start_date: '',
        end_date: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Произошла ошибка при оформлении бронирования');
    }
  };

  // Статические тарифы
  const rentalRates = [
    { name: '1 час', price: '14.000 ₽' },
    { name: '3 часа', price: '16.000 ₽' },
    { name: 'Пол дня', price: '19.000 ₽' },
    { name: '1 сутки', price: '17.000 ₽' },
    { name: 'С водителем', price: '+3.000 ₽ к тарифу' },
    { name: 'Для свадьбы', price: '18.000 ₽' },
    { name: 'Для фотосессии', price: '12.000 ₽' }
  ];

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (!car) return <div className={styles.notFound}>Автомобиль не найден</div>;

  return (
    <>
      <section className={styles.carDetails}>
        <div className={styles.container}>
          <h1 className={styles.carTitle}>{car.model}</h1>
          
          <div className={styles.carContent}>
            <div className={styles.carImageContainer}>
              <img 
                src={`/images/${car.image_url}`} 
                alt={car.model}
                className={styles.carImage} 
              />
            </div>
            
            <div className={styles.carInfo}>
              <div className={styles.specs}>
                <p className={styles.specItem}>
                  <span className={styles.specLabel}>Объем бака:</span>
                  <span className={styles.specValue}>{car.tank_capacity} л</span>
                </p>
                <p className={styles.specItem}>
                  <span className={styles.specLabel}>Мощность:</span>
                  <span className={styles.specValue}>{car.horsepower} л.с.</span>
                </p>
                <p className={styles.specItem}>
                  <span className={styles.specLabel}>Привод:</span>
                  <span className={styles.specValue}>{car.drive_type}</span>
                </p>
                <p className={styles.specItem}>
                  <span className={styles.specLabel}>Цена:</span>
                  <span className={styles.specValue}>{car.price}</span>
                </p>
              </div>
              
              <div className={styles.actions}>
                <a href="#pricing" className={styles.secondaryButton}>
                  Тарифы
                </a>
                <a href="#booking" className={styles.primaryButton}>
                  Забронировать
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>СТОИМОСТЬ АРЕНДЫ</h2>
          
          <div className={styles.pricingTable}>
            <table className={styles.ratesTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Тариф</th>
                  <th className={styles.tableHeader}>Цена</th>
                </tr>
              </thead>
              <tbody>
                {rentalRates.map((rate, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>{rate.name}</td>
                    <td className={styles.tableCell}>{rate.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="booking" className={styles.bookingForm}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>ЗАБРОНИРОВАТЬ {car.model}</h2>
          
          <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                value={bookingForm.name}
                onChange={handleBookingChange}
                placeholder="Ваше имя"
                required
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                value={bookingForm.phone}
                onChange={handleBookingChange}
                placeholder="Телефон"
                required
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Начало аренды</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={bookingForm.start_date}
                  onChange={handleBookingChange}
                  required
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Конец аренды</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={bookingForm.end_date}
                  onChange={handleBookingChange}
                  required
                  className={styles.formInput}
                />
              </div>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Подтвердить бронь
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Car;