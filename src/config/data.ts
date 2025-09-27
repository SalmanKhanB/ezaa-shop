import { FooterContent } from "@/types";
import { FaApple, FaFacebookSquare, FaInstagramSquare, FaTiktok } from "react-icons/fa";
import { IoApps, IoDownload, IoLogoGooglePlaystore } from "react-icons/io5";

export const footerContent: FooterContent = {
  description: "Ezaa Shop is an online store that sells various products.",
  socialLinks: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1LaJBtgRRq/",
      icon: FaFacebookSquare,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ezaashopofficial?igsh=bnY0YmQ3MmtpMjA0",
      icon: FaInstagramSquare,
    },
    // tiktok 
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@ezaashop1",
      icon: FaTiktok,
    },
  ],
  sections: [
    {
      title: "Information",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-conditions" },
      ],
    },
  ],
  contact: {
    phone: "+923189974106",
    email: "ezaashop.official@gmail.com",
  },
  appLinks: [
    // { name: "App Store", href: "#", icon: FaApple },
    { name: "Download Apk", href: "https://drive.google.com/file/d/1aX2oWxd04YZFdvQuy7Cn2pVD7Qv1URFQ/view?usp=sharing", icon: IoDownload },
  ],
  copyright: "Copyright © 2023 Ezaa Shop. All rights reserved.",
  policies: "Terms of Use | Privacy Policy",
};
