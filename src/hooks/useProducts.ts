import {
  addReview,
  addToCart,
  filterProducts,
  getCategories,
  getPopularProducts,
  getProduct,
  getProductDetailById,
  getSubCategories,
  getUserCartInfo,
  getProductPublic,
  getProductDetailNo,
  getCategoriesPublic,
  getSubCategoriesByIdPublic,
  getSubCategoriesPublic,
  getProductsBySubCategoryPublic,
  getPopularProductsPublic
} from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get all categories
export const useCategories = (userId?: number) =>
export const useCategories = (userId?: number) =>
  useQuery({
    queryKey: ["categories", userId],
    queryFn: userId ? getCategories : getCategoriesPublic,
    queryKey: ["categories", userId],
    queryFn: userId ? getCategories : getCategoriesPublic,
  });

// Get subcategories by category ID
export const useSubCategories = (categoryId: number, userId?: number) =>
  useQuery({
    queryKey: ["subcategories", categoryId, userId],
    queryFn: userId && userId !== -1 ? () => getSubCategories(categoryId) : () => getSubCategoriesByIdPublic(categoryId),
    enabled: categoryId >= 0, // Allow 0 for "all subcategories"
  });

// Get all subcategories
export const useAllSubCategories = (userId?: number) =>
  useQuery({
    queryKey: ["allSubcategories", userId],
    queryFn: userId && userId !== -1 ? () => getSubCategories(0) : getSubCategoriesPublic,
  });

// Get product detail by detail ID
export const useProductDetailByIdAndUser = (productDetailId: number, userId: number) =>
  useQuery({
    queryKey: ["productDetail", productDetailId],
    queryFn: () => getProductDetailById(productDetailId, userId),
    enabled: !!productDetailId,
  });

// Get product detail by product and user ID
export const useProductDetailById = (
  productId: number,
  userId: number
) =>
  useQuery({
    queryKey: ["productDetailWithUser", productId, userId],
    queryFn: () => getProductDetailById(productId, userId),
    enabled: !!productId && !!userId,
  });

// Add to cart and revalidate user's cart info
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: any }) =>
      addToCart(userId, data),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["userCart", userId],
      });
    },
  });
};

// Get user cart info
export const useUserCartInfo = (userId: number) =>
  useQuery({
    queryKey: ["userCart", userId],
    queryFn: () => getUserCartInfo(userId),
    enabled: !!userId,
  });

// Add review and revalidate product detail
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, reviewData }: any) => addReview(userId, reviewData),
    onSuccess: (_data, { userId, reviewData }) => {
      queryClient.invalidateQueries({
        queryKey: ["productDetailWithUser", reviewData.productId, userId],
      });
    },
  });
};

// // Get product by productId and userId (or public if not logged in)
// export const useProduct = (productId: number, userId?: number) =>
//   useQuery({
//     queryKey: ["product", productId, userId],
//     queryFn: userId ? () => getProduct(productId, userId) : () => getProductPublic(productId),
//     enabled: !!productId,
//   });
  export const useProduct = (productId: number, userId?: number) =>
    useQuery({
      queryKey: ["product", productId, userId],
      queryFn: userId && userId !== -1 ? () => getProduct(productId, userId) : () => getProductDetailNo(productId),
      enabled: !!productId,
    });

// Get popular products for user (or public if not logged in)
export const usePopularProducts = (userId?: number) =>
// Get popular products for user (or public if not logged in)
export const usePopularProducts = (userId?: number) =>
  useQuery({
    queryKey: ["popularProducts", userId],
    queryFn: userId && userId !== -1 ? () => getPopularProducts(userId) : getPopularProductsPublic,
    queryFn: userId && userId !== -1 ? () => getPopularProducts(userId) : getPopularProductsPublic,
  });

// Filter products and optionally revalidate product listings
export const useFilterProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      subCategoryId,
      userId,
      filterParams,
    }: {
      categoryId: number;
      subCategoryId: number;
      userId: number;
      filterParams?: any;
    }) => filterProducts(categoryId, subCategoryId, userId, filterParams),
    onSuccess: (_data, { categoryId, subCategoryId, userId }) => {
      // If you have a key to cache filtered products, you can invalidate here too
      queryClient.invalidateQueries({
        queryKey: ["filteredProducts", categoryId, subCategoryId, userId],
      });
    },
  });
};

// Add a public product fetcher (no userId)
export const useProductPublic = (productId: number) =>
  useQuery({
    queryKey: ["productPublic", productId],
    queryFn: () => getProductPublic(productId),
    enabled: !!productId,
  });

// Get products by subcategory
export const useProductsBySubCategory = (subCategoryId: number, userId?: number) =>
  useQuery({
    queryKey: ["productsBySubCategory", subCategoryId, userId],
    queryFn: userId && userId !== -1 ? () => getProduct(subCategoryId, userId) : () => getProductsBySubCategoryPublic(subCategoryId),
    enabled: !!subCategoryId,
  });
