"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useBanners } from "@/hooks/useBanners";
import { HomeBanner, BannerResponse } from "@/types/banner";
import MyImage from "./my-image";
import getImageUrl from "@/utils/getImageUrl";

const LargePopup = () => {
  const { data, isLoading, isError } = useBanners();
  const [showDialog, setShowDialog] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canClose, setCanClose] = useState(false);

  // Filter large popup items
  const largePopups = data ? (data as BannerResponse).homeBanners.filter((banner: HomeBanner) => banner.status === "large-popup") : [];

  useEffect(() => {
    if (largePopups.length > 0 && imageLoaded) {
      setShowDialog(true);
      // Enable close button after 3 seconds
      const timer = setTimeout(() => {
        setCanClose(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [largePopups.length, imageLoaded]);

  const handleClose = () => {
    if (canClose) {
      setShowDialog(false);
    }
  };

  // Don't show if loading, error, no data, or no large popups
  if (isLoading || isError || !showDialog || largePopups.length === 0) {
    return null;
  }

  // Show the first large popup
  const popup = largePopups[0];

  return (
    <Dialog open={showDialog} onOpenChange={canClose ? handleClose : undefined}>
      <DialogContent className="max-w-md mx-auto p-0 border-0">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          {!imageLoaded && (
            <Skeleton className="w-full h-full rounded-lg" />
          )}
          <MyImage
            src={getImageUrl(popup.image, true)}
            alt="Large Popup"
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
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 p-0 z-10"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LargePopup;
