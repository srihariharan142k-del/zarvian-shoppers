"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase/config";
import WishlistButton from "@/components/WishlistButton";

import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { motion } from "framer-motion";

export default function ProductDetails() {

  const params = useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [relatedProducts, setRelatedProducts] =
    useState<any[]>([]);

  const [quantity, setQuantity] =
    useState(1);

  // FETCH PRODUCT

  useEffect(() => {

    const fetchProduct = async () => {

      if (!params.id) return;

      const docRef = doc(
        db,
        "products",
        params.id as string
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {

        const data: any = {
          id: docSnap.id,
          ...docSnap.data(),
        };

        setProduct(data);

        // RELATED PRODUCTS

        const querySnapshot =
          await getDocs(
            collection(db, "products")
          );

        const related: any[] = [];

        querySnapshot.forEach((item) => {

          if (
            item.id !== docSnap.id &&
            item.data().category ===
              data.category
          ) {

            related.push({
              id: item.id,
              ...item.data(),
            });

          }

        });

        setRelatedProducts(
          related.slice(0, 4)
        );

      }

    };

    fetchProduct();

  }, [params.id]);

  // LOADING

  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );

  }

  // ADD TO CART

  const handleAddToCart = () => {

    const existingCart =
      JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

    const existingProduct =
      existingCart.find(
        (item: any) =>
          item.id === product.id
      );

    if (existingProduct) {

      existingProduct.quantity += quantity;

    } else {

      existingCart.push({
        ...product,
        quantity,
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added To Cart ✅");

  };

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-4 sm:px-6 lg:px-10 py-28">

      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white p-6 rounded-[40px] shadow-2xl relative"
          >

            {/* WISHLIST */}

            <div className="absolute top-8 right-8 z-20">
              <WishlistButton product={product} />
            </div>

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={product.image}
              alt={product.title}
              className="w-full h-[350px] sm:h-[500px] object-cover rounded-[30px]"
            />

          </motion.div>

          {/* DETAILS */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="text-[#FFA689] text-lg font-semibold mb-3">
              ⭐ Premium Collection
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-6">

              <p className="text-4xl font-bold text-[#FFA689]">
                ₹{product.price}
              </p>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                In Stock
              </span>

            </div>

            {/* RATING */}

            <div className="flex items-center gap-2 mt-6 text-yellow-500 text-2xl">

              ⭐⭐⭐⭐⭐

              <span className="text-gray-600 text-lg">
                (4.9 Ratings)
              </span>

            </div>

            {/* DESCRIPTION */}

            <p className="text-gray-600 text-lg leading-relaxed mt-8">

              Premium quality toy product with modern design,
              smooth finishing and perfect gift choice for kids.

            </p>

            {/* QUANTITY */}

            <div className="mt-10">

              <h3 className="text-xl font-bold mb-4">
                Quantity
              </h3>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                  className="bg-white shadow-lg w-12 h-12 rounded-full text-2xl"
                >
                  -
                </button>

                <span className="text-2xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="bg-white shadow-lg w-12 h-12 rounded-full text-2xl"
                >
                  +
                </button>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap items-center gap-5 mt-10">

              <button
                onClick={handleAddToCart}
                className="bg-[#FFA689] text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-xl"
              >
                Add To Cart 🛒
              </button>

              <button
                onClick={() => {

                  const buyNowItem = [
                    {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: quantity,
                    },
                  ];

                  localStorage.setItem(
                    "checkoutItems",
                    JSON.stringify(buyNowItem)
                  );

                  window.location.href =
                    "/checkout";

                }}
                className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-xl"
              >
                Buy Now ⚡
              </button>

            </div>

            {/* DELIVERY */}

            <div className="mt-12 bg-white p-6 rounded-3xl shadow-lg">

              <h3 className="text-2xl font-bold mb-4">
                🚚 Delivery Information
              </h3>

              <ul className="space-y-3 text-gray-600 text-lg">

                <li>✅ Free Delivery Available</li>

                <li>✅ Cash On Delivery</li>

                <li>✅ Easy Return Policy</li>

                <li>✅ Fast Shipping Across India</li>

              </ul>

            </div>

          </motion.div>

        </div>

        {/* RELATED PRODUCTS */}

        <div className="mt-24">

          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Related Products 🔥
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {relatedProducts.map((item) => (

              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[30px] overflow-hidden shadow-xl relative"
              >

                <div className="absolute top-4 right-4 z-20">
                  <WishlistButton product={item} />
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-[#FFA689] text-2xl font-bold mt-3">
                    ₹{item.price}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}