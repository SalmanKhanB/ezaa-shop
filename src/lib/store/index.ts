// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import appDataReducer from "./slices/appDataSlice";
import bankAccountReducer from "./slices/bankAccountSlice";
import notificationsReducer from "./slices/notificationSlice";
import cashbackReducer from "./slices/cashbackSlice";
import referralReducer from "./slices/referralSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    bankAccount: bankAccountReducer,
    appData: appDataReducer,
    notifications: notificationsReducer,
    cashback: cashbackReducer,
    referral: referralReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
