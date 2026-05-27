"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { auth, db } from "@/firebase/config";

export default function AdminPage() {

  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  // MULTIPLE IMAGES

  const [images, setImages] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState<any[]>([]);

  // AUTH PROTECTION

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          if (!user) {

            router.push(
              "/login"
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, [router]);

  // FETCH PRODUCTS

  const fetchProducts =
    async () => {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "products"
          )
        );

      const productsData: any[] =
        [];

      querySnapshot.forEach(
        (docItem) => {

          productsData.push({
            id: docItem.id,
            ...docItem.data(),
          });

        }
      );

      setProducts(
        productsData
      );

    };

  useEffect(() => {

    fetchProducts();

  }, []);

  // ADD PRODUCT

  const handleAddProduct =
    async () => {

      try {

        if (
          !title ||
          !price ||
          !category ||
          images.length === 0
        ) {

          alert(
            "Fill all fields"
          );

          return;

        }

        setLoading(true);

        // SAVE FIRESTORE

        await addDoc(
          collection(
            db,
            "products"
          ),
          {
            title,
            price,
            category,

            // MAIN IMAGE

            image: images[0],

            // MULTIPLE IMAGES

            images,

            createdAt:
              new Date(),
          }
        );

        alert(
          "Product Added ✅"
        );

        setTitle("");
        setPrice("");
        setCategory("");
        setImages([]);

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed ❌"
        );

      } finally {

        setLoading(false);

      }

    };

  // DELETE PRODUCT

  const handleDelete =
    async (id: string) => {

      await deleteDoc(
        doc(
          db,
          "products",
          id
        )
      );

      fetchProducts();

    };

  // LOGOUT

  const handleLogout =
    async () => {

      await signOut(auth);

      router.push(
        "/login"
      );

    };

  return (

    <main className="min-h-screen bg-[#FFFDD1] dark:bg-slate-900 px-4 sm:px-6 lg:px-10 py-24">

      <div className="max-w-6xl mx-auto">

        {/* TOP */}

        <div className="flex items-center justify-between mb-10">

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">

            Admin Dashboard 🛍️

          </h1>

          <button
            onClick={
              handleLogout
            }
            className="bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold"
          >

            Logout

          </button>

        </div>

        {/* FORM */}

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl">

          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">

            Upload Product

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Product Name"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="border-2 border-gray-300 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="border-2 border-gray-300 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="border-2 border-gray-300 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
            />

            {/* MULTIPLE IMAGE URLS */}

            <textarea
              placeholder="Paste Image URLs separated by commas"
              value={images.join(",")}
              onChange={(e) =>
                setImages(
                  e.target.value
                    .split(",")
                    .map((img) =>
                      img.trim()
                    )
                )
              }
              rows={4}
              className="border-2 border-gray-300 p-4 rounded-2xl outline-none focus:border-[#FFA689] bg-transparent"
            />

          </div>

          {/* PREVIEW */}

          {images.length > 0 && (

            <div className="flex gap-4 overflow-x-auto mt-8">

              {images.map(
                (
                  image,
                  index
                ) => (

                  <img
                    key={index}
                    src={image}
                    alt="preview"
                    className="w-28 h-28 rounded-2xl object-cover border-4 border-[#FFA689]"
                  />

                )
              )}

            </div>

          )}

          <button
            onClick={
              handleAddProduct
            }
            disabled={loading}
            className="w-full mt-8 bg-[#FFA689] text-white py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition"
          >

            {loading
              ? "Uploading..."
              : "Add Product"}

          </button>

        </div>

        {/* PRODUCTS */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">

            All Products

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {products.map(
              (product) => (

                <div
                  key={
                    product.id
                  }
                  className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-lg flex items-center justify-between"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        product
                          .images?.[0] ||
                        product.image
                      }
                      alt={
                        product.title
                      }
                      className="w-24 h-24 rounded-2xl object-cover"
                    />

                    <div>

                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">

                        {
                          product.title
                        }

                      </h3>

                      <p className="text-[#FFA689] font-semibold mt-1">

                        ₹
                        {
                          product.price
                        }

                      </p>

                      <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">

                        {
                          product.category
                        }

                      </p>

                      <p className="text-sm text-gray-400 mt-1">

                        {
                          product
                            .images
                            ?.length || 1
                        }{" "}
                        Images

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        product.id
                      )
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                  >

                    Delete

                  </button>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>
  );
}