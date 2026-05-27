"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export default function NewArrivals() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      const querySnapshot = await getDocs(
        collection(db, "products")
      );

      const productsData: any[] = [];

      querySnapshot.forEach((doc) => {

        productsData.push({
          id: doc.id,
          ...doc.data(),
        });

      });

      setProducts(productsData);

    };

    fetchProducts();

  }, []);

  // SEARCH FILTER

  const filteredProducts =
    products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <section className="relative py-14 px-3 sm:px-6 lg:px-10 overflow-hidden">

      {/* BACKGROUND VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >

        <source
          src="https://cdn.coverr.co/videos/coverr-kids-playing-with-toys-1560677712764?download=1080p"
          type="video/mp4"
        />

      </video>

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TOP */}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">

          <div>

            <p className="text-[#FFA689] text-sm sm:text-lg font-semibold">
              ✨ Trending Collection
            </p>

            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2">
              New Arrivals 🔥
            </h2>

          </div>

          {/* SEARCH BAR */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full lg:w-[320px] bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder:text-gray-300 px-4 py-3 rounded-2xl outline-none text-sm"
          />

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredProducts.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
              }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 sm:h-52 object-cover hover:scale-105 transition duration-300"
                />

              </div>

              {/* CONTENT */}

              <div className="p-3 sm:p-4">

                <p className="text-[#FFA689] text-xs sm:text-sm font-semibold">
                  {product.category}
                </p>

                <h3 className="text-sm sm:text-lg font-bold text-white mt-1 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-[#FFA689] text-lg sm:text-xl font-bold mt-2">
                  ₹{product.price}
                </p>

                {/* BUTTONS */}

                <div className="flex gap-2 mt-4">

                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 bg-[#FFA689] text-white text-center py-2 rounded-xl text-xs sm:text-sm font-semibold hover:scale-105 transition"
                  >
                    View
                  </Link>

                  <button
                    className="bg-white/20 text-white px-3 rounded-xl hover:bg-white/30 transition text-sm"
                  >
                    ❤️
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}