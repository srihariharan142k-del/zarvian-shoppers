"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function Hero() {

  return (

    <section className="relative overflow-hidden bg-[#FFFDD1] min-h-screen flex items-center px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

      {/* OFFER LABEL */}

      <div className="absolute top-24 left-0 w-full overflow-hidden z-20 pointer-events-none">

        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="whitespace-nowrap"
        >

          <span className="bg-red-500 text-white px-8 py-3 rounded-full text-sm sm:text-lg font-bold shadow-lg inline-block">
            🔥 BIG TOYS SALE — FLAT 50% OFF TODAY ONLY 🔥
          </span>

        </motion.div>

      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full pt-28">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <p className="text-[#FFA689] text-lg sm:text-xl font-semibold mb-4">
            ✨ Trending Toys Collection
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-800 leading-tight">
            Fun Toys <br />
            For Happy Kids 🧸
          </h1>

          <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-6 leading-relaxed max-w-xl">
            Discover premium quality toys, RC cars,
            teddy bears and amazing gifts for kids.
          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-10">

            {/* SHOP NOW */}

            <Link href="/products">

              <button className="bg-[#FFA689] text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg">
                Shop Now
              </button>

            </Link>

            {/* EXPLORE MORE */}

            <Link href="/categories">

              <button className="border-2 border-[#FFA689] text-[#FFA689] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FFA689] hover:text-white transition duration-300">
                Explore More
              </button>

            </Link>

          </div>

          {/* TRENDING SALES */}

          <div className="mt-14">

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Our Trending Sales 🔥
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              {/* CARS */}

              <Link href="/categories/cars">

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                >

                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
                    alt="Cars"
                    className="h-36 sm:h-44 w-full object-cover"
                  />

                  <div className="p-4">

                    <h3 className="font-bold text-lg text-gray-800">
                      Cars
                    </h3>

                    <p className="text-[#FFA689] font-semibold mt-2">
                      Explore Now →
                    </p>

                  </div>

                </motion.div>

              </Link>

              {/* TOYS */}

              <Link href="/categories/toys">

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                >

                  <img
                    src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop"
                    alt="Toys"
                    className="h-36 sm:h-44 w-full object-cover"
                  />

                  <div className="p-4">

                    <h3 className="font-bold text-lg text-gray-800">
                      Toys
                    </h3>

                    <p className="text-[#FFA689] font-semibold mt-2">
                      Explore Now →
                    </p>

                  </div>

                </motion.div>

              </Link>

              {/* GIFTS */}

              <Link href="/categories/gifts">

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                >

                  <img
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?q=80&w=800&auto=format&fit=crop"
                    alt="Gifts"
                    className="h-36 sm:h-44 w-full object-cover"
                  />

                  <div className="p-4">

                    <h3 className="font-bold text-lg text-gray-800">
                      Gifts
                    </h3>

                    <p className="text-[#FFA689] font-semibold mt-2">
                      Explore Now →
                    </p>

                  </div>

                </motion.div>

              </Link>

            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >

          <div className="grid grid-cols-2 gap-4 sm:gap-6">

            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              src="https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=800&auto=format&fit=crop"
              alt="Toy"
              className="rounded-3xl h-52 sm:h-72 lg:h-80 w-full object-cover shadow-2xl"
            />

            <motion.img
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop"
              alt="Toy"
              className="rounded-3xl h-52 sm:h-72 lg:h-80 w-full object-cover shadow-2xl mt-8"
            />

            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5 }}
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop"
              alt="Toy"
              className="rounded-3xl h-52 sm:h-72 lg:h-80 w-full object-cover shadow-2xl"
            />

            <motion.img
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5.5 }}
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
              alt="Toy"
              className="rounded-3xl h-52 sm:h-72 lg:h-80 w-full object-cover shadow-2xl mt-8"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}