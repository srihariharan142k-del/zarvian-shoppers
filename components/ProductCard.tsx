"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Props = {
  id: string;
  title: string;
  price: string;
  image: string;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
}: Props) {

 const cartContext = useCart();

  return (
    <div className="bg-white rounded-3xl p-4 shadow-lg hover:scale-105 transition duration-300">

      <Link href={`/products/${id}`}>

        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-2xl"
        />

        <h3 className="text-xl font-bold mt-4 text-gray-800">
          {title}
        </h3>

        <p className="text-[#FFA689] text-lg font-semibold mt-2">
          ₹{price}
        </p>

      </Link>

      <button
        onClick={() =>
         cartContext.addToCart({
  id,
  title,
  price,
  image,
})
        }
        className="w-full mt-4 bg-[#FFA689] text-white py-3 rounded-2xl font-semibold"
      >
        Add To Cart
      </button>

    </div>
  );
}