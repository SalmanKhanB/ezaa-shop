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
import { useCategories } from "@/hooks/useProducts";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setSelectedCategoryId, setCategoryPage } from "@/lib/store/slices/productSlice";
import { Category } from "@/types";
import MyImage from "./my-image";
import Link from "next/link";
import CategoryCard from "./category-card";

const Categories = () => {
  const { data: categories, isLoading, isError, error } = useCategories();
  const { selectedCategoryId, categoryPage } = useAppSelector((store) => store.product);
  const dispatch = useAppDispatch();
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Toast on error
  useEffect(() => {
    if (isError) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load categories.");
    }
  }, [isError, error]);

  // Auto-select first category if none selected
  useEffect(() => {
    if (categories?.data?.categories?.length && selectedCategoryId === 0) {
      dispatch(setSelectedCategoryId(categories.data.categories[0].id));
    }
  }, [categories, selectedCategoryId, dispatch]);

  // Handle carousel API
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      const currentSlide = carouselApi.selectedScrollSnap();
      const itemsPerPage = 4;
      const currentPage = Math.floor(currentSlide / itemsPerPage);
      console.log('Carousel slide changed:', { currentSlide, currentPage, itemsPerPage });
      dispatch(setCategoryPage(currentPage));
    };
    
    const onScroll = () => {
      const currentSlide = carouselApi.selectedScrollSnap();
      const itemsPerPage = 4;
      const currentPage = Math.floor(currentSlide / itemsPerPage);
      console.log('Carousel scroll:', { currentSlide, currentPage, itemsPerPage });
      dispatch(setCategoryPage(currentPage));
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
      dispatch(setCategoryPage(page));
    }
  };

  // Show loading skeletons
  if (isLoading) return <CategoriesSkeleton />;

  // Show message if no categories
  if (!categories?.data?.categories?.length) {
    return (
      <div className="my-8">
        <H3 className="text-center mb-6">Categories</H3>
        <p className="text-center text-muted-foreground">
          No categories found.
        </p>
      </div>
    );
  }

  // Main content
  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <H3 className="text-left text-foreground text-sm font-medium">CATEGORY</H3>
        <Link href="/categories" className="text-red-600 font-medium text-sm hover:underline">View All</Link>
      </div>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          dragFree: false, // Disable dragFree to ensure proper snap behavior
          slidesToScroll: 4, // Scroll 4 items at a time (one page)
          containScroll: "trimSnaps", // Ensure proper snapping
        }}
        className="w-full"
      >
        <CarouselContent className="px-3">
          {categories.data.categories.map((category: Category) => (
            <CarouselItem
              key={category.id}
              className="basis-auto w-32"
            >
              <CategoryCard
                category={category}
                isSelected={selectedCategoryId === category.id}
                onClick={() => dispatch(setSelectedCategoryId(category.id))}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(categories.data.categories.length / 4) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              categoryPage === index 
              ? "bg-primary w-8" // Active dot: theme-aware primary color, 220% wider (2.2x)
              : "bg-muted-foreground w-2" // Inactive dots: theme-aware muted color, normal width
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

// Skeleton component
const CategoriesSkeleton = () => {
  return (
    <div className="my-8">
      <H3 className="text-center mb-6">Categories</H3>
      <div className="flex gap-4 px-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 rounded-xl overflow-hidden p-3 bg-muted/50 w-32 shrink-0"
          >
            <Skeleton className="w-full h-20 rounded-md" />
            <Skeleton className="w-3/4 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
};
