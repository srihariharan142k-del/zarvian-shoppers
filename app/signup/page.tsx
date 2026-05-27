"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import { motion } from "framer-motion";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SIGNUP

  const handleSignup = async () => {

    if (
      !name ||
      !email ||
      !password
    ) {

      alert(
        "Fill all details ❌"
      );

      return;

    }

    try {

      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(
        "Account Created Successfully ✅"
      );

      router.push(
        "/login"
      );

    } catch (error: any) {

      console.log(error);

      alert(
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#FFFDD1] flex items-center justify-center px-4 py-20">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10"
      >

        {/* TITLE */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-gray-800">

            Create Account ✨

          </h1>

          <p className="text-gray-500 mt-4 text-lg">

            Join and start shopping today

          </p>

        </div>

        {/* FORM */}

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 p-5 rounded-2xl outline-none focus:border-[#FFA689]"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 p-5 rounded-2xl outline-none focus:border-[#FFA689]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 p-5 rounded-2xl outline-none focus:border-[#FFA689]"
          />

          <button
            onClick={
              handleSignup
            }
            disabled={loading}
            className="w-full bg-[#FFA689] text-white py-5 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300 shadow-xl"
          >

            {loading
              ? "Creating..."
              : "Create Account 🚀"}

          </button>

        </div>

        {/* LOGIN */}

        <div className="text-center mt-8">

          <p className="text-gray-600 text-lg">

            Already have an account?

            <Link
              href="/login"
              className="text-[#FFA689] font-bold ml-2"
            >

              Login

            </Link>

          </p>

        </div>

      </motion.div>

    </main>
  );
}