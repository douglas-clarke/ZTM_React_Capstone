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
const subtractCartItem = (cartItems, product) => {
  const prevCount = cartItems.get(product.id)?.quantity ?? 0;
  if (prevCount > 1) {
    return new Map(
      cartItems.set(product.id, {
        ...product,
        quantity: prevCount - 1,
      })
    );
  }
  return removeCartItem(cartItems, product);
};

const removeCartItem = (cartItems, product) => {
  cartItems.delete(product.id);
  return new Map(cartItems);
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: new Map(),
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartItemCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(new Map());
  const [cartItemCount, setcartItemCount] = useState(0);
  const [cartTotal, setcartTotal] = useState(0);

  useEffect(() => {
    const cartCount = Array.from(cartItems.values()).reduce(
      (total, cartItem) => {
        return total + cartItem.quantity;
      },
      0
    );

    setcartItemCount(cartCount);
  }, [cartItems]);

  useEffect(() => {
    const cartTotal = Array.from(cartItems.values()).reduce(
      (total, cartItem) => {
        return total + cartItem.quantity * cartItem.price;
      },
      0
    );
    setcartTotal(cartTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };
  const subtractItemFromCart = (product) => {
    setCartItems(subtractCartItem(cartItems, product));
  };
  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    subtractItemFromCart,
    removeItemFromCart,
    cartItemCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
