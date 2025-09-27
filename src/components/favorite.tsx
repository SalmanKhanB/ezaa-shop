"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addFavorite, removeFavorite } from "@/lib/store/slices/favoriteSlice";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Favorite = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { id, product_image, name, product_deatils } = product;

  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((store) => store.auth);
  const { favorites } = useAppSelector((store) => store.favorite) || {};
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const router = useRouter();
  const isFavorite = favorites.some((favorite) => favorite.products.id === id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleFavorite = () => {
    if (!token || !userId) {
      let loginUrl = "/auth/login";
      if (pendingReferralCode) loginUrl += `?referralCode=${pendingReferralCode}`;
      router.push(loginUrl);
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    const favoriteProductData = {
      products: {
        id,
        product_image,
        name,
        product_deatils,
      },
    };

    if (isFavorite) {
      dispatch(removeFavorite(id));
      setIsSubmitting(false);
      toast.success("Removed from favorites!");
    } else {
      dispatch(addFavorite(favoriteProductData));
      setIsSubmitting(false);
      toast.success("Added to favorites!");
    }
  };
  return (
    <button
      onClick={toggleFavorite}
      className={cn(
        "text-signature w-6 h-6 flex items-center justify-center cursor-pointer",
        className
      )}
      disabled={isSubmitting}
    >
      {isFavorite ? (
        <BsHeartFill className="w-full h-full animate-ping-slow" />
      ) : (
        <BsHeart className="w-full h-full" />
      )}
    </button>
  );
};

export default Favorite;
