"use client";
import { footerContent } from "@/config/data";
import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaFacebookSquare, FaInstagramSquare, FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { TbSocial } from "react-icons/tb";

const SocialFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const socialLinks = [
    {
      name: "WhatsApp",
      href: `https://wa.me/${footerContent.contact.phone.replace(/\D/g, "")}`,
      icon: FaWhatsapp,
      color: "text-white",
      bgColor: "bg-[#25D366]",
      hoverBgColor: "hover:bg-[#128C7E]",
    },
    {
      name: "Facebook",
      href: footerContent.socialLinks[0].href,
      icon: FaFacebookSquare,
      color: "text-white",
      bgColor: "bg-[#1877F2]",
      hoverBgColor: "hover:bg-[#0B5FBD]",
    },
    {
      name: "Instagram",
      href: footerContent.socialLinks[1].href,
      icon: FaInstagramSquare,
      color: "text-white",
      bgColor: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      hoverBgColor: "hover:opacity-90",
    },
    {
      name: "TikTok",
      href: footerContent.socialLinks[2].href,
      icon: FaTiktok,
      color: "text-white",
      bgColor: "bg-black",
      hoverBgColor: "hover:bg-gray-800",
    }
  ];

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-2"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col gap-3 mb-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.1 
                }}
                className={`
                  h-12 w-12 flex items-center justify-center rounded-full 
                  shadow-lg transition-all duration-300 transform
                  ${social.bgColor} ${social.hoverBgColor}
                  hover:scale-110 hover:shadow-xl
                  active:scale-95
                `}
              >
                <social.icon className={`size-6 ${social.color}`} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
         className={`
          h-12 w-12 flex items-center justify-center cursor-pointer 
          rounded-full shadow-xl transition-all duration-300
          bg-signature
          hover:shadow-2xl
          hover:bg-signature
        `}
      >
        <TbSocial className="size-8 text-white" />
      </motion.button>
    </div>
  );
};

export default SocialFloat; 