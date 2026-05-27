"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {

  const phoneNumber = "916380539629";

  const message =
    "Hello 👋 I want to know about your toys collection";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (

    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999]"
    >

      <div className="bg-green-500 hover:scale-110 transition duration-300 shadow-2xl rounded-full p-4 animate-bounce">

        <MessageCircle
          size={34}
          className="text-white"
        />

      </div>

    </a>
  );
}