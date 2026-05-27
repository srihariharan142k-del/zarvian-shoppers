"use client";

import Link from "next/link";

import { motion } from "framer-motion";

const categories = [

  {
    name: "Diecast Cars",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    link: "/products",
  },

  {
    name: "Kids Gifts",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    link: "/products",
  },

  {
    name: "RC Cars",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    link: "/products",
  },

  {
    name: "Hot Wheels",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    link: "/products",
  },

];

export default function FeaturedCategories() {

  return (

    <section className="py-24 px-4 sm:px-6 lg:px-10">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="text-center mb-16">

          <p className="text-[#FFA689] text-lg font-semibold">
            Explore Categories
          </p>

          <h2 className="text-5xl font-bold text-gray-800 mt-4">
            Featured Collections 🔥
          </h2>

        </div>

        {/* GRID */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categories.map(
            (category, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{
                  once: true,
                }}
              >

                <Link href={category.link}>

                  <div className="group relative h-[380px] rounded-[40px] overflow-hidden shadow-2xl cursor-pointer">

                    {/* IMAGE */}

                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition duration-500" />

                    {/* CONTENT */}

                    <div className="absolute bottom-0 p-8 text-white">

                      <h3 className="text-3xl font-bold">
                        {category.name}
                      </h3>

                      <button className="mt-5 bg-[#FFA689] px-6 py-3 rounded-full font-bold hover:scale-105 transition duration-300">

                        Explore Now 🚀

                      </button>

                    </div>

                  </div>

                </Link>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>
  );
}