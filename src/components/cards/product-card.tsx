"use client";
import { ShoppingCart } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addProduct } from "@/lib/store/slices/cartSlice";
import { Product } from "@/types";
import { toast } from "sonner";
import Favorite from "../favorite";
import MyImage from "../my-image";
import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: Product }) => {
  const { id, product_image, name, product_deatils } = product;
  const { selling_price } = product_deatils[0] || {};
  const { selling_price } = product_deatils[0] || {};
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector((store) => store.auth);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const router = useRouter();

  // Use -1 as default userId for product detail fetching if user is not registered
  const effectiveUserId = userId || -1;
  const { token, userId } = useAppSelector((store) => store.auth);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const router = useRouter();

  // Use -1 as default userId for product detail fetching if user is not registered
  const effectiveUserId = userId || -1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!token || !userId) {
      let loginUrl = "/auth/login";
      if (pendingReferralCode) loginUrl += `?referralCode=${pendingReferralCode}`;
      router.push(loginUrl);
      return;
    }
    if (!token || !userId) {
      let loginUrl = "/auth/login";
      if (pendingReferralCode) loginUrl += `?referralCode=${pendingReferralCode}`;
      router.push(loginUrl);
      return;
    }

    if (!id || !selling_price) return;
    if (!id || !selling_price) return;

    dispatch(
      addProduct({
        product_id: product.id,
        product_name: product.name,
        category_name: product.category?.name,
        image: product.product_image[0].image,
        quantity: 1,
         selling_price: parseFloat(product.product_deatils[0].selling_price),
         price: parseFloat(product.product_deatils[0].price),
         selling_price: parseFloat(product.product_deatils[0].selling_price),
         price: parseFloat(product.product_deatils[0].price),
        sub_total: parseFloat(product.product_deatils[0].selling_price),
      })
    );

    toast.success("Added to cart!");
  };

  const handleProductClick = (e: React.MouseEvent) => {
    // Allow product detail access without authentication
    // Only redirect to login for cart actions, not for viewing products
    return;
  };

  return (
    <div className="mt-2 w-full bg-white rounded-2xl hover:shadow-md transition-all relative pointer-events-none">
      <Favorite
        product={product}
        className="absolute top-3 right-3 z-20 pointer-events-auto"
      />
      <Link href={`/products/${id}`} className="block pointer-events-auto" onClick={handleProductClick}>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200">
          {product_image.length > 0 ? (
            <Carousel opts={{ loop: true }} autoplay={true}>
              <CarouselContent>
                {product_image.map(({ image }, idx) => (
                  <CarouselItem key={idx}>
                    <MyImage
                      src={image}
                      alt={name || "Product image"}
                      width={200}
                      height={200}
                      className="object-contain h-full w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              Image not available
            </div>
          )}
        </div>

        <div className="pt-3">
          {name && (
            <h3 className="text-xs font-normal mb-1 text-black text-center truncate">
              {name}
            </h3>
          )}
          {selling_price && (
            <div className="flex justify-center items-center">
              <span className="text-red-600 font-normal text-xs">PKR {selling_price}</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="pointer-events-auto">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex items-center w-full text-xs font-normal border-none text-black hover:border-b-2 hover:border-black hover:text-black transition-colors shadow-none underline"
          >
            <ShoppingCart size={16} />
            ADD TO CART 
          </Button>
      </div>
    </div>
  );
};