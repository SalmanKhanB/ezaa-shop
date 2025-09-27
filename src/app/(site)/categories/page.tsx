"use client";

import Container from "@/components/container";
import { H1 } from "@/components/typography";
import { useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/store/hooks";
import { setSelectedCategoryId, setSelectedSubCategoryId } from "@/lib/store/slices/productSlice";
import { useCategories, useSubCategories, useAllSubCategories, useProductsBySubCategory } from "@/hooks/useProducts";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProductCard } from "@/components/cards/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyImage from "@/components/my-image";
import CategoryCard from "@/components/category-card";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { selectedCategoryId, selectedSubCategoryId } = useAppSelector((store) => store.product);
  const { userId } = useAppSelector((store) => store.auth);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get data for all levels
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories(userId || undefined);
  const { data: subcategoriesData, isLoading: subcategoriesLoading } = useSubCategories(selectedCategoryId || 0, userId || undefined);
  const { data: allSubcategoriesData } = useAllSubCategories(userId || undefined);
  const { data: productsData, isLoading: productsLoading, isError: productsError, error: productsErr } = useProductsBySubCategory(selectedSubCategoryId || 0, userId || undefined);
  
  const categories = categoriesData?.data?.categories || [];
  const subcategories = subcategoriesData?.data?.subCategories || [];
  const products = productsData?.data?.products || [];
  
  const selectedCategory = categories.find((cat: any) => cat.id === selectedCategoryId);
  const selectedSubcategory = subcategories.find((sub: any) => sub.id === selectedSubCategoryId);

  // Handle URL parameters for navigation
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    
    if (categoryParam) {
      const categoryId = parseInt(categoryParam);
      if (categoryId && categoryId > 0 && categoryId !== selectedCategoryId) {
        dispatch(setSelectedCategoryId(categoryId));
        dispatch(setSelectedSubCategoryId(0)); // Reset subcategory when category changes
      }
    } else if (subcategoryParam) {
      const subcategoryId = parseInt(subcategoryParam);
      if (subcategoryId && subcategoryId > 0 && subcategoryId !== selectedSubCategoryId) {
        // Find the category for this subcategory from all subcategories
        if (allSubcategoriesData?.data?.subCategories) {
          const subcategory = allSubcategoriesData.data.subCategories.find((sub: any) => sub.id === subcategoryId);
          if (subcategory && subcategory.category_id) {
            dispatch(setSelectedCategoryId(subcategory.category_id));
            dispatch(setSelectedSubCategoryId(subcategoryId));
          }
        }
      }
    } else {
      // No parameters - show all categories
      if (selectedCategoryId !== 0 || selectedSubCategoryId !== 0) {
        dispatch(setSelectedCategoryId(0));
        dispatch(setSelectedSubCategoryId(0));
      }
    }
  }, [searchParams, selectedCategoryId, selectedSubCategoryId, allSubcategoriesData, dispatch]);

  // Error handling
  useEffect(() => {
    if (productsError && productsErr) {
      console.error("Error loading products:", productsErr);
      toast.error("Failed to load products.");
    }
  }, [productsError, productsErr]);

  const handleCategorySelect = (categoryId: number) => {
    dispatch(setSelectedCategoryId(categoryId));
    dispatch(setSelectedSubCategoryId(0)); // Reset subcategory when category changes
    router.push(`/categories?category=${categoryId}`);
  };

  const handleSubcategorySelect = (subcategoryId: number) => {
    dispatch(setSelectedSubCategoryId(subcategoryId));
    router.push(`/categories?subcategory=${subcategoryId}`);
  };

  const handleBackToCategories = () => {
    dispatch(setSelectedCategoryId(0));
    dispatch(setSelectedSubCategoryId(0));
    router.push('/categories');
  };

  const handleBackToSubcategories = () => {
    dispatch(setSelectedSubCategoryId(0));
    router.push(`/categories?category=${selectedCategoryId}`);
  };

  const handleClearAll = () => {
    dispatch(setSelectedCategoryId(0));
    dispatch(setSelectedSubCategoryId(0));
    router.push('/categories');
  };

  // Determine current view based on selections
  const currentView = selectedSubCategoryId > 0 ? "products" : selectedCategoryId > 0 ? "subcategories" : "categories";

  return (
    <Container>
      <div className="my-8">
        <H1 className="text-center mb-8">Browse Products</H1>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <button
            onClick={handleBackToCategories}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Categories
          </button>
          {selectedCategoryId > 0 && (
            <>
              <span className="text-muted-foreground">/</span>
              <button
                onClick={handleBackToSubcategories}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {selectedCategory?.name || 'Subcategories'}
              </button>
            </>
          )}
          {selectedSubCategoryId > 0 && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{selectedSubcategory?.name || 'Products'}</span>
            </>
          )}
        </div>
        
        <Tabs value={currentView} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1 bg-muted">
            <TabsTrigger 
              value="categories" 
              onClick={handleBackToCategories}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger 
              value="subcategories" 
              disabled={selectedCategoryId === 0}
              onClick={handleBackToSubcategories}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2 disabled:opacity-50"
            >
              Subcategories
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              disabled={selectedSubCategoryId === 0}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm font-medium py-2 disabled:opacity-50"
            >
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-0">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-7 gap-4">
              {categoriesLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 rounded-2xl" />
                ))
              ) : (
                categories.map((category: any) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    isSelected={selectedCategoryId === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="subcategories" className="mt-0">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-foreground">
                    {selectedCategory?.name} - Subcategories
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {subcategories.length} subcategor{subcategories.length !== 1 ? 'ies' : 'y'} found
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleBackToCategories}
                  className="text-sm w-full sm:w-auto"
                >
                  ← Back to Categories
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {subcategoriesLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 rounded-2xl" />
                ))
              ) : subcategories.length > 0 ? (
                subcategories.map((subcategory: any) => (
                  <div
                    key={subcategory.id}
                    onClick={() => handleSubcategorySelect(subcategory.id)}
                    className={`group p-2 rounded-2xl hover:shadow-md transition-all cursor-pointer border ${
                      selectedSubCategoryId === subcategory.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <div className="text-center">
                      <h3 className={`font-semibold text-xs line-clamp-2 transition-colors ${
                        selectedSubCategoryId === subcategory.id
                          ? "text-primary-foreground"
                          : "text-foreground group-hover:text-primary"
                      }`}>
                        {subcategory.name}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No subcategories found for this category.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-0">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-foreground">
                    {selectedSubcategory?.name} - Products
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {products.length} product{products.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleBackToSubcategories}
                  className="text-sm w-full sm:w-auto"
                >
                  ← Back to Subcategories
                </Button>
              </div>
            </div>
            
            {productsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton key={index} className="h-64 rounded-2xl" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this subcategory.</p>
                <Button 
                  variant="outline" 
                  onClick={handleBackToSubcategories}
                  className="mt-4"
                >
                  ← Back to Subcategories
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default CategoriesPage;
