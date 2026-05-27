"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

export default function WishlistPage() {

  const [wishlist, setWishlist] =
    useState<any[]>([]);

  // LOAD WISHLIST

  useEffect(() => {

    const savedWishlist =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        ) || "[]"
      );

    setWishlist(savedWishlist);

  }, []);

  // REMOVE PRODUCT

  const removeWishlist = (
    id: string
  ) => {

    const updated =
      wishlist.filter(
        (item) =>
          item.id !== id
      );

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

  };

  // MOVE TO CART

  const moveToCart = (
    product: any
  ) => {

    const existingCart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        ) || "[]"
      );

    const existingProduct =
      existingCart.find(
        (item: any) =>
          item.id === product.id
      );

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      existingCart.push({
        ...product,
        quantity: 1,
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Moved To Cart 🛒");

  };

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-4 sm:px-6 lg:px-10 py-28">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-gray-800">
            My Wishlist ❤️
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Your favorite saved products
          </p>

        </div>

        {/* EMPTY */}

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-[40px] shadow-xl p-16 text-center">

            <h2 className="text-4xl font-bold text-gray-700">
              Wishlist Is Empty 😢
            </h2>

            <p className="text-gray-500 mt-5 text-lg">
              Save your favorite products here.
            </p>

            <Link href="/products">

              <button className="mt-10 bg-[#FFA689] text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition">

                Explore Products 🔥

              </button>

            </Link>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {wishlist.map((product) => (

              <motion.div
                key={product.id}
                whileHover={{
                  y: -10,
                }}
                className="bg-white rounded-[30px] overflow-hidden shadow-xl"
              >

                <Link href={`/products/${product.id}`}>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />

                </Link>

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.title}
                  </h2>

                  <p className="text-[#FFA689] text-2xl font-bold mt-3">
                    ₹{product.price}
                  </p>

                  <div className="flex flex-col gap-3 mt-6">

                    <button
                      onClick={() =>
                        moveToCart(product)
                      }
                      className="bg-black text-white py-3 rounded-full font-semibold hover:scale-105 transition"
                    >

                      Move To Cart 🛒

                    </button>

                    <button
                      onClick={() =>
                        removeWishlist(
                          product.id
                        )
                      }
                      className="bg-red-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition"
                    >

                      Remove ❌

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}