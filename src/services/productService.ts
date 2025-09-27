import { asyncHandler } from "@/lib/asyncHandler";
import { api, multiPartApi } from "@/lib/axios";

export type CartItem = {
  product_id: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type ReviewData = {
  product_id: string;
  rating: number;
  comment: string;
};

export type ProductFilterParams = {
  price_range?: [number, number];
  rating?: number;
  color?: string;
  size?: string;
  sort_by?: "price_low_to_high" | "price_high_to_low" | "newest" | "rating";
};

// Get all categories
export const getCategories = () =>
  asyncHandler(() => api.get("/getCategory").then((res) => res.data));

// Get subcategories for a category
export const getSubCategories = (categoryId: number) =>
  asyncHandler(() =>
    api.get(`/getSubCategory/${categoryId}`).then((res) => res.data)
  );

// Get product details by product detail ID
export const getProductDetailById = (productDetailId: number, userId: number) =>
  asyncHandler(() =>
    api
      .get(`/productDetail/${productDetailId}/${userId}`)
      .then((res) => res.data)
  );

// Get product details by product ID and user ID
export const getProductDetailByIdAndUser = (
  productId: number,
  userId: number
) =>
  asyncHandler(() =>
    api.get(`/productDetail/${productId}/${userId}`).then((res) => res.data)
  );

// Add item(s) to cart
export const addToCart = (userId: number, data:any) => {
  // const cartItems = Array.isArray(items) ? items : [items];
  return asyncHandler(() =>
    multiPartApi
      .post(`/addCart/${userId}`, data)
      .then((res) => res.data)
  );
};

// Get user's cart information
export const getUserCartInfo = (userId: number) =>
  asyncHandler(() =>
    api.get(`/userCartInfo/${userId}`).then((res) => res.data)
  );

// Add a product review
export const addReview = (userId: number, reviewData: ReviewData) =>
  asyncHandler(() =>
    api.post(`/review/${userId}`, reviewData).then((res) => res.data)
  );

// Get product with user context
export const getProduct = (productId: number, userId: number) =>
  asyncHandler(() =>
    api.get(`/product/${productId}/${userId}`).then((res) => res.data)
  );

// Get popular products for user
export const getPopularProducts = (userId: number) =>
  asyncHandler(() =>
    api.get(`/popularProduct/${userId}`).then((res) => res.data)
  );

// Filter products by category, subcategory and user
export const filterProducts = (
  categoryId: number,
  subCategoryId: number,
  userId: number,
  filterParams: ProductFilterParams = {}
) =>
  asyncHandler(() =>
    api
      .post(
        `/productFilter/${categoryId}/${subCategoryId}/${userId}`,
        filterParams
      )
      .then((res) => res.data)
  );

// Get product for public (no userId)
export const getProductPublic = (productId: number) =>
  asyncHandler(() =>
    api.get(`/productNo/${productId}`).then((res) => res.data)
  );

// Get product detail for public (no userId) - new endpoint
export const getProductDetailNo = (productId: number) =>
  asyncHandler(() =>
    api.get(`/productDetailNo/${productId}`).then((res) => res.data)
  );

// Get all categories (public)
export const getCategoriesPublic = () =>
  asyncHandler(() => api.get("/getCategoryNo").then((res) => res.data));

// Get all subcategories (public)
export const getSubCategoriesPublic = () =>
  asyncHandler(() => api.get("/getSubCategoryNo").then((res) => res.data));

// Get subcategories by categoryId (public)
export const getSubCategoriesByIdPublic = (categoryId: number) =>
  asyncHandler(() => api.get(`/getSubCategoryNo/${categoryId}`).then((res) => res.data));

// Get products by subCategoryId (public)
export const getProductsBySubCategoryPublic = (subCategoryId: number) =>
  asyncHandler(() => api.get(`/productNo/${subCategoryId}`).then((res) => res.data));

// Get popular products (public)
export const getPopularProductsPublic = () =>
  asyncHandler(() => api.get("/popularProductNo").then((res) => res.data));
