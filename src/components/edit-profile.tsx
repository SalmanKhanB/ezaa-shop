"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateUserInfo } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import getImageUrl from "@/utils/getImageUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import TextInput from "./forms/fields/text-input";
import { setUser } from "@/lib/store/slices/authSlice";

const profileSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits."),
  email: z.string().email(),
  image: z
    .custom<File | string | undefined>(
      (val) => {
        if (!val) return true;
        if (typeof val === "string") return true;
        if (val instanceof File) return true;
        if (Array.isArray(val) && val[0] instanceof File) return true;
        return false;
      },
      {
        message: "Invalid image file.",
      }
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token, userId } = useAppSelector((state) => state.auth);
  const { pendingReferralCode } = useAppSelector((state) => state.referral);
  const [preview, setPreview] = useState<string | null>(
    user?.image ? getImageUrl(user.image) : null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fname: user?.fname || "",
      lname: user?.lname || "",
      phone: user?.phone || "",
      email: user?.email || "",
      image: user?.image || "",
    },
  });

  const {
    data,
    mutate: updateUser,
    isPending,
  } = useUpdateUserInfo({
    onSuccess: (response: any) => {
      toast.success("Profile updated successfully");
      reset();
      dispatch(setUser(response?.data?.user));
      setSelectedFile(null);
      setPreview(null);
      router.push("/profile");
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fname: user.fname || "",
        lname: user.lname || "",
        phone: user.phone || "",
        email: user.email || "",
        image: user.image || "",
      });
      setPreview(getImageUrl(user.image) || null);
    }
  }, [user, reset]);

  useEffect(() => {
    if (!token || !userId) {
      let loginUrl = "/auth/login";
      if (pendingReferralCode) loginUrl += `?referralCode=${pendingReferralCode}`;
      router.replace(loginUrl);
    }
  }, [token, userId, pendingReferralCode, router]);

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("fname", data.fname || "");
    formData.append("lname", data.lname || "");
    formData.append("phone", data.phone);
    formData.append("email", data.email);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    updateUser({
      userId: user.id,
      data: formData,
    });
  };

  const getInitials = () => {
    if (user?.fname || user?.lname) {
      return `${user.fname?.[0] || ""}${user.lname?.[0] || ""}`.toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card className="bg-background text-foreground shadow-md">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative h-20 w-20 mx-auto">
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      id="profileImageInput"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setPreview(URL.createObjectURL(file));
                          field.onChange(file);
                        }
                      }}
                    />
                  </>
                )}
              />

              <label
                htmlFor="profileImageInput"
                className="cursor-pointer group block h-full w-full rounded-full overflow-hidden relative"
              >
                <Avatar className="h-full w-full border-2 border-muted transition-all duration-200 group-hover:opacity-70">
                  <AvatarImage
                    src={!preview ? getImageUrl(user?.image) : preview}
                  />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-xs text-white transition-all duration-300">
                  <Camera />
                </div>
              </label>
              {typeof errors.image?.message === "string" && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            <TextInput name="fname" control={control} label="First Name" />
            <TextInput name="lname" control={control} label="Last Name" />
            <TextInput name="phone" control={control} label="Phone" />
            <TextInput name="email" control={control} label="Email" disabled />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
