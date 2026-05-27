"use client";

import Link from "next/link";

export default function ProductCard({
  product,
}: any) {
  return (

    <Link href={`/products/${product.id}`}>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.03] transition duration-300">

        {/* IMAGE */}

        <div className="overflow-hidden">

          <img
            src={product.image}
            alt={product.title}
            className="w-full h-36 sm:h-52 object-cover hover:scale-105 transition duration-300"
          />

        </div>

        {/* CONTENT */}

        <div className="p-3">

          <p className="text-gray-400 text-[11px] sm:text-xs">
            {product.category}
          </p>

          <h2 className="text-sm sm:text-lg font-semibold line-clamp-2 mt-1">
            {product.title}
          </h2>

          <p className="text-[#FFA689] font-bold text-base sm:text-lg mt-2">
            ₹{product.price}
          </p>

          <button className="w-full mt-3 bg-[#FFA689] text-white py-2 rounded-xl text-xs sm:text-sm font-semibold hover:opacity-90 transition">

            View Product

          </button>

        </div>

      </div>

    </Link>
  );
}