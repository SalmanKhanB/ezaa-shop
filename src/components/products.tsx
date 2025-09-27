"use client";

import { ProductCard } from "@/components/cards/product-card";
import { H3 } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductsBySubCategory, useSubCategories } from "@/hooks/useProducts";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setProductPage } from "@/lib/store/slices/productSlice";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const Products = ({ showViewAll = true }: { showViewAll?: boolean }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((store) => store.auth);
  const { selectedSubCategoryId, selectedCategoryId, productPage, productsPerPage } = useAppSelector((store) => store.product);

  // Use -1 as default userId for product fetching if user is not registered
  const effectiveUserId = userId || -1;

  const { data, isLoading, isError, error } = useProductsBySubCategory(
    selectedSubCategoryId || 0,
    effectiveUserId
  );

  // Get subcategory name for display
  const { data: subcategoriesData } = useSubCategories(
    selectedCategoryId || 0,
    effectiveUserId
  );

  const allProducts = data?.data?.products || [];
  
  // Get the selected subcategory name
  const selectedSubcategory = subcategoriesData?.data?.subCategories?.find(
    (sub: any) => sub.id === selectedSubCategoryId
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (productPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const products = allProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (isError && error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products.");
    }
  }, [isError, error]);

  // Handle page navigation
  const handlePageChange = (page: number) => {
    dispatch(setProductPage(page));
  };

  // Reset to page 1 when subcategory changes
  useEffect(() => {
    dispatch(setProductPage(1));
  }, [selectedSubCategoryId, dispatch]);

  if (isLoading) return <ProductsSkeleton title={selectedSubcategory?.name?.toUpperCase() || 'PRODUCTS'} />;

  if (selectedSubCategoryId && !products.length) {
    return (
      <div className="my-8">
        <div className="flex items-center justify-between mb-6">
          <H3 className="text-left text-foreground text-sm font-medium">
            {selectedSubcategory?.name?.toUpperCase() || 'PRODUCTS'}
          </H3>
        </div>
        <p className="text-center text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <H3 className="text-left text-foreground text-sm font-medium">
          {selectedSubcategory?.name?.toUpperCase() || 'PRODUCTS'}
        </H3>
        {showViewAll && (
          <Link href={`/categories?subcategory=${selectedSubCategoryId}`} className="text-red-600 font-medium text-sm hover:underline">
            View All
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button 
            onClick={() => handlePageChange(productPage - 1)}
            disabled={productPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 ${
                productPage === page ? "bg-gray-200" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(productPage + 1)}
            disabled={productPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;

// Skeleton while loading
const ProductsSkeleton = ({ title = "PRODUCTS" }: { title?: string }) => {
  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <H3 className="text-left text-foreground text-sm font-medium">{title}</H3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
