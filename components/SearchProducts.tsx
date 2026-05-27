"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import { motion } from "framer-motion";

export default function SearchProducts() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [filteredProducts, setFilteredProducts] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Diecast Cars",
    "Kids Gift",
    "Soft Toys",
    "Remote Cars",
    "Mini Figures",
  ];

  // FETCH PRODUCTS

  useEffect(() => {

    const fetchProducts = async () => {

      const querySnapshot =
        await getDocs(
          collection(db, "products")
        );

      const data: any[] = [];

      querySnapshot.forEach((doc) => {

        data.push({
          id: doc.id,
          ...doc.data(),
        });

      });

      setProducts(data);

      setFilteredProducts(data);

    };

    fetchProducts();

  }, []);

  // FILTER

  useEffect(() => {

    let filtered = products;

    // SEARCH FILTER

    if (search.trim() !== "") {

      filtered = filtered.filter((item) =>
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    // CATEGORY FILTER

    if (selectedCategory !== "All") {

      filtered = filtered.filter(
        (item) =>
          item.category ===
          selectedCategory
      );

    }

    setFilteredProducts(filtered);

  }, [search, selectedCategory, products]);

  return (

    <section className="py-20 px-4 sm:px-6 lg:px-10">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="text-center mb-12">

          <h2 className="text-5xl font-bold text-gray-800">
            Search Products 🔍
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Find your favorite premium toys
          </p>

        </div>

        {/* SEARCH */}

        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between mb-10">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full lg:w-[450px] bg-white shadow-xl border border-gray-200 rounded-full px-6 py-4 outline-none text-lg"
          />

          {/* CATEGORY BUTTONS */}

          <div className="flex flex-wrap gap-3 justify-center">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat)
                }
                className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#FFA689] text-white shadow-lg"
                    : "bg-white text-gray-700 shadow"
                }`}
              >

                {cat}

              </button>

            ))}

          </div>

        </div>

        {/* PRODUCTS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((item) => (

            <motion.div
              key={item.id}
              whileHover={{
                y: -10,
              }}
              className="bg-white rounded-[30px] overflow-hidden shadow-xl"
            >

              <Link href={`/products/${item.id}`}>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-[#FFA689] text-2xl font-bold mt-3">
                    ₹{item.price}
                  </p>

                  <button className="mt-5 w-full bg-black text-white py-3 rounded-full font-semibold hover:scale-105 transition">

                    View Product

                  </button>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

        {/* EMPTY */}

        {filteredProducts.length === 0 && (

          <div className="text-center mt-16">

            <h3 className="text-3xl font-bold text-gray-700">
              No Products Found 😢
            </h3>

          </div>

        )}

      </div>

    </section>
  );
}