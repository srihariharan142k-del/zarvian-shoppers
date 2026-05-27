"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (item: Omit<CartItem, "quantity">) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [cart, setCart] = useState<CartItem[]>([]);

  // ADD TO CART

  const addToCart = (
    item: Omit<CartItem, "quantity">
  ) => {

    setCart((prev) => {

      const existingItem = prev.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {

        return prev.map((cartItem) =>

          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  // INCREASE

  const increaseQuantity = (id: string) => {

    setCart((prev) =>
      prev.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE

  const decreaseQuantity = (id: string) => {

    setCart((prev) =>

      prev
        .map((item) =>

          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE

  const removeFromCart = (id: string) => {

    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export function useCart() {

  const context = useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}