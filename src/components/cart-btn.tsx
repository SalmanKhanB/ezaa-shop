"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { IoCart } from "react-icons/io5";
import { usePathname } from "next/navigation";

const CartButton = () => {
   const pathname = usePathname();
   const isActive = pathname === "/cart";
  
  return (
    <IoCart className={`transition-colors size-5 ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} />
  );
};

export default CartButton;
