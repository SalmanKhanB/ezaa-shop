"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useBanners } from "@/hooks/useBanners";
import { HomeBanner, BannerResponse } from "@/types/banner";
import MyImage from "./my-image";
import getImageUrl from "@/utils/getImageUrl";
import { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "../../public/images/banner.png";

const Hero = () => {
  const { data, isLoading, isError } = useBanners();
  const [activeIdx, setActiveIdx] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Filter only banner status items from API
  const apiBannerItems = data ? (data as BannerResponse).homeBanners.filter((banner: HomeBanner) => banner.status === "banner") : [];
  
  // Use API banners if available and no error, otherwise use default banner
  const shouldUseDefaultBanner = isError || apiBannerItems.length === 0;
  const bannerItems = shouldUseDefaultBanner ? [{ id: 'default', image: Banner as any, status: 'banner' as const }] : apiBannerItems;
  const isUsingDefaultBanner = shouldUseDefaultBanner;

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveIdx(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    onSelect();
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Show loading skeleton only if loading and not using default banner
  if (isLoading && !isUsingDefaultBanner) {
    return (
      <div className="relative w-full rounded-2xl shadow-xl overflow-hidden mt-4">
        <Skeleton className="w-full h-64 md:h-80 lg:h-96 rounded-2xl" />
      </div>
    );
  }

  // Always show banner (either from API or default)
  if (!bannerItems || bannerItems.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full rounded-2xl shadow-xl overflow-hidden mt-4">
      <Carousel
        autoplay={true}
        delay={3000}
        setApi={setCarouselApi}
        className="rounded-2xl"
      >
        <CarouselContent>
          {bannerItems.map((banner, idx) => (
            <CarouselItem key={banner.id} className="w-full transition-all duration-700 ease-in-out">
              <div 
                className="w-full relative overflow-hidden"
                style={{ aspectRatio: "1220/325" }}
              >
                {isUsingDefaultBanner ? (
                  <Image
                    src={banner.image}
                    alt="Default Banner"
                    fill
                    className="object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
                    sizes="100vw"
                    priority
                    style={{
                      opacity: activeIdx === idx ? 1 : 0.5,
                      transition: 'opacity 0.7s',
                    }}
                  />
                ) : (
                  <MyImage
                    src={getImageUrl(banner.image, true)}
                    alt={`Banner ${banner.id}`}
                    fill
                    className="object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
                    sizes="100vw"
                    priority
                    style={{
                      opacity: activeIdx === idx ? 1 : 0.5,
                      transition: 'opacity 0.7s',
                    }}
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                {/* Optional: Add text or CTA here */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {bannerItems.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
              activeIdx === idx ? "bg-signature" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
