import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, product) => {
  const prevCount = cartItems.get(product.id)?.quantity ?? 0;
  return new Map(
    cartItems.set(product.id, {
      ...product,
      quantity: prevCount + 1,
    })
  );
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: new Map(),
  addItemToCart: () => {},
  cartItemCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(new Map());
  const [cartItemCount, setcartItemCount] = useState(0);

  useEffect(() => {
    const cartCount = Array.from(cartItems.values()).reduce(
      (total, cartItem) => {
        return total + cartItem.quantity;
      },
      0
    );
    setcartItemCount(cartCount);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
