"use client";

import { baseUrl } from "@/config/constants";
import { cn } from "@/lib/utils";
import getImageUrl from "@/utils/getImageUrl";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  hasBaseUrl?: boolean;
}
const MyImage = ({
  src,
  alt,
  className,
  hasBaseUrl = true,
  ...rest
}: MyImageProps) => {
  const [imageError, setImageError] = useState(false);
  const imgSrc = hasBaseUrl ? getImageUrl(src) : src;
  
  if (imageError) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-200 text-gray-500", className)}>
        <span className="text-sm">Image not available</span>
      </div>
    );
  }
  
  return (
    <Image 
      src={imgSrc} 
      alt={alt} 
      className={cn("object-cover", className)} 
      onError={() => setImageError(true)}
      {...rest} 
    />
  );
};

export default MyImage;
