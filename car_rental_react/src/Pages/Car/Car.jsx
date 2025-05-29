import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Car.scss';
import { supabase } from '../../App';

const Car = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [rentalRates, setRentalRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    start_date: '',
    end_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Получаем данные об автомобиле
        const { data: carData, error: carError } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();
        
        if (carError) throw carError;
        
        // Получаем тарифы для этого автомобиля
        const { data: ratesData, error: ratesError } = await supabase
          .from('rental_rates')
          .select('*')
          .eq('car_id', id)
          .single();
        
        if (ratesError) throw ratesError;
        
        setCar(carData);
        setRentalRates(ratesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id, navigate]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('booking')
        .insert([
          {
            car_id: id,
            client_name: bookingForm.name,
            client_phone: bookingForm.phone,
            start_date: bookingForm.start_date,
            end_date: bookingForm.end_date
          }
        ]);
      
      if (error) throw error;
      
      alert('Ваше бронирование успешно оформлено!');
      setBookingForm({
        name: '',
        phone: '',
        start_date: '',
        end_date: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Произошла ошибка при оформлении бронирования: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Формируем массив тарифов из данных БД
  const getRentalRates = () => {
    if (!rentalRates) return [];
    
    return [
      { name: '1 час', price: rentalRates.price_1hour },
      { name: '3 часа', price: rentalRates.price_3hour },
      { name: 'Пол дня', price: rentalRates.price_halfday },
      { name: '1 сутки', price: rentalRates.price_1day },
      { name: 'С водителем', price: rentalRates.price_with_driver },
      { name: 'Для свадьбы', price: rentalRates.price_for_wedding },
      { name: 'Для фотосессии', price: rentalRates.price_photoshoots }
    ];
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!car) return <div className="notFound">Автомобиль не найден</div>;

  return (
    <div className="carPage">
      <section className="carDetails">
        <div className="container">
          <h1 className="carTitle">{car.model}</h1>
          
          <div className="carContent">
            <div className="carImageContainer">
              <img 
                src={car.image_url} 
                alt={car.model}
                className="carImage" 
              />
            </div>
            
            <div className="carInfo">
              <div className="specs">
                <p className="specItem">
                  <span className="specLabel">Объем бака:</span>
                  <span className="specValue">{car.tank_capacity} л</span>
                </p>
                <p className="specItem">
                  <span className="specLabel">Мощность:</span>
                  <span className="specValue">{car.horsepower} л.с.</span>
                </p>
                <p className="specItem">
                  <span className="specLabel">Привод:</span>
                  <span className="specValue">{car.drive_type}</span>
                </p>
                <p className="specItem">
                  <span className="specLabel">Цена:</span>
                  <span className="specValue">{car.price}</span>
                </p>
              </div>
              
              <div className="actions">
                <a href="#pricing" className="secondaryButton">
                  Тарифы
                </a>
                <a href="#booking" className="primaryButton">
                  Забронировать
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="sectionTitle">СТОИМОСТЬ АРЕНДЫ</h2>
          
          <div className="pricingTable">
            <table className="ratesTable">
              <thead>
                <tr>
                  <th className="tableHeader">Тариф</th>
                  <th className="tableHeader">Цена</th>
                </tr>
              </thead>
              <tbody>
                {getRentalRates().map((rate, index) => (
                  <tr key={index} className="tableRow">
                    <td className="tableCell">{rate.name}</td>
                    <td className="tableCell">{rate.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="booking" className="bookingForm">
        <div className="container">
          <h2 className="sectionTitle">ЗАБРОНИРОВАТЬ {car.model}</h2>
          
          <form onSubmit={handleBookingSubmit} className="bookingForm">
            <div className="formGroup">
              <input
                type="text"
                name="name"
                value={bookingForm.name}
                onChange={handleBookingChange}
                placeholder="Ваше имя"
                required
                className="formInput"
              />
            </div>
            
            <div className="formGroup">
              <input
                type="tel"
                name="phone"
                value={bookingForm.phone}
                onChange={handleBookingChange}
                placeholder="Телефон"
                required
                className="formInput"
              />
            </div>
            
            <div className="formRow">
              <div className="formGroup">
                <label className="formLabel">Начало аренды</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={bookingForm.start_date}
                  onChange={handleBookingChange}
                  required
                  className="formInput"
                />
              </div>
              
              <div className="formGroup">
                <label className="formLabel">Конец аренды</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={bookingForm.end_date}
                  onChange={handleBookingChange}
                  required
                  className="formInput"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submitButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Оформление...' : 'Подтвердить бронь'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Car;