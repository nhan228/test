import React from 'react';

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.product_name} />
      <h2>{product.product_name}</h2>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>
        <i className="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default Product;
