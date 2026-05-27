"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function CartPage() {

  const [cartItems, setCartItems] =
    useState<any[]>([]);

  const [total, setTotal] =
    useState(0);

  // LOAD CART

  useEffect(() => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart") ||
          "[]"
      );

    setCartItems(cart);

  }, []);

  // TOTAL PRICE

  useEffect(() => {

    const totalPrice =
      cartItems.reduce(
        (
          acc,
          item
        ) =>
          acc +
          item.price *
            item.quantity,
        0
      );

    setTotal(totalPrice);

  }, [cartItems]);

  // UPDATE QUANTITY

  const updateQuantity = (
    id: string,
    type: "inc" | "dec"
  ) => {

    const updated =
      cartItems.map((item) => {

        if (
          item.id === id
        ) {

          if (
            type === "inc"
          ) {

            item.quantity += 1;

          } else {

            if (
              item.quantity > 1
            ) {

              item.quantity -= 1;

            }

          }

        }

        return item;

      });

    setCartItems(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

  };

  // REMOVE PRODUCT

  const removeProduct = (
    id: string
  ) => {

    const filtered =
      cartItems.filter(
        (item) =>
          item.id !== id
      );

    setCartItems(filtered);

    localStorage.setItem(
      "cart",
      JSON.stringify(filtered)
    );

  };

  // CHECKOUT

  const handleCheckout =
    () => {

      localStorage.setItem(
        "checkoutItems",
        JSON.stringify(
          cartItems
        )
      );

      window.location.href =
        "/checkout";

    };

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-4 sm:px-6 lg:px-10 py-28">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-gray-800 mb-14">
          Your Cart 🛒
        </h1>

        {cartItems.length ===
        0 ? (

          <div className="bg-white rounded-[40px] p-20 text-center shadow-xl">

            <h2 className="text-4xl font-bold text-gray-700">
              Cart Is Empty 😢
            </h2>

            <p className="text-gray-500 text-lg mt-4">
              Add some amazing toys now.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* PRODUCTS */}

            <div className="lg:col-span-2 space-y-8">

              {cartItems.map(
                (item) => (

                  <motion.div
                    key={item.id}
                    layout
                    className="bg-white rounded-[35px] shadow-xl p-6 flex flex-col sm:flex-row gap-6 items-center"
                  >

                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.title
                      }
                      className="w-40 h-40 object-cover rounded-3xl"
                    />

                    <div className="flex-1 w-full">

                      <h2 className="text-2xl font-bold text-gray-800">
                        {
                          item.title
                        }
                      </h2>

                      <p className="text-[#FFA689] text-3xl font-bold mt-3">
                        ₹
                        {
                          item.price
                        }
                      </p>

                      {/* QUANTITY */}

                      <div className="flex items-center gap-5 mt-6">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              "dec"
                            )
                          }
                          className="bg-gray-100 w-12 h-12 rounded-full text-2xl font-bold"
                        >
                          -
                        </button>

                        <span className="text-2xl font-bold">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              "inc"
                            )
                          }
                          className="bg-gray-100 w-12 h-12 rounded-full text-2xl font-bold"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeProduct(
                          item.id
                        )
                      }
                      className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition"
                    >
                      Remove
                    </button>

                  </motion.div>

                )
              )}

            </div>

            {/* SUMMARY */}

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white rounded-[40px] shadow-2xl p-10 h-fit sticky top-28"
            >

              <h2 className="text-3xl font-bold text-gray-800 mb-10">
                Order Summary
              </h2>

              <div className="space-y-6 text-lg">

                <div className="flex justify-between">

                  <span>
                    Products
                  </span>

                  <span>
                    {
                      cartItems.length
                    }
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Delivery
                  </span>

                  <span>
                    Free
                  </span>

                </div>

                <div className="border-t pt-6 flex justify-between text-3xl font-bold">

                  <span>
                    Total
                  </span>

                  <motion.span
                    key={total}
                    initial={{
                      scale: 1.3,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    className="text-[#FFA689]"
                  >
                    ₹{total}
                  </motion.span>

                </div>

              </div>

              <button
                onClick={
                  handleCheckout
                }
                className="w-full mt-10 bg-[#FFA689] text-white py-5 rounded-full text-xl font-bold hover:scale-105 transition duration-300 shadow-xl"
              >
                Proceed To Checkout ⚡
              </button>

            </motion.div>

          </div>

        )}

      </div>

    </main>
  );
}