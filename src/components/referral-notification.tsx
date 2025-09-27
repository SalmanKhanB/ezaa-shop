"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const ReferralNotification = () => {
  const { pendingReferralCode, sourceUrl } = useAppSelector((store) => store.referral);
  const { userId } = useAppSelector((store) => store.auth);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  if (!pendingReferralCode || !isVisible || userId) {
    return null;
  }

  const isReferralPage = pathname === "/referral" || pathname === "/referrals";

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(pendingReferralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleSignup = () => {
    const currentDomain = window.location.origin;
    window.location.href = `${currentDomain}/auth/signup?referralCode=${pendingReferralCode}`;
  };

  return (
    <Card className="fixed top-20 right-4 z-50 w-80 shadow-lg border-l-4 border-l-signature">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-2">
              {isReferralPage ? "Referral Code Found!" : "Referral Code Applied!"}
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              {isReferralPage 
                ? "You've accessed a referral link. Sign up to use this referral code and start earning rewards!"
                : "You've been redirected from a referral link. Sign up to use this referral code and earn rewards!"
              }
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium">Code:</span>
              <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                {pendingReferralCode}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyReferralCode}
                className="text-xs h-6"
              >
                Copy
              </Button>
            </div>
            <Button
              size="sm"
              variant="signature"
              className="w-full text-xs"
              onClick={handleSignup}
            >
              Sign Up Now
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralNotification; 