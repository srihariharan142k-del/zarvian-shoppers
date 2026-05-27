"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AddProductsPage() {

  const addProducts = async () => {

    const products = [

      // DIECAST CARS

      {
        title: "Hot Wheels Lamborghini",
        price: "499",
        category: "cars",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "Mini GT Nissan GTR",
        price: "899",
        category: "cars",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "Diecast Ferrari",
        price: "799",
        category: "cars",
        image:
          "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "BMW M4 Toy Car",
        price: "699",
        category: "cars",
        image:
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "Audi R8 Diecast",
        price: "999",
        category: "cars",
        image:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
      },

      // RC CARS

      {
        title: "RC Drift Car",
        price: "1499",
        category: "rc-cars",
        image:
          "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "Remote Monster Truck",
        price: "1899",
        category: "rc-cars",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "RC Racing Car",
        price: "1599",
        category: "rc-cars",
        image:
          "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop",
      },

      // GIFTS

      {
        title: "Kids Birthday Gift Box",
        price: "1299",
        category: "gifts",
        image:
          "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1200&auto=format&fit=crop",
      },

      {
        title: "Premium Teddy Bear",
        price: "899",
        category: "gifts",
        image:
          "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop",
      },

    ];

    try {

      for (const product of products) {

        await addDoc(collection(db, "products"), {
          ...product,
          createdAt: new Date(),
        });

      }

      alert("All Products Added Successfully ✅");

    } catch (error) {

      console.log(error);

      alert("Error Adding Products ❌");

    }

  };

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#FFFDD1]">

      <button
        onClick={addProducts}
        className="bg-[#FFA689] text-white px-10 py-5 rounded-3xl text-2xl font-bold shadow-xl"
      >
        Upload 10 Products 🚀
      </button>

    </main>
  );
}