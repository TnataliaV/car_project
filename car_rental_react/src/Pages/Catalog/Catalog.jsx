import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Catalog.scss';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Категории и их условное определение
  const categories = [
    { 
      id: 'business', 
      name: 'Бизнес', 
      filter: car => car.model.includes('Mercedes') || car.model.includes('BMW') 
    },
    { 
      id: 'suv', 
      name: 'Внедорожники', 
      filter: car => car.model.includes('SUV') || car.model.includes('Land Cruiser') 
    },
    { 
      id: 'sports', 
      name: 'Спорткары', 
      filter: car => car.model.includes('Porsche') || car.model.includes('Audi TT') 
    },
    { 
      id: 'premium', 
      name: 'Премиум', 
      filter: car => car.price.includes('от 20.000') 
    },
    { 
      id: 'convertible', 
      name: 'Кабриолеты', 
      filter: car => car.model.includes('Cabrio') || car.model.includes('Roadster') 
    },
  ];

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <>
      <Header />
      
      <section className={styles.catalog}>
        <div className={styles.container}>
          <h1 className={styles.title}>КАТАЛОГ АВТОМОБИЛЕЙ</h1>
          
          <div className={styles.categories}>
            {categories.map(category => (
              <a 
                key={category.id} 
                href={`#${category.id}`}
                className={styles.categoryLink}
              >
                {category.name}
              </a>
            ))}
          </div>

          <div className={styles.carsSection}>
            {categories.map(category => {
              const categoryCars = cars.filter(category.filter);
              if (categoryCars.length === 0) return null;
              
              return (
                <div key={category.id} id={category.id} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>{category.name}</h2>
                  <div className={styles.carList}>
                    {categoryCars.map(car => (
                      <div key={car.id} className={styles.carCard}>
                        <Link to={`/car/${car.id}`} className={styles.carLink}>
                          <img 
                            src={`/images/${car.image_url}`} 
                            alt={car.model}
                            className={styles.carImage} 
                          />
                          <div className={styles.carInfo}>
                            <h3 className={styles.carModel}>{car.model}</h3>
                            <p className={styles.carPrice}>{car.price}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Catalog;