export default function Footer() {
  return (
    <footer className="bg-white mt-20 px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold text-[#FFA689]">
            Zarvian Shoppers
          </h2>

          <p className="mt-4 text-gray-600">
            Unwrapping Smiles Every Day 🎁
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Categories
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>RC Cars</li>
            <li>Hot Wheels</li>
            <li>Soft Toys</li>
            <li>Gift Boxes</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold text-xl mb-4">
            Contact
          </h3>

          <ul className="space-y-3 text-gray-600">
            <li>📍 Chennai, Tamil Nadu</li>
            <li>📞 +91 6380539629</li>
            <li>📸 Instagram</li>
          </ul>
        </div>

      </div>

      <div className="border-t mt-12 pt-6 text-center text-gray-500">
        © 2026 Zarvian Shoppers. All rights reserved.
      </div>

    </footer>
  );
}