import React from 'react';
import './Footer.scss';
import logo from '../../assets/img/Luxury_cars.png';

const Footer = () => {
  return (
    <footer id="logotip" className="footer">
      <div className="container">
        <div className="logotip">
          <img src={logo} alt="Luxury Cars" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
