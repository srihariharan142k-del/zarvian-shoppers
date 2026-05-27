"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export default function CheckoutPage() {

  const router = useRouter();

  const [products, setProducts] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  // COUPON

  const [couponCode, setCouponCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  // LOAD PRODUCTS

  useEffect(() => {

    const buyNowProducts =
      JSON.parse(
        localStorage.getItem(
          "checkoutItems"
        ) || "[]"
      );

    const cartProducts =
      JSON.parse(
        localStorage.getItem(
          "cart"
        ) || "[]"
      );

    if (buyNowProducts.length > 0) {

      setProducts(buyNowProducts);

    } else {

      setProducts(cartProducts);

    }

  }, []);

  // TOTAL

  const totalPrice =
    products.reduce(
      (acc, item) =>
        acc +
        Number(item.price) *
          item.quantity,
      0
    );

  // APPLY COUPON

  const applyCoupon = () => {

    if (
      couponCode === "SAVE10"
    ) {

      setDiscount(10);

      alert(
        "10% Discount Applied 🎉"
      );

    } else if (
      couponCode === "TOY20"
    ) {

      setDiscount(20);

      alert(
        "20% Discount Applied 🎉"
      );

    } else if (
      couponCode === "FIRST50"
    ) {

      setDiscount(50);

      alert(
        "50% Discount Applied 🎉"
      );

    } else {

      setDiscount(0);

      alert(
        "Invalid Coupon ❌"
      );

    }

  };

  // FINAL PRICE

  const finalPrice =
    totalPrice -
    (totalPrice * discount) / 100;

  // PLACE ORDER

  const handlePlaceOrder = async () => {

    if (
      !name ||
      !phone ||
      !address
    ) {

      alert(
        "Fill all details ❌"
      );

      return;

    }

    try {

      const orderData = {
        customerName: name,
        phone,
        address,
        paymentMethod,
        products,
        totalPrice: finalPrice,
        discount,
        couponCode,
        orderStatus:
          "Order Placed",
        createdAt: new Date(),
      };

      // SAVE FIREBASE

      await addDoc(
        collection(db, "orders"),
        orderData
      );

      // SAVE LOCAL

      localStorage.setItem(
        "latestOrder",
        JSON.stringify(orderData)
      );

      // WHATSAPP MESSAGE

      const whatsappNumber =
        "916380539629";

      const orderMessage = `
🛍️ New Order Received

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Products:
${products
  .map(
    (item: any) =>
      `• ${item.title} x${item.quantity} = ₹${
        Number(item.price) *
        item.quantity
      }`
  )
  .join("\n")}

🎟️ Coupon: ${couponCode || "No Coupon"}

🔥 Discount: ${discount}%

💰 Final Total: ₹${finalPrice}

🚚 Payment: ${paymentMethod}
`;

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          orderMessage
        )}`;

      // CLEAR STORAGE

      localStorage.removeItem(
        "cart"
      );

      localStorage.removeItem(
        "checkoutItems"
      );

      // OPEN WHATSAPP

      window.open(
        whatsappURL,
        "_blank"
      );

      // SUCCESS PAGE

      router.push(
        "/order-success"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Order Failed ❌"
      );

    }

  };

  return (

    <main className="min-h-screen bg-[#FFFDD1] dark:bg-slate-900 px-4 sm:px-6 lg:px-10 py-28">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
            Checkout 🛍️
          </h1>

          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">
            Complete your order details
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-white dark:bg-slate-800 rounded-[40px] p-8 shadow-xl"
          >

            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
              Shipping Details
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
              />

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
              />

              <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                rows={5}
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
              />

              {/* PAYMENT */}

              <div>

                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Payment Method
                </h3>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
                >

                  <option>
                    Cash On Delivery
                  </option>

                  <option>
                    UPI Payment
                  </option>

                  <option>
                    Debit / Credit Card
                  </option>

                </select>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-white dark:bg-slate-800 rounded-[40px] p-8 shadow-xl h-fit"
          >

            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-6">

              {products.map(
                (product, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-gray-200 dark:border-slate-700 pb-5"
                  >

                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                        {product.title}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-300 mt-1">
                        Qty:
                        {
                          product.quantity
                        }
                      </p>

                    </div>

                    <p className="font-bold text-[#FFA689] text-xl">
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

            {/* COUPON */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Apply Coupon 🎟️
              </h3>

              <div className="flex gap-4">

                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(
                      e.target.value
                    )
                  }
                  className="flex-1 border-2 border-gray-200 p-4 rounded-2xl outline-none bg-transparent"
                />

                <button
                  onClick={applyCoupon}
                  className="bg-black text-white px-6 rounded-2xl font-bold"
                >

                  Apply

                </button>

              </div>

              {discount > 0 && (

                <p className="text-green-600 font-bold mt-4 text-lg">

                  {discount}% Discount Applied 🎉

                </p>

              )}

            </div>

            {/* TOTAL */}

            <div className="flex justify-between items-center mt-10">

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Total
              </h2>

              <motion.p
                key={finalPrice}
                initial={{
                  scale: 0.8,
                }}
                animate={{
                  scale: 1,
                }}
                className="text-4xl font-bold text-[#FFA689]"
              >
                ₹{finalPrice}
              </motion.p>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                handlePlaceOrder
              }
              className="w-full mt-10 bg-[#FFA689] text-white py-5 rounded-full text-xl font-bold hover:scale-105 transition duration-300 shadow-xl"
            >

              Place Order 🚀

            </button>

          </motion.div>

        </div>

      </div>

    </main>
  );
}