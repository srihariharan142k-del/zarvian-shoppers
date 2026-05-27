"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Categories() {

  const categories = [

    {
      title: "Remote Cars",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",

      subcategories: [
        "Diecast Cars",
        "Hotwheels Cars",
        "RC Cars",
        "Sports Cars",
      ],
    },

    {
      title: "Soft Toys",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=1200&auto=format&fit=crop",

      subcategories: [
        "Teddy Bears",
        "Cute Dolls",
        "Animal Toys",
        "Pillow Toys",
      ],
    },

    {
      title: "Kids Gifts",
      image:
        "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1200&auto=format&fit=crop",

      subcategories: [
        "Birthday Gifts",
        "Gift Boxes",
        "Surprise Toys",
        "Mini Gifts",
      ],
    },

    {
      title: "Learning Toys",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",

      subcategories: [
        "Puzzle Games",
        "Math Toys",
        "Alphabet Toys",
        "STEM Toys",
      ],
    },

  ];

  return (

    <section
      className="relative py-20 px-4 sm:px-6 lg:px-10 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TITLE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="text-[#FFA689] text-lg sm:text-xl font-semibold mb-3">
            ✨ Explore Categories
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Shop By Categories 🎁
          </h2>

          <p className="text-gray-200 text-lg mt-5 max-w-2xl mx-auto">
            Discover amazing toys, gifts and trending products
            for kids with premium quality and affordable prices.
          </p>

        </motion.div>

        {/* CATEGORY GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {categories.map((category, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 group"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white text-center">
                  {category.title}
                </h3>

                {/* SUB CATEGORIES */}

                <div className="mt-6 space-y-3">

                  {category.subcategories.map((item, i) => (

                    <Link
                      href={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      key={i}
                    >

                      <div className="bg-white/20 hover:bg-[#FFA689] transition duration-300 text-white px-4 py-3 rounded-2xl text-center font-medium cursor-pointer">

                        {item}

                      </div>

                    </Link>

                  ))}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}