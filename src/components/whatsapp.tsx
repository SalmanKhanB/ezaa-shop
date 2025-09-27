"use client";
import { footerContent } from "@/config/data";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  const [showButton, setShowButton] = useState(false);
  const phone = footerContent?.contact?.phone;
  const whatsappUrl = `https://wa.me/${phone?.replace(/\D/g, "")}`;
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {showButton && (
        <div
          className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-green-500 hover:text-green-600 hover:bg-gray-50 transition-colors"
        >
          Chat with us
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="h-14 w-14 flex items-center justify-center cursor-pointer bg-muted/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-muted/80 transition-colors"
        onClick={() => setShowButton((prev) => !prev)}
      >
        <FaWhatsapp className="size-8 text-green-500" />
      </a>
    </div>
  );
};

export default Whatsapp;
