"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { baseUrl, publicUrl } from "@/config/constants";
import { useTotalCommission } from "@/hooks/useCashback";
import { useAllUserTeams, useReferralCode } from "@/hooks/useReferral";
import { useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";
import MyImage from "../my-image";
import { H4, Label, Small } from "../typography";

// ----------- TYPES -----------
interface TeamMember {
  parent_user_id: number;
  referal_user_info: {
    user_id: number;
    name: string;
    email: string;
    "Referral Code Reference": string;
    directCommission?: number;
    bucketCommission?: number;
  };
}

interface ReferralTeamResponse {
  data: {
    status: string;
    teams: Record<`level_${1 | 2 | 3 | 4 | 5}`, TeamMember[]>;
    team_counts: Record<string, number>;
    overall_count: number;
  };
  error: null;
  status: string;
}


// ----------- COMPONENT -----------
const Referrals = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const { data: referralData } = useReferralCode(userId || 0);
  const { data: allUserTeamsData } = useAllUserTeams(userId || 0);
  const { data: userTotalCommission } = useTotalCommission(userId || 0);
  const { pendingReferralCode } = useAppSelector((state) => state.referral);

  const userReferralCode = referralData?.data?.userReferalCode?.code || "------";
  
  // Use user's referral code if they're signed in, otherwise use pending referral code
  const referralCode = userId ? userReferralCode : (pendingReferralCode || "------");
  
  // Use current domain for referral link
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : '';
  const referralLink = `${currentDomain}/referralCode=${referralCode}`;

  // const teams = (allUserTeamsData?.data?.teams ||
  //   {}) as ReferralTeamResponse["data"]["teams"];

  const allTeams = (allUserTeamsData?.data?.teams ||
    {}) as ReferralTeamResponse["data"]["teams"];
  const teams = Object.fromEntries(
    Object.entries(allTeams).filter(([key]) =>
      ["level_1", "level_2", "level_3"].includes(key)
    )
  );
  // const totalMembers = allUserTeamsData?.data?.overall_count || 0;

  const teamCounts = allUserTeamsData?.data?.team_counts || {};
  const totalMembers =
    (teamCounts["1"] || 0) + (teamCounts["2"] || 0) + (teamCounts["3"] || 0);

  const totalCommission = parseFloat(
    userTotalCommission?.data?.totalCommission?.totalCommission
  )?.toFixed(2);

  const [copiedField, setCopiedField] = useState("");
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(""), 2000);
  };
  console.log(teams);
  return (
    <div className="space-y-4">
      {/* Header Section */}

      <div className="flex justify-between bg-muted p-4 rounded-md text-center">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          <div className="">
            <MyImage
              src="/images/referral.png"
              alt="Referral"
              width={60}
              height={60}
              className="mx-auto w-24 h-24 object-cover object-center"
              hasBaseUrl={false}
            />
          </div>
          <div className="flex w-full justify-between md:justify-end items-center gap-8 md:gap-16">
            <div>
              <Label className="text-signature">My Team</Label>
              <H4>{totalMembers}</H4>
            </div>
            <div>
              <Label className="text-signature">Total Commission</Label>
              <H4>Rs. {totalCommission}</H4>
            </div>
          </div>
        </div>
      </div>

      <Small className="my-2 text-muted-foreground">
        Invite friends and earn more commission with every purchase they make!
      </Small>
      {/* Referral Code Section */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-between mt-4">
        <div className="w-full flex flex-col gap-2">
          <Label className="text-signature">Your Referral Code</Label>
          <div className="flex items-center gap-2 border border-dashed rounded-md px-3 py-2">
            <Input
              className="border-none px-4 py-0"
              readOnly
              value={referralCode}
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleCopy(referralCode, "code")}
            >
              {copiedField === "code" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        {/* referral codes */}
        <div className="w-full flex flex-col gap-2">
          <Label className="text-signature">Referral Link</Label>
          <div className="flex items-center gap-2 border border-dashed rounded-md px-3 py-2">
            <Input
              className="border-none px-4 py-0"
              readOnly
              value={referralLink}
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleCopy(referralLink, "link")}
            >
              {copiedField === "link" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Levels */}
      <Tabs defaultValue="level_1" className="w-full">
        <TabsList className="grid grid-cols-3 gap-1 w-full">
          {Object.keys(teams).map((level) => (
            <TabsTrigger key={level} value={level} className="text-xs">
              {level.replace("level_", "Level ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(teams).map(([level, members]) => (
          <TabsContent key={level} value={level}>
            <ScrollArea className="max-h-[300px] w-full border rounded-md overflow-auto">
              {/* <div className="min-w-[600px]"> */}
              <table className="w-full text-[10px] sm:text-sm text-left">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-2 py-1">#</th>
                    <th className="px-2 py-1">User (Email)</th>
                    <th className="px-2 py-1">Direct (Rs.)</th>
                    <th className="px-2 py-1">Bucket (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, idx) => (
                    <tr
                      key={member.referal_user_info.email}
                      className="border-t"
                    >
                      <td className="px-2 py-1">{idx + 1}</td>
                      <td className="px-2 py-1">
                        {member.referal_user_info.email}
                      </td>
                      <td className="px-2 py-1">
                        {(
                          member.referal_user_info.directCommission || 0
                        ).toFixed(2)}
                      </td>
                      <td className="px-2 py-1">
                        {(
                          member.referal_user_info.bucketCommission || 0
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Referrals;
