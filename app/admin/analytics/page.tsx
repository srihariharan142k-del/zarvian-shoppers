"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import {
  ShoppingBag,
  IndianRupee,
  Package,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

export default function AnalyticsPage() {

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [totalUsers, setTotalUsers] =
    useState(0);

  // FETCH ANALYTICS

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          // ORDERS

          const ordersSnapshot =
            await getDocs(
              collection(db, "orders")
            );

          let revenue = 0;

          ordersSnapshot.forEach(
            (doc) => {

              revenue += Number(
                doc.data()
                  .totalPrice || 0
              );

            }
          );

          setTotalOrders(
            ordersSnapshot.size
          );

          setTotalRevenue(revenue);

          // PRODUCTS

          const productsSnapshot =
            await getDocs(
              collection(db, "products")
            );

          setTotalProducts(
            productsSnapshot.size
          );

          // USERS

          const usersSnapshot =
            await getDocs(
              collection(db, "users")
            );

          setTotalUsers(
            usersSnapshot.size
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchAnalytics();

  }, []);

  // CARD DATA

  const analyticsCards = [

    {
      title: "Total Orders",
      value: totalOrders,
      icon: (
        <ShoppingBag size={40} />
      ),
    },

    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: (
        <IndianRupee size={40} />
      ),
    },

    {
      title: "Products",
      value: totalProducts,
      icon: (
        <Package size={40} />
      ),
    },

    {
      title: "Users",
      value: totalUsers,
      icon: (
        <Users size={40} />
      ),
    },

  ];

  return (

    <main className="min-h-screen bg-[#FFFDD1] dark:bg-slate-900 px-4 sm:px-6 lg:px-10 py-28">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="mb-14">

          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">

            Analytics Dashboard 📊

          </h1>

          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">

            Overview of your ecommerce store

          </p>

        </div>

        {/* CARDS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {analyticsCards.map(
            (card, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-white dark:bg-slate-800 rounded-[35px] shadow-2xl p-8"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500 dark:text-gray-300 text-lg">

                      {card.title}

                    </p>

                    <h2 className="text-4xl font-bold mt-4 text-gray-800 dark:text-white">

                      {card.value}

                    </h2>

                  </div>

                  <div className="bg-[#FFA689] text-white p-5 rounded-3xl">

                    {card.icon}

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </main>
  );
}