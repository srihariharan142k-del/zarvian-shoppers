"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import { useRouter } from "next/navigation";

import {
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  // CHECK USER

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

        }
      );

    return () => unsubscribe();

  }, []);

  // LOGOUT

  const handleLogout = async () => {

    await signOut(auth);

    router.push("/login");

  };

  return (

    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg z-50 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">

        {/* LOGO */}

        <Link href="/">

          <h1 className="text-2xl sm:text-3xl font-bold text-[#FFA689] cursor-pointer">

            Zarvian Store 🧸

          </h1>

        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8 text-lg font-semibold text-gray-700">

          <Link
            href="/"
            className="hover:text-[#FFA689] transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="hover:text-[#FFA689] transition"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="hover:text-[#FFA689] transition"
          >
            Cart
          </Link>

          <Link
            href="/wishlist"
            className="hover:text-[#FFA689] transition"
          >
            Wishlist
          </Link>

        </div>

        {/* DESKTOP AUTH */}

        <div className="hidden md:flex items-center gap-4">

  <DarkModeToggle />

          {user ? (

            <>

              <div className="flex flex-col items-end">

                <p className="font-bold text-gray-800 text-sm">

                  {user.email}

                </p>

                <span className="text-sm text-green-600">

                  Logged In

                </span>

              </div>

              <button
                onClick={handleLogout}
                className="bg-black text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition duration-300"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link href="/login">

                <button className="bg-white border-2 border-[#FFA689] text-[#FFA689] px-5 py-2 rounded-full font-bold hover:bg-[#FFA689] hover:text-white transition duration-300">

                  Login

                </button>

              </Link>

              <Link href="/signup">

                <button className="bg-[#FFA689] text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition duration-300 shadow-lg">

                  Signup

                </button>

              </Link>

            </>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden"
        >

          {menuOpen ? (

            <X size={32} />

          ) : (

            <Menu size={32} />

          )}

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t shadow-lg px-6 py-6 space-y-5">

          <Link
            href="/"
            className="block text-lg font-semibold"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            href="/products"
            className="block text-lg font-semibold"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="block text-lg font-semibold"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Cart
          </Link>

          <Link
            href="/wishlist"
            className="block text-lg font-semibold"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Wishlist
          </Link>

          {user ? (

            <>

              <div className="pt-4 border-t">

                <p className="font-bold text-gray-800">

                  {user.email}

                </p>

                <p className="text-green-600 text-sm mt-1">

                  Logged In

                </p>

              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-black text-white py-3 rounded-full font-bold mt-4"
              >

                Logout

              </button>

            </>

          ) : (
            

            <div className="flex flex-col gap-4 pt-4 border-t">
              <div className="pb-4 border-b flex justify-center">
  <DarkModeToggle />
</div>

              <Link href="/login">

                <button className="w-full border-2 border-[#FFA689] text-[#FFA689] py-3 rounded-full font-bold">

                  Login

                </button>

              </Link>

              <Link href="/signup">

                <button className="w-full bg-[#FFA689] text-white py-3 rounded-full font-bold">

                  Signup

                </button>

              </Link>

            </div>

          )}

        </div>

      )}

    </nav>
  );
}