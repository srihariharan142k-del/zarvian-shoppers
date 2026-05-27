"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import { Star } from "lucide-react";

import { motion } from "framer-motion";

interface Props {
  productId: string;
}

export default function ProductReviews({
  productId,
}: Props) {

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [loading, setLoading] =
    useState(false);

  // FETCH REVIEWS

  useEffect(() => {

    const fetchReviews =
      async () => {

        try {

          const q = query(
            collection(db, "reviews"),
            where(
              "productId",
              "==",
              productId
            )
          );

          const querySnapshot =
            await getDocs(q);

          const reviewsData: any[] =
            [];

          querySnapshot.forEach(
            (doc) => {

              reviewsData.push({
                id: doc.id,
                ...doc.data(),
              });

            }
          );

          setReviews(reviewsData);

        } catch (error) {

          console.log(error);

        }

      };

    fetchReviews();

  }, [productId]);

  // ADD REVIEW

  const handleAddReview =
    async () => {

      if (
        !name ||
        !comment
      ) {

        alert(
          "Fill all fields ❌"
        );

        return;

      }

      try {

        setLoading(true);

        const reviewData = {
          productId,
          name,
          comment,
          rating,
          createdAt:
            new Date(),
        };

        await addDoc(
          collection(
            db,
            "reviews"
          ),
          reviewData
        );

        setReviews([
          reviewData,
          ...reviews,
        ]);

        setName("");
        setComment("");
        setRating(5);

        alert(
          "Review Added ⭐"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="mt-24">

      {/* TITLE */}

      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-10">

        Customer Reviews ⭐

      </h2>

      {/* FORM */}

      <div className="bg-white dark:bg-slate-800 rounded-[35px] p-8 shadow-xl">

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 dark:border-slate-700 p-4 rounded-2xl outline-none bg-transparent"
          />

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            rows={4}
            className="w-full border-2 border-gray-200 dark:border-slate-700 p-4 rounded-2xl outline-none bg-transparent"
          />

          {/* RATING */}

          <div className="flex items-center gap-3">

            {[1, 2, 3, 4, 5].map(
              (star) => (

                <button
                  key={star}
                  onClick={() =>
                    setRating(
                      star
                    )
                  }
                >

                  <Star
                    size={32}
                    fill={
                      rating >=
                      star
                        ? "currentColor"
                        : "none"
                    }
                    className="text-yellow-500"
                  />

                </button>

              )
            )}

          </div>

          <button
            onClick={
              handleAddReview
            }
            disabled={loading}
            className="bg-[#FFA689] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition duration-300 shadow-lg"
          >

            {loading
              ? "Posting..."
              : "Submit Review ⭐"}

          </button>

        </div>

      </div>

      {/* REVIEWS */}

      <div className="space-y-6 mt-10">

        {reviews.length === 0 && (

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg">

            <p className="text-gray-500 dark:text-gray-300 text-lg">

              No reviews yet 😴

            </p>

          </div>

        )}

        {reviews.map(
          (review, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">

                  {review.name}

                </h3>

                <div className="flex items-center gap-1 text-yellow-500">

                  {Array.from({
                    length:
                      review.rating,
                  }).map(
                    (_, i) => (

                      <Star
                        key={i}
                        size={20}
                        fill="currentColor"
                      />

                    )
                  )}

                </div>

              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg leading-relaxed">

                {review.comment}

              </p>

            </motion.div>

          )
        )}

      </div>

    </div>
  );
}