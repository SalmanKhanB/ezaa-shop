"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "./brand";
import CartButton from "./cart-btn";
import Container from "./container";
import Favorites from "./favorites";
import SearchProducts from "./search";
import { H3 } from "./typography";
import UserBtn from "./profile-btn";
import NotificationsBtn from "./notifications-btn";
import { useAppSelector } from "@/lib/store/hooks";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const login = pathname.includes("/login");
  const signup = pathname.includes("/signup");
  const auth = login || signup;
  return (
    <motion.header
      className={cn(
        "sticky top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b"
      )}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Container className="w-full flex items-center py-2">
      <Container className="w-full flex items-center py-2">
        <div className="flex-1 flex justify-start items-center">
          <Brand />
          {auth && (
            <H3 className="text-signature ml-4">
              {login ? "Login" : "Sign Up"}
            </H3>
          )}
        </div>
        {auth ? (
          <>
            <Link href="#" className="text-signature">
              Need help?
            </Link>
          </>
        ) : (
          <>
            {/* <div className="flex-1 flex justify-center">
              <SearchProducts />
              </div> */}
            <div className="flex-1 flex justify-end">
              <ActionButtons />
            </div>
          </>
        )}
      </Container>
    </motion.header>
  );
};

export default Navbar;

const ActionButtons = () => {
  const pathname = usePathname();
  const { products } = useAppSelector((store) => store.cart);
  const { userId } = useAppSelector((store) => store.auth);
  const items = products?.length;

  const handleAuthRequired = (e: React.MouseEvent) => {
    if (!userId || userId === -1) {
      e.preventDefault();
      window.location.href = '/auth/login';
    }
  };
  
  return (
    <div className="flex items-center gap-3 lg:gap-6 h-full">
      {/* Home - Hidden on mobile */}
      <div className="group hidden lg:block h-full">
        <Link href="/" className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2">
          <div className="flex items-center gap-2">
            <HomeIcon />
            <span className={`text-sm font-medium hidden lg:block transition-colors ${pathname === "/" ? 'text-signature' : 'group-hover:text-signature'}`}>Home</span>
          </div>
          {pathname === "/" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signature rounded-full" />
          )}
        </Link>
      </div>
      
      {/* About */}
      <div className="group h-full">
        <Link href="/about" className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2 w-9 h-9 lg:w-auto lg:h-auto">
          <div className="flex items-center gap-2">
            <AboutIcon />
            <span className={`text-sm font-medium hidden lg:block transition-colors ${pathname === "/about" ? 'text-signature' : 'group-hover:text-signature'}`}>About</span>
          </div>
          {pathname === "/about" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signature rounded-full" />
          )}
        </Link>
      </div>
      
      {/* Contact */}
      <div className="group h-full">
        <Link href="/contact-us" className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2 w-9 h-9 lg:w-auto lg:h-auto">
          <div className="flex items-center gap-2">
            <ContactIcon />
            <span className={`text-sm font-medium hidden lg:block transition-colors ${pathname === "/contact-us" ? 'text-signature' : 'group-hover:text-signature'}`}>Contact</span>
          </div>
          {pathname === "/contact-us" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signature rounded-full" />
          )}
        </Link>
      </div>
      
      {/* Search - Hidden on mobile */}
      <div className="group hidden lg:block h-full">
        <Link href="/search" className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2">
          <div className="flex items-center gap-2">
            <SearchProducts />
            <span className={`text-sm font-medium hidden lg:block transition-colors ${pathname === "/search" ? 'text-signature' : 'group-hover:text-signature'}`}>Search</span>
          </div>
          {pathname === "/search" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signature rounded-full" />
          )}
        </Link>
      </div>
      
      {/* Favorites - Hidden on mobile */}
      <div className="group hidden lg:block h-full">
        <Link href="/favorites" onClick={handleAuthRequired} className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2">
          <div className="flex items-center gap-2">
            <Favorites />
            <span className={`text-sm font-medium hidden lg:block transition-colors ${pathname === "/favorites" ? 'text-signature' : 'group-hover:text-signature'}`}>Favorites</span>
          </div>
          {pathname === "/favorites" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signature rounded-full" />
          )}
        </Link>
      </div>
      
      {/* Cart */}
      <div className="group h-full">
        <Link href="/cart" onClick={handleAuthRequired} className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2 w-9 h-9 lg:w-auto lg:h-auto">
          <div className="flex items-center gap-2">
            <CartButton />
            <span className={`text-sm font-medium hidden lg:block transition-colors relative ${pathname === "/cart" ? 'text-signature' : 'group-hover:text-signature'}`}>
              Cart
              {items > 0 && (
                <span className="absolute -top-1 -right-0 bg-signature text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                  {items}
                </span>
              )}
            </span>
          </div>
          {pathname === "/cart" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-signature rounded-full" />
          )}
        </Link>
      </div>
      
      {/* Notifications
      <div className="group">
        <div className="flex items-center gap-2 hover:text-signature transition-colors">
          <div className="rounded-full bg-muted border-2 size-9 flex items-center justify-center hover:bg-signature/10 hover:border-signature/30 transition-all duration-200">
            <NotificationsBtn />
          </div>
          <span className="text-sm font-medium hidden lg:block group-hover:text-signature">Notifications</span>
        </div>
      </div> */}
      
      {/* User Profile */}
      <div className="group h-full">
        <div className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2">
          <ThemeToggle />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent rounded-full" />
        </div>
      </div>
      <div className="group h-full">
        <div className="flex flex-col items-center justify-center hover:text-signature transition-colors relative h-full pb-2">
          <UserBtn />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent rounded-full" />
        </div>
      </div>
     
    </div>
  );
};

// Icon components with active state styling
const HomeIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
};

const AboutIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/about";
  return (
    <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

const ContactIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/contact-us";
  return (
    <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
};

// Icon components with active state styling
const HomeIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
};

const AboutIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/about";
  return (
    <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

const ContactIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/contact-us";
  return (
    <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-signature' : 'text-foreground group-hover:text-signature'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
};
