import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ProductState {
  categories: any[];
  subCategories: any[];
  selectedCategoryId: number;
  selectedSubCategoryId: number;
  products: any[];
  popularProducts: any[];
  popularProductsLoading: boolean;
  popularProductsError: string | null;
  // Pagination states
  categoryPage: number;
  subcategoryPage: number;
  productPage: number;
  productsPerPage: number;
}

const initialState: ProductState = {
  categories: [],
  subCategories: [],
  selectedCategoryId: 0,
  selectedSubCategoryId: 0,
  products: [],
  popularProducts: [],
  popularProductsLoading: false,
  popularProductsError: null,
  // Pagination initial states
  categoryPage: 0,
  subcategoryPage: 0,
  productPage: 1,
  productsPerPage: 8,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action: PayloadAction<any[]>) => {
      state.subCategories = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<number>) => {
      state.selectedCategoryId = action.payload;
    },
    setSelectedSubCategoryId: (state, action: PayloadAction<number>) => {
      state.selectedSubCategoryId = action.payload;
    },
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
    setPopularProducts: (state, action: PayloadAction<any[]>) => {
      state.popularProducts = action.payload;
    },
    setPopularProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.popularProductsLoading = action.payload;
    },
    setPopularProductsError: (state, action: PayloadAction<string | null>) => {
      state.popularProductsError = action.payload;
    },
    // Pagination actions
    setCategoryPage: (state, action: PayloadAction<number>) => {
      state.categoryPage = action.payload;
    },
    setSubcategoryPage: (state, action: PayloadAction<number>) => {
      state.subcategoryPage = action.payload;
    },
    setProductPage: (state, action: PayloadAction<number>) => {
      state.productPage = action.payload;
    },
  },
});

export const {
  setCategories,
  setSubCategories,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  setProducts,
  setPopularProducts,
  setPopularProductsLoading,
  setPopularProductsError,
  setCategoryPage,
  setSubcategoryPage,
  setProductPage,
} = productSlice.actions;

export default productSlice.reducer;
