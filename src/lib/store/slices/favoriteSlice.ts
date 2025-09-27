import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Favorite Product Interface
interface FavoriteProduct {
  products: {
    id: number;
    product_image: { image: string; cover_status: number }[];
    name: string;
    product_deatils: { selling_price?: string }[];
  };
}

// Favorite State Interface
interface FavoriteState {
  favorites: FavoriteProduct[];
}

// Helper to load favorites from localStorage
const loadFavoritesFromStorage = (): FavoriteProduct[] => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        return [];
      }
    }
  }
  return [];
};

// Helper to save favorites to localStorage
const saveFavoritesToStorage = (favorites: FavoriteProduct[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Initial State
const initialState: FavoriteState = {
  favorites: loadFavoritesFromStorage(),
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteProduct>) {
      const alreadyExists = state.favorites.some(
        (fav) => fav.products.id === action.payload.products.id
      );
      if (!alreadyExists) {
        state.favorites.push(action.payload);
        saveFavoritesToStorage(state.favorites); // Save after adding
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (fav) => fav.products.id !== action.payload
      );
      saveFavoritesToStorage(state.favorites); // Save after removing
    },
    clearFavorites(state) {
      state.favorites = [];
      saveFavoritesToStorage(state.favorites); // Save after clearing
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
