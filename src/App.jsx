import React, { useState, useEffect } from 'react';
import Product from './components/Product/Product';
import data from './data.json';
import Cart from './components/Cart/Cart';

import './main.scss';

export default function App() {
  const [products, setProducts] = useState(data.products);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      saveCartToLocalStorage([...cart, { ...product, quantity: 1 }]);
    }
  };

  //Ấn vào icon cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Xóa
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Tăng
  const incrementItem = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item.id === product.id);
    updatedCart[productIndex].quantity += 1;
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Giảm
  const decrementItem = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item.id === product.id);
    if (updatedCart[productIndex].quantity > 1) {
      updatedCart[productIndex].quantity -= 1;
    } else {
      updatedCart.splice(productIndex, 1);
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  return (
    <>
      <div className='header'>
        <div className='header-left'>
          <p>Trang chủ</p>
          <p>Danh sách sản phẩm</p>
        </div>
        <div className='header-right' onClick={toggleCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      {isCartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
        />
      )}

      <h1>Danh sách sản phẩm</h1>
      <div className='product-list'>
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
}
