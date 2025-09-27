"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBanners } from "@/hooks/useBanners";
import { HomeBanner, BannerResponse } from "@/types/banner";
import MyImage from "./my-image";
import getImageUrl from "@/utils/getImageUrl";

const SmallPopup = () => {
  const { data, isLoading, isError } = useBanners();
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canClose, setCanClose] = useState(false);

  // Filter small popup items
  const smallPopups = data ? (data as BannerResponse).homeBanners.filter((banner: HomeBanner) => banner.status === "small-popup") : [];

  useEffect(() => {
    if (smallPopups.length > 0 && imageLoaded) {
      setShowPopup(true);
      // Enable close button after 3 seconds
      const timer = setTimeout(() => {
        setCanClose(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [smallPopups.length, imageLoaded]);

  const handleClose = () => {
    if (canClose) {
      setShowPopup(false);
    }
  };

  // Don't show if loading, error, no data, or no small popups
  if (isLoading || isError || !showPopup || smallPopups.length === 0) {
    return null;
  }

  // Show the first small popup
  const popup = smallPopups[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="relative max-w-full mx-auto">
        {/* Mobile: 300x50 ratio */}
        <div 
          className="relative w-full h-[50px] sm:h-[60px] md:h-[80px] lg:h-[100px] overflow-hidden"
          style={{ aspectRatio: "300/50" }}
        >
          {!imageLoaded && (
            <Skeleton className="w-full h-full" />
          )}
          <MyImage
            src={getImageUrl(popup.image, true)}
            alt="Small Popup"
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
          
          {canClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 p-0 z-10"
            >
              <X size={12} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallPopup;
