"use client";

import { motion } from "framer-motion";

const offers = [

  {
    title: "🔥 Mega Toy Sale",
    desc: "Up To 50% OFF On Premium Toys",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "🚗 Diecast Collection",
    desc: "Limited Edition Cars Available",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "🎁 Kids Special Gifts",
    desc: "Best Gift Collections For Kids",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1400&auto=format&fit=crop",
  },

];

export default function OfferSlider() {

  return (

    <section className="py-20 px-4 sm:px-6 lg:px-10">

      <div className="max-w-7xl mx-auto overflow-hidden">

        <motion.div
          animate={{
            x: [
              "0%",
              "-100%",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
          className="flex gap-8 w-max"
        >

          {[...offers, ...offers].map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="relative min-w-[350px] sm:min-w-[500px] h-[280px] rounded-[40px] overflow-hidden shadow-2xl"
              >

                {/* IMAGE */}

                <img
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-black/45" />

                {/* CONTENT */}

                <div className="absolute inset-0 flex flex-col justify-center px-10 text-white">

                  <h2 className="text-4xl font-bold">
                    {
                      item.title
                    }
                  </h2>

                  <p className="text-xl mt-4 text-gray-200">
                    {
                      item.desc
                    }
                  </p>

                  <button className="mt-8 bg-[#FFA689] w-fit px-8 py-4 rounded-full font-bold hover:scale-105 transition duration-300">

                    Shop Now 🛒

                  </button>

                </div>

              </div>

            )
          )}

        </motion.div>

      </div>

    </section>
  );
}