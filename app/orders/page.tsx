"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { db } from "@/firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {

    const querySnapshot = await getDocs(
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

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-6 py-20">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Customer Orders 📦
        </h1>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >

              <div className="space-y-3">

                <h2 className="text-2xl font-bold">
                  👤 {order.customerName}
                </h2>

                <p className="text-lg">
                  📞 {order.phone}
                </p>

                <p className="text-lg">
                  🏠 {order.address}
                </p>

                <p className="text-xl font-bold text-[#FFA689]">
                  💰 ₹{order.totalPrice}
                </p>

              </div>

              <div className="mt-8">

                <h3 className="text-2xl font-bold mb-5">
                  Ordered Products
                </h3>

                <div className="space-y-4">

                  {order.cart?.map(
                    (item: any, index: number) => (

                      <div
                        key={index}
                        className="flex items-center gap-4 border-b pb-4"
                      >

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-xl"
                        />

                        <div>

                          <h4 className="font-bold text-lg">
                            {item.title}
                          </h4>

                          <p className="text-[#FFA689] font-semibold">
                            ₹{item.price}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}