import React from 'react';
import './Cart.scss';

const Cart = ({ cart, removeFromCart, incrementItem, decrementItem }) => {
  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, product) => {
      const productPrice = parseFloat(product.price.replace(/\D/g, ''));
      return total + product.quantity * productPrice;
    }, 0);

    return totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <div className='cart open'>
      <h2>Cart</h2>
      <hr />

      {cart.length === 0 ? (
        <p>Chưa có sản phẩm trong giỏ hàng.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <div className='container'>
                <div className='container-left'>
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className='product_image p-1 object-cover border rounded-full w-14 h-14'
                    style={{ borderRadius: '50%' }}
                  />
                  <div>{product.product_name}</div>
                </div>

                <div className='container-right'>
                  <button onClick={() => incrementItem(product)} className='btn-change'>+</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => decrementItem(product)} className='btn-change'>-</button>
                  <button onClick={() => removeFromCart(product)} className='btn-remove'>
                      <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <div className='total-price'>
        Tổng tiền: <b>{getTotalPrice()}</b>
      </div>
    </div>
  );
};

export default Cart;
