"use client";

import { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { footerContent } from "@/config/data";

const SocialText = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = 600; // Show after scrolling past hero and categories
      
      setIsVisible(scrollPosition > triggerPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: footerContent.socialLinks[0].href,
      color: "text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: footerContent.socialLinks[1].href,
      color: "text-pink-600",
    },
    {
      name: "TikTok",
      icon: ({ className }: { className?: string }) => (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      href: footerContent.socialLinks[2].href,
      color: "text-black",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/${footerContent.contact.phone.replace(/\D/g, "")}`,
      color: "text-green-600",
    },
  ];

  return (
    <div 
      className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Social icons */}
        <div className="flex flex-col items-center space-y-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 transition-all duration-300 hover:scale-125 hover:shadow-xl flex items-center justify-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${social.color}`} />
                <span className="sr-only">{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialText; 