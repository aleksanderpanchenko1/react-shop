import { Route, Routes } from 'react-router-dom';

import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';
import NotFound from './components/NotFoundBlock/index.tsx';

import './scss/app.scss';
import FullPizza from './pages/FullPizza.tsx';


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
