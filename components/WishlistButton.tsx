"use client";

import { useEffect, useState } from "react";

interface Props {
  product: any;
}

export default function WishlistButton({
  product,
}: Props) {

  const [liked, setLiked] =
    useState(false);

  // CHECK EXISTING

  useEffect(() => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        ) || "[]"
      );

    const alreadyLiked =
      existing.find(
        (item: any) =>
          item.id === product.id
      );

    setLiked(!!alreadyLiked);

  }, [product.id]);

  // TOGGLE WISHLIST

  const handleWishlist = () => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        ) || "[]"
      );

    if (liked) {

      const updated =
        existing.filter(
          (item: any) =>
            item.id !== product.id
        );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updated)
      );

      setLiked(false);

    } else {

      existing.push(product);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(existing)
      );

      setLiked(true);

    }

  };

  return (

    <button
      onClick={handleWishlist}
      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl transition duration-300 ${
        liked
          ? "bg-red-500 text-white scale-110"
          : "bg-white text-gray-700 hover:scale-110"
      }`}
    >

      {liked ? "❤️" : "🤍"}

    </button>
  );
}