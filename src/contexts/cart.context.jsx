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
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(new Map());
  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
    console.log(cartItems);
  };
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
