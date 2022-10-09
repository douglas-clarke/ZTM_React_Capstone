import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
  console.log(product);
  const { name, price, imageUrl, quantity } = product;
  const { addItemToCart, removeItemFromCart, subtractItemFromCart } =
    useContext(CartContext);
  const reduceItemQuantity = () => {
    subtractItemFromCart(product);
  };
  const increaseItemQuantity = () => {
    addItemToCart(product);
  };
  const removeItem = () => {
    removeItemFromCart(product);
  };
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={reduceItemQuantity}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseItemQuantity}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
