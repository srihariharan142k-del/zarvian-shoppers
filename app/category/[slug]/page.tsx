"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";

import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {

  const params = useParams();

  const slug = params.slug as string;

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {

    const fetchProducts = async () => {

      const querySnapshot = await getDocs(
        collection(db, "products")
      );

      const productsData: any[] = [];

      querySnapshot.forEach((doc) => {

        const data = doc.data();

        const categorySlug = data.category
          ?.toLowerCase()
          .replace(/\s+/g, "-");

        if (categorySlug === slug) {

          productsData.push({
            id: doc.id,
            ...data,
          });

        }

      });

      setProducts(productsData);

    };

    fetchProducts();

  }, [slug]);

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-4 sm:px-6 lg:px-10 py-20">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12 text-center capitalize">
          {slug.replace(/-/g, " ")} Products
        </h1>

        {products.length === 0 ? (

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Products Found 😢
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />

            ))}

          </div>

        )}

      </div>

    </main>
  );
}