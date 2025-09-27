"use client";

import Container from "@/components/container";
import Subcategories from "@/components/subcategories";
import Products from "@/components/products";
import { ProductCard } from "@/components/cards/product-card";
import { H1 } from "@/components/typography";
import { useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedSubCategoryId } from "@/lib/store/slices/productSlice";
import { useAllSubCategories, useProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

const SubcategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { selectedSubCategoryId } = useAppSelector((store) => store.product);
  const { userId } = useAppSelector((store) => store.auth);
  
  // Get subcategory name for display
  const { data: subcategoriesData } = useAllSubCategories(userId || undefined);
  const selectedSubcategory = subcategoriesData?.data?.subCategories?.find((sub: any) => sub.id === selectedSubCategoryId);

  const handleBackToSubcategories = () => {
    dispatch(setSelectedSubCategoryId(0));
  };

  return (
    <Container>
      <div className="my-8">
        <H1 className="text-center mb-8">
          {selectedSubCategoryId === 0 && 'All Subcategories'}
          {selectedSubCategoryId > 0 && `${selectedSubcategory?.name || 'Products'}`}
        </H1>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Button 
            variant="link" 
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={handleBackToSubcategories}
          >
            Subcategories
          </Button>
          {selectedSubCategoryId > 0 && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{selectedSubcategory?.name || 'Products'}</span>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        {selectedSubCategoryId > 0 && (
          <div className="mb-6 flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleBackToSubcategories}
              className="mb-4"
            >
              ← Back to Subcategories
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleBackToSubcategories}
              className="mb-4"
            >
              Clear Selection
            </Button>
          </div>
        )}

        {/* Current Selection Info */}
        {selectedSubCategoryId > 0 && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Currently viewing:</span> {selectedSubcategory?.name}
            </p>
          </div>
        )}

        {/* Content based on selection */}
        {selectedSubCategoryId === 0 && <Subcategories showAll={true} />}
        {selectedSubCategoryId > 0 && <LimitedProducts subCategoryId={selectedSubCategoryId} />}
      </div>
    </Container>
  );
};

// Limited Products Component that shows only 4 products with View All button
const LimitedProducts = ({ subCategoryId }: { subCategoryId: number }) => {
  const { userId } = useAppSelector((store) => store.auth);
  const effectiveUserId = userId || -1;

  const { data, isLoading, isError, error } = useProduct(
    subCategoryId,
    effectiveUserId
  );

  const allProducts = data?.data?.products || [];
  const limitedProducts = allProducts.slice(0, 4); // Show only first 4 products
  const hasMoreProducts = allProducts.length > 4;

  useEffect(() => {
    if (isError && error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products.");
    }
  }, [isError, error]);

  if (isLoading) return <LimitedProductsSkeleton />;

  if (!limitedProducts.length) {
    return (
      <div className="my-8">
        <p className="text-center text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {limitedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* View All Button */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-6">
          <Link href={`/categories?subcategory=${subCategoryId}`}>
            <Button variant="outline" className="px-8">
              View All Products ({allProducts.length})
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

// Skeleton for limited products
const LimitedProductsSkeleton = () => {
  return (
    <div className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesPage;
