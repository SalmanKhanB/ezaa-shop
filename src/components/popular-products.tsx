"use client";

import { ProductCard } from "@/components/cards/product-card";
import { H3 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePopularProducts } from "@/hooks/useProducts";

const PopularProducts = ({
  total = 12,
  search,
  title = "Popular Products",
}: {
  total?: number;
  search?: boolean;
  title?: string | boolean;
}) => {
  const { token, userId } = useAppSelector((store) => store.auth);
  const isAuthenticated = !!token && !!userId;
  const {
    selectedSubCategoryId,
  } = useAppSelector((store) => store.product);

  const { data, isLoading, error } = usePopularProducts(typeof userId === 'number' ? userId : -1);
  const products = data?.data?.products || [];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = search
    ? products.filter((item: any) => {
        const prod = item.products || item;
        return prod.name && prod.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : products;

  useEffect(() => {
    if (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products.");
    }
  }, [error]);

  if (isLoading) return <ProductsSkeleton title={title} />;

  if (selectedSubCategoryId && !filteredProducts.length) {
    return (
      <div className="my-8">
       {title && <H3 className="text-center text-foreground text-sm font-medium mb-6">{title}</H3>}
        {search && (
          <div className="mb-4 flex justify-center">
            <Input
              placeholder="Search popular products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
            />
          </div>
        )}
        <p className="text-center text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      {title && <H3 className="text-left text-foreground text-sm font-medium mb-6">{title}</H3>}

      {search && (
        <div className="mb-4 flex justify-center">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredProducts.slice(0, total).map((product: any) => {
          const prod = product.products || product;
          return (
            <ProductCard key={prod.id} product={prod} />
          );
        })}
      </div>
    </div>
  );
};

export default PopularProducts;

// Skeleton while loading
const ProductsSkeleton = ({
  title = "Popular Products",
}: {
  title?: string | boolean;
}) => {
  return (
    <div className="my-8">
      {title && <H3 className="text-center text-foreground text-sm font-medium mb-6">{title}</H3>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
