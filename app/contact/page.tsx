"use client";

import { motion } from "framer-motion";

import {
  Phone,
  Globe,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {

  return (

    <main className="min-h-screen relative overflow-hidden bg-black text-white">

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/75" />

      {/* CONTENT */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-24">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >

          <p className="text-[#FFA689] text-lg sm:text-xl font-semibold mb-4">
            🚀 Build Your Dream Website
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Zarvian Web <br />
            Solutions 💻
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mt-8 leading-relaxed">
            We create premium ecommerce websites, business websites,
            portfolio websites and modern responsive web applications
            with professional UI/UX at affordable prices.
          </p>

        </motion.div>

        {/* CARDS */}

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          {/* PHONE */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >

            <div className="bg-[#FFA689] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">

              <Phone size={30} />

            </div>

            <h2 className="text-2xl font-bold mb-4">
              Contact Number
            </h2>

            <p className="text-gray-300 text-lg">
              Need a website for your business or brand?
            </p>

            <a
              href="tel:6380539629"
              className="inline-block mt-6 text-[#FFA689] text-2xl font-bold hover:underline"
            >
              +91 6380539629
            </a>

          </motion.div>

          {/* INSTAGRAM */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >

            <div className="bg-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">

              <span className="text-3xl">📸</span>

            </div>

            <h2 className="text-2xl font-bold mb-4">
              Instagram
            </h2>

            <p className="text-gray-300 text-lg">
              Follow our page and DM us for website enquiries.
            </p>
<a
  href="https://www.instagram.com/zarvianwebsolutions/"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300"
>
  📸 DM On Instagram
</a>

          </motion.div>

          {/* SERVICES */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >

            <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">

              <Globe size={30} />

            </div>

            <h2 className="text-2xl font-bold mb-4">
              Our Services
            </h2>

            <ul className="space-y-3 text-gray-300 text-lg">

              <li>✅ Ecommerce Websites</li>

              <li>✅ Business Websites</li>

              <li>✅ Portfolio Websites</li>

              <li>✅ Admin Dashboard</li>

              <li>✅ Responsive UI Design</li>

            </ul>

          </motion.div>

        </div>

        {/* CTA SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-[#FFA689] to-orange-500 rounded-[40px] p-10 sm:p-16 text-center shadow-2xl"
        >

          <div className="flex justify-center mb-6">

            <div className="bg-white text-[#FFA689] p-5 rounded-full">

              <MessageCircle size={40} />

            </div>

          </div>

          <h2 className="text-4xl sm:text-5xl font-bold">
            Need A Professional Website?
          </h2>

          <p className="text-lg sm:text-xl mt-6 text-white/90 max-w-3xl mx-auto leading-relaxed">
            We build modern premium websites with smooth animations,
            mobile responsive layouts, ecommerce systems and admin dashboards
            for startups, shops and businesses at budget friendly prices.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">

            <a
              href="tel:6380539629"
              className="bg-white text-[#FFA689] px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300"
            >
              📞 Call Now
            </a>

            <a
              href="https://instagram.com/zarvianwebsolutions"
              target="_blank"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition duration-300"
            >
              📸 DM On Instagram
            </a>

          </div>

        </motion.div>

      </div>

    </main>
  );
}