"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function OrderSuccessPage() {

  return (

    <main className="min-h-screen bg-[#FFFDD1] flex items-center justify-center px-4 py-20">

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
          duration: 0.7,
        }}
        className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl p-10 sm:p-16 text-center"
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
            type: "spring",
            stiffness: 120,
            damping: 10,
          }}
          className="w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center"
        >

          <span className="text-6xl">
            ✅
          </span>

        </motion.div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-gray-800 mt-10">

          Order Placed Successfully 🎉

        </h1>

        <p className="text-gray-500 text-lg mt-6 leading-relaxed">

          Thank you for shopping with us.
          Your order has been received successfully
          and will be delivered soon 🚚

        </p>

        {/* ORDER INFO */}

        <div className="bg-[#FFF8F3] rounded-3xl p-8 mt-10 text-left">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">

            Order Information

          </h2>

          <div className="space-y-4 text-lg text-gray-600">

            <div className="flex justify-between">

              <span>Order Status</span>

              <span className="font-semibold text-green-600">
                Confirmed
              </span>

            </div>

            <div className="flex justify-between">

              <span>Payment Method</span>

              <span className="font-semibold">
                Cash On Delivery
              </span>

            </div>

            <div className="flex justify-between">

              <span>Delivery</span>

              <span className="font-semibold">
                3 - 5 Days
              </span>

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap justify-center gap-5 mt-12">

          <Link href="/">

            <button className="bg-[#FFA689] text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-xl">

              Continue Shopping 🛍️

            </button>

          </Link>

          <Link href="/cart">

            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-xl">

              View Cart 🛒

            </button>

          </Link>

        </div>

      </motion.div>

    </main>
  );
}