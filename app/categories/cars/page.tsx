"use client";

import ProductCard from "@/components/ProductCard";

const cars = [

  {
    id: "dc1",
    title: "Hot Wheels Nissan GTR",
    price: "499",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc2",
    title: "Diecast Lamborghini",
    price: "899",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc3",
    title: "RC Drift Car",
    price: "1499",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc4",
    title: "Mini Porsche GT",
    price: "799",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc5",
    title: "Ferrari Sports Car",
    price: "999",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc6",
    title: "Bugatti Chiron Toy",
    price: "1299",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc7",
    title: "BMW M4 Diecast",
    price: "899",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc8",
    title: "Mercedes AMG Toy",
    price: "1099",
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc9",
    title: "Off Road Jeep RC",
    price: "1799",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: "dc10",
    title: "Classic Mustang",
    price: "999",
    image:
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=800&auto=format&fit=crop",
  },

];

export default function CarsCategoryPage() {

  return (

    <main className="min-h-screen bg-[#FFFDD1] px-4 sm:px-6 lg:px-10 py-24">

      {/* TITLE */}

      <div className="text-center mb-16">

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Diecast Cars Collection 🚗
        </h1>

        <p className="text-gray-600 mt-5 text-lg">
          Premium Hot Wheels, RC Cars & Collectible Models
        </p>

      </div>

      {/* PRODUCTS */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {cars.map((car) => (

          <ProductCard
            key={car.id}
            id={car.id}
            title={car.title}
            price={car.price}
            image={car.image}
          />

        ))}

      </div>

    </main>
  );
}