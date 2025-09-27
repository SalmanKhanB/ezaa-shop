"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addProduct } from "@/lib/store/slices/cartSlice";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { PhotoProvider } from "react-photo-view";
import { toast } from "sonner";
import Container from "./container";
import Favorite from "./favorite";
import ImageCarousel from "./image-carousel";
import Loader from "./loader";
import RichText from "./rich-text";
import { useReferralCode } from "@/hooks/useReferral";
import { RiShoppingBag3Fill} from "react-icons/ri";
import { RiShoppingBag3Fill} from "react-icons/ri";

const ProductDetails = ({ id }: { id: number }) => {
  const { userId } = useAppSelector((store) => store.auth);
  const { data: referralData } = useReferralCode(userId || 0);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);

  const currentUrl = window.location.href;
  const userReferralCode = referralData?.data?.userReferalCode?.code || "------";
  
  // Use user's referral code if they're signed in, otherwise use pending referral code
  const referralCode = userId ? userReferralCode : (pendingReferralCode || "------");
  const userReferralCode = referralData?.data?.userReferalCode?.code || "------";
  
  // Use user's referral code if they're signed in, otherwise use pending referral code
  const referralCode = userId ? userReferralCode : (pendingReferralCode || "------");
  const referralLink = `${currentUrl}?referral_code=${referralCode}`;

  const [copiedField, setCopiedField] = useState("");
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const { data, isLoading, isError, error } = useProduct(
    id,
    userId || -1
    userId || -1
  );
  const [quantity, setQuantity] = useState(1);
  // Handle both authenticated and public API response structures
  const product = data?.data?.productDetails || data?.data?.product;
  const averageReviews = data?.data?.averageReviews || null;

  const dispatch = useAppDispatch();

  if (isLoading)
    return (
      <div className="w-full mx-auto flex items-center justify-center h-[50vh]">
        <Loader />
      </div>
    );
  if (isError || error) {
    const errorMessage = error?.message || "Something went wrong";
    const isProductNotFound = errorMessage.includes("Product Not Found");
    const isRateLimited = errorMessage.includes("Too Many Attempts");
    
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">
          {isProductNotFound ? "Product Not Found" : "Error Loading Product"}
        </h2>
        <p className="text-gray-600 mb-4">
          {isProductNotFound 
            ? "The product you're looking for doesn't exist or has been removed."
            : isRateLimited 
            ? "Too many requests. Please wait a moment and try again."
            : errorMessage
          }
        </p>
        {isRateLimited && (
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }


  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!userId || userId === -1) {
      window.location.href = '/auth/login';
      return;
    }

    if (!product?.id || !product.product_deatils[0]?.selling_price) return;

    dispatch(
      addProduct({
        product_id: product.id,
        product_name: product.name,
        category_name: product.category?.name,
        image: product.product_image[0].image,
        quantity: 1,
        price: parseFloat(product.product_deatils[0].price),
        price: parseFloat(product.product_deatils[0].price),
        selling_price: parseFloat(product.product_deatils[0].selling_price),
        sub_total: parseFloat(product.product_deatils[0].selling_price),
      })
    );

    toast.success("Added to cart!");
    setQuantity(1);
  };

  const handlePayNow = () => {
    // Check if user is authenticated
    if (!userId || userId === -1) {
      window.location.href = '/auth/login';
      return;
    }

    handleAddToCart();
    window.location.href = '/cart';
  };

  const handleCopyReferralLink = () => {
    // Check if user is authenticated
    if (!userId || userId === -1) {
      window.location.href = '/auth/login';
      return;
    }

    handleCopy(referralLink, "link");
  };

  return (
    <PhotoProvider>
      <Container className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div>
            <Card className="p-4">
              {product.product_image && product.product_image.length > 0 ? (
                <ImageCarousel
                  images={product.product_image}
                  className="my-4"
                  layout="single"
                  size={500}
                />
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-200 text-gray-500">
                  <span>No images available</span>
                </div>
              )}
            </Card>
            {product.product_image && product.product_image.length > 0 && (
              <ImageCarousel
                images={product.product_image}
                className="my-4"
                layout="grid"
              />
            )}
          </div>

          {/* Right - Details */}
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sm">
                {product.category?.name} / {product.subcategory?.name}
              </Badge>
              <Favorite product={product} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mt-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-semibold text-green-600">
                PKR {product.product_deatils[0]?.selling_price}
              </span>
              {/* <span className="text-gray-400 line-through">
                PKR {product.product_deatils[0]?.price}
              </span> */}
              {/* <Badge variant="destructive">Save {discount}%</Badge> */}
              {/* <span className="text-gray-400 line-through">
                PKR {product.product_deatils[0]?.price}
              </span> */}
              {/* <Badge variant="destructive">Save {discount}%</Badge> */}
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-green-600 text-sm">100% Cashback</span>
              <span className="text-green-600 text-sm">100% Cashback</span>
              <span className="text-green-600 text-sm">In Stock</span>
            </div>

            <Separator className="my-4" />

            <RichText content={product.description} />

            <div className="flex items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                disabled={quantity >= 10}
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                variant="signature"
                className="w-full sm:w-5/11"
                className="w-full sm:w-5/11"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} className="mr-2" />
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="default"
                className="w-full sm:w-5/11"
                onClick={handlePayNow}
              >
                <RiShoppingBag3Fill size={16} className="mr-2" />
                Pay Now
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                variant="default"
                className="w-full"
                onClick={handleCopyReferralLink}
              >
                {copiedField === "link" ? "Copied!" : "Copy referral link"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </PhotoProvider>
  );
};

export default ProductDetails;
