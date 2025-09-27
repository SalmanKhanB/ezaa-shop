"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logout } from "@/lib/store/slices/authSlice";
import getImageUrl from "@/utils/getImageUrl";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Banknote,
  Bell,
  CreditCard,
  Heart,
  LogOut,
  ShoppingCart,
  Ticket,
  User,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { RiUserSharedLine, RiShoppingBag3Line, RiHeart3Line, RiTeamLine, RiCustomerService2Line } from "react-icons/ri";
import { DialogDescription } from "@/components/ui/dialog";

// Define menu items for both auth and no-auth
const commonMenuItems = [
  {
    label: "Home",
    href: "/",
    icon: RiShoppingBag3Line,
  },
  {
    label: "Search",
    href: "/search",
    icon: "search", // Use a suitable icon import if available
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    label: "About Us",
    href: "/about",
    icon: RiTeamLine,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: RiCustomerService2Line,
  },
];

const authMenuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Bank Accounts",
    href: "/bank-accounts",
    icon: Banknote,
  },
  {
    label: "Coupons",
    href: "/coupons",
    icon: Ticket,
  },
  {
    label: "Wallet",
    href: "/wallet",
    icon: CreditCard,
  },
  {
    label: "Referrals",
    href: "/referrals",
    icon: RiUserSharedLine,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

const loginMenuItem = {
  label: "Login",
  href: "/auth/login",
  icon: "login", // Use a suitable icon import if available
};

const UserBtn = () => {
  const { user, token, userId } = useAppSelector((state) => state.auth);
  const { pendingReferralCode } = useAppSelector((state) => state.referral);
  const dispatch = useAppDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const getInitials = () => {
    if (user?.fname || user?.lname) {
      return `${user.fname?.[0] || ""}${user.lname?.[0] || ""}`.toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const handleLogout = () => {
    dispatch(logout());
    setOpenDialog(false);
    setOpenSheet(false);
    router.push("/auth/login");
  };

  const handleProtectedNav = (href: string, e: React.MouseEvent) => {
    setOpenSheet(false);
  };

  // Determine menu items based on auth
  const isAuth = !!token && !!userId;
  let menuToShow = [];
  if (isAuth) {
    menuToShow = [...commonMenuItems, ...authMenuItems];
  } else {
    menuToShow = [...commonMenuItems, loginMenuItem];
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 m-0 bg-transparent border-none shadow-none flex items-center justify-center"
          onClick={() => setOpenSheet(true)}
        >
          {/* <Avatar className="size-8">
            <AvatarImage src={getImageUrl(user?.image)} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar> */}
          <span className="inline-block align-middle">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="6" width="22" height="3" rx="1" fill="currentColor" />
              <rect x="9" y="12" width="18" height="3" rx="1" fill="currentColor" />
              <rect x="13" y="18" width="14" height="3" rx="1" fill="currentColor" />
            </svg>
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent 
        side="right" 
        className="w-72 flex flex-col bg-background/80 backdrop-blur-md border-l border-border/50"
      >
        {/* Header */}
        <SheetHeader className="border-b border-border/50 pb-4">
          <SheetTitle className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            {/* Main Menu Items */}
            <div className="flex flex-col gap-2">
              {menuToShow.map(({ label, href, icon: Icon }, idx) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleProtectedNav(href, e)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 group"
                >
                  {typeof Icon === "string" ? (
                    Icon === "search" ? (
                      <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"/></svg>
                    ) : Icon === "login" ? (
                      <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12H3m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/></svg>
                    ) : null
                  ) : (
                    <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  )}
                  <span className="font-medium group-hover:text-primary transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Logout Button - only for auth */}
        {isAuth && (
          <div className="border-t border-border/50 pt-4 pb-2">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/50 gap-3 p-3 rounded-lg transition-all duration-200 group"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Logout</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">Confirm Logout</DialogTitle>
                  <DialogDescription className="text-center text-muted-foreground">
                    Are you sure you want to logout from your account?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    className="hover:bg-muted"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UserBtn;
