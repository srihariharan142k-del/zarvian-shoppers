import Navbar from "@/components/Navbar";

import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import NewArrivals from "@/components/NewArrivals";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import OfferSlider from "@/components/OfferSlider";
import FeaturedCategories from "@/components/FeaturedCategories";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDD1]">
      <Navbar />
      <Hero />
      <CategorySection />
      <NewArrivals />
      <Footer />
      <WhatsappButton />
      <OfferSlider />
      <FeaturedCategories />
    </main>
  );
}