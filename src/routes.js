import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import ProductsList from './pages/ProductsList';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CartProducts from './pages/CartProducts';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import ChatBubble from './components/ChatBubble';
import Banner from './components/Banner';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';
import ReviewOrder from './pages/ReviewOrder';
 
function LayoutWithBanner({ children }) {
  const location = useLocation();
  const showBanner = location.pathname === '/' || location.pathname === '/products' || location.pathname === '/about';

  return (
    <>
      <AppHeader />
      {showBanner && <Banner />}
      {children}
      <ChatBubble />
      <AppFooter />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <LayoutWithBanner>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartProducts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/" element={<Product/>} />
          <Route path="/shoppingcart" element={<ShoppingCart/>} />
          <Route path="/revieworder" element={<ReviewOrder/>} />
        </Routes>
      </LayoutWithBanner>
    </BrowserRouter>
  );
}

export default AppRoutes;
