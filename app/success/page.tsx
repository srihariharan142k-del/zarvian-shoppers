"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function SuccessPage() {

  return (

    <main className="min-h-screen bg-[#FFFDD1] flex items-center justify-center px-4">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="bg-white max-w-2xl w-full rounded-[40px] shadow-2xl p-10 sm:p-16 text-center"
      >

        {/* SUCCESS ICON */}

        <motion.div
          initial={{
            scale: 0,
            rotate: -180,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className="w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center text-6xl"
        >
          ✅
        </motion.div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-gray-800 mt-10">
          Order Placed!
        </h1>

        <p className="text-gray-600 text-xl mt-6 leading-relaxed">

          Your order has been placed successfully 🎉

          <br />

          Our team will contact you soon for confirmation.

        </p>

        {/* DETAILS */}

        <div className="mt-10 bg-[#FFF5F1] rounded-3xl p-6 text-left">

          <div className="flex justify-between py-3 border-b">

            <span className="font-semibold">
              Payment Method
            </span>

            <span>
              Cash On Delivery
            </span>

          </div>

          <div className="flex justify-between py-3 border-b">

            <span className="font-semibold">
              Delivery
            </span>

            <span>
              3 - 5 Days
            </span>

          </div>

          <div className="flex justify-between py-3">

            <span className="font-semibold">
              Status
            </span>

            <span className="text-green-600 font-bold">
              Confirmed
            </span>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap justify-center gap-5 mt-12">

          <Link
            href="/"
            className="bg-[#FFA689] text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-xl"
          >
            Back To Home 🏠
          </Link>

          <Link
            href="/products"
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-xl"
          >
            Continue Shopping 🛍️
          </Link>

        </div>

      </motion.div>

    </main>
  );
}