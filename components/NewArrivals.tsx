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

    <section className="relative py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">

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

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-14">

          <div>

            <p className="text-[#FFA689] text-lg font-semibold">
              ✨ Trending Collection
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
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
            className="w-full lg:w-[350px] bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder:text-gray-300 px-6 py-4 rounded-2xl outline-none"
          />

        </div>

        {/* PRODUCTS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden shadow-2xl"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-72 object-cover hover:scale-110 transition duration-500"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <p className="text-[#FFA689] font-semibold">
                  {product.category}
                </p>

                <h3 className="text-2xl font-bold text-white mt-2">
                  {product.title}
                </h3>

                <p className="text-[#FFA689] text-2xl font-bold mt-4">
                  ₹{product.price}
                </p>

                {/* BUTTONS */}

                <div className="flex gap-3 mt-6">

                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 bg-[#FFA689] text-white text-center py-3 rounded-2xl font-semibold hover:scale-105 transition"
                  >
                    View Product
                  </Link>

                  <button
                    className="bg-white/20 text-white px-4 rounded-2xl hover:bg-white/30 transition"
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