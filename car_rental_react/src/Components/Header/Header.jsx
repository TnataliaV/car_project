import React from 'react';
import './Header.scss';
import logo from '../../assets/img/Luxury_cars.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt="logotip" className="logo" />
        
        <nav className="desktopLinks">
          <ul>
            <li><a href="/#about_Us">О нас</a></li>
            <li><a href="/#popular">Популярное</a></li>
            <li><a href="/#conditions">Условия</a></li>
            <li><a href="/#contacts">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
