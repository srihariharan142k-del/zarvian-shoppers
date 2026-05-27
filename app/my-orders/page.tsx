"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import { motion } from "framer-motion";

export default function MyOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  // FETCH ORDERS

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const q = query(
            collection(db, "orders"),
            orderBy(
              "createdAt",
              "desc"
            )
          );

          const querySnapshot =
            await getDocs(q);

          const ordersData: any[] =
            [];

          querySnapshot.forEach(
            (doc) => {

              ordersData.push({
                id: doc.id,
                ...doc.data(),
              });

            }
          );

          setOrders(ordersData);

        } catch (error) {

          console.log(error);

        }

      };

    fetchOrders();

  }, []);

  // STATUS COLORS

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "Order Placed":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Out For Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  return (

    <main className="min-h-screen bg-[#FFFDD1] dark:bg-slate-900 px-4 sm:px-6 lg:px-10 py-28">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="mb-14">

          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">

            My Orders 📦

          </h1>

          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">

            Track your recent orders

          </p>

        </div>

        {/* EMPTY */}

        {orders.length === 0 && (

          <div className="bg-white dark:bg-slate-800 rounded-[35px] p-10 shadow-xl text-center">

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">

              No Orders Yet 😴

            </h2>

          </div>

        )}

        {/* ORDERS */}

        <div className="space-y-10">

          {orders.map(
            (order, index) => (

              <motion.div
                key={order.id}
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
                className="bg-white dark:bg-slate-800 rounded-[35px] p-8 shadow-2xl"
              >

                {/* TOP */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">

                      {order.customerName}

                    </h2>

                    <p className="text-gray-500 dark:text-gray-300 mt-2">

                      {order.phone}

                    </p>

                    <p className="text-gray-500 dark:text-gray-300 mt-1">

                      {order.address}

                    </p>

                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-3">

                    <span
                      className={`px-5 py-3 rounded-full font-bold ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >

                      {order.orderStatus}

                    </span>

                    <h3 className="text-3xl font-bold text-[#FFA689]">

                      ₹{order.totalPrice}

                    </h3>

                  </div>

                </div>

                {/* PRODUCTS */}

                <div className="mt-10 space-y-5">

                  {order.products?.map(
                    (
                      product: any,
                      i: number
                    ) => (

                      <div
                        key={i}
                        className="flex items-center gap-4 border-b border-gray-200 dark:border-slate-700 pb-5"
                      >

                        <img
                          src={
                            product.image
                          }
                          alt={
                            product.title
                          }
                          className="w-24 h-24 rounded-2xl object-cover"
                        />

                        <div className="flex-1">

                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">

                            {
                              product.title
                            }

                          </h3>

                          <p className="text-gray-500 dark:text-gray-300 mt-1">

                            Qty:
                            {
                              product.quantity
                            }

                          </p>

                        </div>

                        <p className="text-[#FFA689] text-2xl font-bold">

                          ₹
                          {Number(
                            product.price
                          ) *
                            product.quantity}

                        </p>

                      </div>

                    )
                  )}

                </div>

                {/* TRACKING TIMELINE */}

                <div className="mt-10">

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">

                    Tracking Timeline 🚚

                  </h3>

                  <div className="flex flex-wrap gap-4">

                    {[
                      "Order Placed",
                      "Processing",
                      "Shipped",
                      "Out For Delivery",
                      "Delivered",
                    ].map(
                      (step, i) => (

                        <div
                          key={i}
                          className={`px-5 py-3 rounded-full font-semibold ${
                            order.orderStatus ===
                              step
                              ? "bg-[#FFA689] text-white"
                              : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-white"
                          }`}
                        >

                          {step}

                        </div>

                      )
                    )}

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