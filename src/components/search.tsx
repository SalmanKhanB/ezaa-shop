"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

const SearchProducts = () => {
  const pathname = usePathname();
  const isActive = pathname === "/search";
  
  return (
    <Search className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} />
  );
};

export default SearchProducts;
