"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { H3 } from "@/components/typography";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubCategories, useAllSubCategories } from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSelectedSubCategoryId, setSubcategoryPage } from "@/lib/store/slices/productSlice";
import { Subcategory } from "@/types";
import { useProduct } from "@/hooks/useProducts";
import Link from "next/link";

const Subcategories = ({ showAll = false }: { showAll?: boolean }) => {
  const dispatch = useAppDispatch();
  const { selectedSubCategoryId, selectedCategoryId, subcategoryPage } = useAppSelector(
    (store) => store.product
  );
  const { userId } = useAppSelector((store) => store.auth);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Use different hooks based on whether a category is selected
  const { data: categoryData, isLoading: categoryLoading, isError: categoryError, error: categoryErr } = useSubCategories(
    selectedCategoryId || 0,
    userId || -1
  );
  
  const { data: allData, isLoading: allLoading, isError: allError, error: allErr } = useAllSubCategories(userId || -1);

  // Use the appropriate data source - show all subcategories by default on home page
  const shouldShowAll = !selectedCategoryId || showAll;
  const isLoading = shouldShowAll ? allLoading : categoryLoading;
  const isError = shouldShowAll ? allError : categoryError;
  const error = shouldShowAll ? allErr : categoryErr;
  const subCategories = shouldShowAll
    ? (allData?.data?.subCategories || [])
    : (categoryData?.data?.subCategories || []);

  useEffect(() => {
    if (isError && error) {
      console.error("Error loading subcategories:", error);
      toast.error("Failed to load subcategories.");
    }
  }, [isError, error]);

  // Handle carousel API
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      const currentSlide = carouselApi.selectedScrollSnap();
      const itemsPerPage = 4;
      const currentPage = Math.floor(currentSlide / itemsPerPage);
      console.log('Subcategory carousel slide changed:', { currentSlide, currentPage, itemsPerPage });
      dispatch(setSubcategoryPage(currentPage));
    };
    
    const onScroll = () => {
      const currentSlide = carouselApi.selectedScrollSnap();
      const itemsPerPage = 4;
      const currentPage = Math.floor(currentSlide / itemsPerPage);
      console.log('Subcategory carousel scroll:', { currentSlide, currentPage, itemsPerPage });
      dispatch(setSubcategoryPage(currentPage));
    };
    
    carouselApi.on("select", onSelect);
    carouselApi.on("scroll", onScroll);
    
    // Set initial page
    onSelect();
    
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("scroll", onScroll);
    };
  }, [carouselApi, dispatch]);


  // Navigate to specific page
  const goToPage = (page: number) => {
    if (carouselApi) {
      const itemsPerPage = 4;
      const targetSlide = page * itemsPerPage;
      carouselApi.scrollTo(targetSlide);
      dispatch(setSubcategoryPage(page));
    }
  };

  if (isLoading) return <SubcategoriesSkeleton />;

  if (!subCategories.length) {
    return (
      <div className="my-8">
        <H3 className="text-center mb-6">Subcategories</H3>
        <p className="text-center text-muted-foreground">
          No subcategories found.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <H3 className="text-left text-foreground text-sm font-medium">SUB CATEGORY</H3>
        {!showAll && selectedCategoryId && (
          <Link href={`/categories?category=${selectedCategoryId}`} className="text-red-600 font-medium text-sm hover:underline">View All</Link>
        )}
      </div>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          dragFree: false, // Disable dragFree to ensure proper snap behavior
          slidesToScroll: 4, // Scroll 4 items at a time (one page)
          containScroll: "trimSnaps", // Ensure proper snapping
        }}
        className="w-full px-4"
      >
        <CarouselContent>
          {subCategories.map((subcategory: Subcategory) => (
            <CarouselItem
              key={subcategory.id}
              className="basis-auto cursor-pointer"
              onClick={() => dispatch(setSelectedSubCategoryId(subcategory.id))}
            >
              <div
                className={`px-4 py-2 rounded-full ${
                  selectedSubCategoryId === subcategory.id
                    ? "bg-red-600 text-white"
                    : "hover:text-red-600 transition duration-200 text-foreground"
                } text-2sm font-light whitespace-nowrap text-foreground`}
              >
                {subcategory.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(subCategories.length / 4) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              subcategoryPage === index 
                ? "bg-primary w-8" // Active dot: theme-aware primary color, 220% wider (2.2x)
                : "bg-muted-foreground w-2" // Inactive dots: theme-aware muted color, normal width
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Subcategories;

// Skeleton while loading
const SubcategoriesSkeleton = () => {
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Subcategories</H3>
      <div className="flex gap-3 px-4 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-full shrink-0" />
        ))}
      </div>
    </div>
  );
};
