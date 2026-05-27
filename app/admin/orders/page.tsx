export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import { motion } from "framer-motion";

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "orders")
          );

        const ordersData: any[] = [];

        querySnapshot.forEach((doc) => {

          ordersData.push({
            id: doc.id,
            ...doc.data(),
          });

        });

        setOrders(ordersData);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading Orders...

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-4 sm:px-6 lg:px-10 py-24">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="mb-14">

          <h1 className="text-5xl font-bold text-gray-800">

            Customer Orders 📦

          </h1>

          <p className="text-gray-500 mt-4 text-lg">

            Manage all customer orders here

          </p>

        </div>

        {/* EMPTY */}

        {orders.length === 0 && (

          <div className="bg-white rounded-[40px] p-16 text-center shadow-xl">

            <h2 className="text-4xl font-bold text-gray-700">

              No Orders Yet 😴

            </h2>

          </div>

        )}

        {/* ORDERS */}

        <div className="space-y-10">

          {orders.map((order) => (

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
              className="bg-white rounded-[40px] p-8 shadow-2xl"
            >

              {/* TOP */}

              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">

                <div>

                  <h2 className="text-3xl font-bold text-gray-800">

                    {order.customerName}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    📞 {order.phone}

                  </p>

                </div>

                <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold">

                  Order Confirmed

                </div>

              </div>

              {/* ADDRESS */}

              <div className="mt-8">

                <h3 className="text-2xl font-bold mb-3">

                  Shipping Address 📍

                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">

                  {order.address}

                </p>

              </div>

              {/* PRODUCTS */}

              <div className="mt-10">

                <h3 className="text-2xl font-bold mb-6">

                  Ordered Products 🛍️

                </h3>

                <div className="space-y-5">

                  {order.products?.map(
                    (
                      product: any,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="flex items-center justify-between bg-[#FFF8F3] rounded-3xl p-5"
                      >

                        <div className="flex items-center gap-5">

                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-24 h-24 rounded-2xl object-cover"
                          />

                          <div>

                            <h4 className="text-xl font-bold">

                              {product.title}

                            </h4>

                            <p className="text-gray-500 mt-2">

                              Quantity:
                              {" "}
                              {product.quantity}

                            </p>

                          </div>

                        </div>

                        <p className="text-2xl font-bold text-[#FFA689]">

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

              </div>

              {/* PAYMENT */}

              <div className="grid sm:grid-cols-2 gap-6 mt-10">

                <div className="bg-[#FFF8F3] rounded-3xl p-6">

                  <h3 className="text-xl font-bold mb-3">

                    Payment Method 💳

                  </h3>

                  <p className="text-lg text-gray-600">

                    {order.paymentMethod}

                  </p>

                </div>

                <div className="bg-[#FFF8F3] rounded-3xl p-6">

                  <h3 className="text-xl font-bold mb-3">

                    Total Amount 💰

                  </h3>

                  <p className="text-3xl font-bold text-[#FFA689]">

                    ₹{order.totalPrice}

                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </main>
  );
}