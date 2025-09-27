"use client";

import { BsHeartFill } from "react-icons/bs";
import { usePathname } from "next/navigation";

const Favorites = () => {
  const pathname = usePathname();
  const isActive = pathname === "/favorites";
  
  return (
    <BsHeartFill className={`transition-colors size-5 ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} />
  );
};

export default Favorites;
