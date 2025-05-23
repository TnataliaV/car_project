import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './Pages/Main/Main';
import Catalog from './Pages/Catalog/Catalog';
import Car from './Pages/Car/Car';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yomrwpbquwknwsvsvsgp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbXJ3cGJxdXdrbndzdnN2c2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTY2OTYsImV4cCI6MjA2Mjg3MjY5Nn0.tRdxMApbShXAZHlVnAcYZfSAYeCXFW-fumgIawi215E'

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
