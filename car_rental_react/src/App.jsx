import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './Pages/Main/Main';
import Catalog from './Pages/Catalog/Catalog';
import Car from './Pages/Car/Car';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = ''
const supabaseKey = ''

export const supabase = createClient(supabaseUrl, supabaseKey)

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
