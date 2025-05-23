import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Catalog.scss';
import axios from 'axios';

// Импортируем изображения
import car1 from '../../assets/img/image-1.png';
import car2 from '../../assets/img/image-2.png';
import car3 from '../../assets/img/image-3.png';
import car4 from '../../assets/img/image-4.png';
import car5 from '../../assets/img/image-5.png';
import car6 from '../../assets/img/image-6.png';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        // Заглушка для демонстрации
        setCars([
          { id: 1, model: 'Mercedes CLS 450 4matic', image: car1, price: 'от 12.000 ₽ до 19.000 ₽', category: 'business' },
          { id: 2, model: 'BMW X5', image: car2, price: 'от 15.000 ₽ до 22.000 ₽', category: 'suv' },
          { id: 3, model: 'Audi A8', image: car3, price: 'от 14.000 ₽ до 20.000 ₽', category: 'premium' },
          { id: 4, model: 'Porsche 911', image: car4, price: 'от 25.000 ₽ до 35.000 ₽', category: 'sports' },
          { id: 5, model: 'Tesla Model S', image: car5, price: 'от 18.000 ₽ до 25.000 ₽', category: 'electric' },
          { id: 6, model: 'Mercedes S-Class Cabrio', image: car6, price: 'от 20.000 ₽ до 30.000 ₽', category: 'convertible' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'suv', name: 'Внедорожники' },
    { id: 'business', name: 'Бизнес' },
    { id: 'premium', name: 'Премиум' },
    { id: 'sports', name: 'Спорткары' },
    { id: 'electric', name: 'Электромобили' },
    { id: 'convertible', name: 'Кабриолеты' },
    { id: 'minivan', name: 'Минивэны' }
  ];

  const filteredCars = activeCategory === 'all' 
    ? cars 
    : cars.filter(car => car.category === activeCategory);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!cars.length) return <div className="not-found">Автомобили не найдены</div>;

  return (
    <>
      <main className="catalog-page">
        <section className="categories-section">
          <div className="container">
            <h1>КАТЕГОРИИ АВТОМОБИЛЕЙ</h1>
            
            <div className="categories-tabs">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="category-content">
              <h2>{categories.find(c => c.id === activeCategory)?.name || 'Все автомобили'}</h2>
              
              <div className="cars-grid">
                {filteredCars.length > 0 ? (
                  filteredCars.map(car => (
                    <div key={car.id} className="car-card">
                      <Link to={`/car/${car.id}`}>
                        <img 
                          src={car.image} 
                          alt={car.model}
                          className="car-image" 
                        />
                        <div className="car-info">
                          <h3>{car.model}</h3>
                          <p className="price">{car.price}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="no-cars">В этой категории пока нет автомобилей</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalog;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Catalog.scss';
// import { supabase } from '../../App';

// const Catalog = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('cars')
//           .select('*');
        
//         if (error) throw error;
        
//         setCars(data);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const categories = [
//     { id: 'all', name: 'Все' },
//     { id: 'suv', name: 'Внедорожники' },
//     { id: 'business', name: 'Бизнес' },
//     { id: 'premium', name: 'Премиум' },
//     { id: 'sports', name: 'Спорткары' },
//     { id: 'electric', name: 'Электромобили' },
//     { id: 'convertible', name: 'Кабриолеты' },
//     { id: 'minivan', name: 'Минивэны' }
//   ];

//   const filteredCars = activeCategory === 'all' 
//     ? cars 
//     : cars.filter(car => car.category === activeCategory);

//   if (loading) return <div className="loading">Загрузка...</div>;
//   if (!cars.length) return <div className="not-found">Автомобили не найдены</div>;

//   return (
//     <>
//       <main className="catalog-page">
//         <section className="categories-section">
//           <div className="container">
//             <h1>КАТЕГОРИИ АВТОМОБИЛЕЙ</h1>
            
//             <div className="categories-tabs">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>

//             <div className="category-content">
//               <h2>{categories.find(c => c.id === activeCategory)?.name || 'Все автомобили'}</h2>
              
//               <div className="cars-grid">
//                 {filteredCars.length > 0 ? (
//                   filteredCars.map(car => (
//                     <div key={car.id} className="car-card">
//                       <Link to={`/car/${car.id}`}>
//                         <img 
//                           src={car.image_url} 
//                           alt={car.model}
//                           className="car-image" 
//                         />
//                         <div className="car-info">
//                           <h3>{car.model}</h3>
//                           <p className="price">{car.price}</p>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="no-cars">В этой категории пока нет автомобилей</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Catalog;