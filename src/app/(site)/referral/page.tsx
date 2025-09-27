// app/referral/page.tsx
"use client";

import { Suspense } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/container";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RiUserSharedLine, RiGiftLine, RiTeamLine } from "react-icons/ri";
import Link from "next/link";

function ReferralContent() {
  const { userId } = useAppSelector((store) => store.auth);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string>("");

  useEffect(() => {
    const urlCode = searchParams.get("code");
    const code = urlCode || pendingReferralCode || "";
    setReferralCode(code);
  }, [searchParams, pendingReferralCode]);

  const handleCopyReferralCode = () => {
    if (referralCode && typeof window !== "undefined") {
      navigator.clipboard.writeText(referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  if (!referralCode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <RiUserSharedLine className="text-6xl text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Invalid Referral Link</h1>
        <p className="text-muted-foreground mb-4">
          This referral link is invalid or has expired.
        </p>
        <Link href="/">
          <Button variant="signature">Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="text-center">
        {/* ... rest of your card content remains exactly the same ... */}
      </Card>
    </div>
  );
}

export default function ReferralPage() {
  return (
    <Container title="Referral">
      <Suspense fallback={<div>Loading referral information...</div>}>
        <ReferralContent />
      </Suspense>
    </Container>
  );
}