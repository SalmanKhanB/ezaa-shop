"use client";

import { useRegister } from "@/hooks/useAuth";
import { Signup } from "@/types";
import { SignupSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Loader from "../loader";
import PasswordInput from "./fields/password-input";
import TextInput from "./fields/text-input";
import { useAppSelector } from "@/lib/store/hooks";

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlReferralCode = searchParams.get("referralCode");
  const { pendingReferralCode, sourceUrl } = useAppSelector((store) => store.referral);
  
  // Use referral code from URL first, then from store
  const referralCode = urlReferralCode || pendingReferralCode || "";
  
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      referal_code: "",
    },
  });

  const { mutate: register, isPending } = useRegister();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set referral code when component mounts or referral code changes
  useEffect(() => {
    if (referralCode) {
      setValue("referal_code", referralCode);
    }
  }, [referralCode, setValue]);

  const onSubmit = async (data: Signup) => {
    try {
      await register(data, {
        onSuccess: (res) => {
          if (res?.data?.error) {
            setError(res?.data?.error);
          } else {
            setError(null);
            reset();
            toast.success("Signup successful, login to continue.");
            router.push("/auth/login");
          }
        },
        onError: (err) => {
          console.log("Signup failed:", err);
          toast.error("Signup failed. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid gap-2">
        <TextInput
          name="fname"
          placeholder="Enter first name"
          control={control}
          icon={<FaUser />}
        />
        <TextInput
          name="lname"
          placeholder="Enter last name"
          control={control}
          icon={<FaUser />}
        />
        <TextInput
          name="email"
          placeholder="Enter email"
          control={control}
          icon={<MdAlternateEmail />}
        />
        <TextInput
          name="phone"
          placeholder="Enter phone"
          control={control}
          icon={<FaPhone />}
        />
        <PasswordInput
          name="password"
          placeholder="Enter password"
          control={control}
        />
        <TextInput
          name="referal_code"
          placeholder="Enter referral code (optional)"
          control={control}
          icon={<RiUserSharedLine />}
        />

        <div className="flex items-center justify-end gap-2">
          <input
            type="checkbox"
            name="terms"
            className="w-4 h-4"
            checked={isTermsChecked}
            onChange={handleCheckboxChange}
          />
          <Link href="#" className="text-xs text-signature underline">
            Agree with terms and conditions
          </Link>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      <Button
        variant={"signature"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isPending || !isTermsChecked}
      >
        {isPending ? <Loader /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
