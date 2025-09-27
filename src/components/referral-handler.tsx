// app/components/referral-handler.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPendingReferralCode, setSourceUrl } from "@/lib/store/slices/referralSlice";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ReferralHandler = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((store) => store.auth);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check for referral codes in URL parameters or path
    const referralCodeFromQuery = searchParams.get("referral_code") || searchParams.get("code") || searchParams.get("referralCode");
    let referralCodeFromPath = null;
    // Match /referralCode=CODE or /?referralCode=CODE
    const match = pathname.match(/^\/referralCode=([A-Za-z0-9]+)$/);
    if (match) {
      referralCodeFromPath = match[1];
    }
    const referralCode = referralCodeFromQuery || referralCodeFromPath;

    if (referralCode) {
      dispatch(setPendingReferralCode(referralCode));
      if (typeof window !== "undefined") {
        dispatch(setSourceUrl(window.location.href));
        // If path is /referralCode=..., redirect to home
        if (referralCodeFromPath) {
          router.replace("/");
        }
      }
    }
  }, [searchParams, pathname, dispatch, router]);

  return null;
};

export default ReferralHandler;