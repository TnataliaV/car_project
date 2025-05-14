import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Catalog from './pages/Catalog/Catalog';
import Car from './pages/Car/Car';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/car/:id" element={<Car />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
