"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setToken, setUser, setUserId } from "@/lib/store/slices/authSlice";
import { useUserInfo } from "@/hooks/useAuth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((store) => store.auth) || {};
  const { data: userInfo } = useUserInfo(userId || 0, {
    enabled: !!userId,
  });

  const pathname = usePathname();
  const router = useRouter();

  const [checkedStorage, setCheckedStorage] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false); // prevent multiple redirects

  const PUBLIC_ROUTES = useMemo(() => [
    "/", "/about", "/contact-us", "/privacy-policy", "/terms-conditions", 
    "/categories", "/products", "/search"
  ], []);

  // STEP 1: Check localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userid");
    if (!token || !userId) {
      if (storedToken && storedUserId) {
        dispatch(setToken(storedToken));
        dispatch(setUserId(parseInt(storedUserId)));
      }
    }

    setCheckedStorage(true);
  }, [dispatch, pathname, token, userId]);

  // STEP 2: Set user data if fetched
  useEffect(() => {
    if (userInfo?.data?.user) {
      dispatch(setUser(userInfo.data.user));
    }
  }, [userInfo, dispatch]);

  // STEP 3: Wait until storage check is done, then apply auth logic
  useEffect(() => {
    if (!checkedStorage || hasRedirected) return;

    const isAuthenticated = !!token && !!userId;
    const isAuthRoute = pathname?.startsWith("/auth");
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname?.startsWith(route + "/"));

    if (!isAuthenticated && !isAuthRoute && !isPublicRoute) {
      setHasRedirected(true);
      router.replace("/auth/login");
    }

    if (isAuthenticated && isAuthRoute) {
      setHasRedirected(true);
      router.replace("/");
    }
  }, [checkedStorage, token, userId, pathname, router, hasRedirected, PUBLIC_ROUTES]);

  if (!checkedStorage) return null;

  return <>{children}</>;
};

export default AuthWrapper;
