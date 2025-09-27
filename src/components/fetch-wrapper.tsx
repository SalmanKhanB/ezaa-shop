"use client";

import {
  useCategories,
  usePopularProducts,
  useProduct,
  useSubCategories,
} from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setCategories,
  setPopularProducts,
  setPopularProductsError,
  setPopularProductsLoading,
  setProducts,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  setSubCategories,
} from "@/lib/store/slices/productSlice";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Cashback Hooks
import {
  useCashbackInfo,
  useRequestInfo,
  useTotalCommission,
  useTransactionPool,
  useWalletTotal,
} from "@/hooks/useCashback";
import {
  setCashbackInfo,
  setCashbackRequestInfo,
  setCashbackTransactions,
  setCommission,
  setWallet,
} from "@/lib/store/slices/cashbackSlice";
import {
  useAdminNotifications,
  useCashbackNotifications,
  useCommissionNotifications,
} from "@/hooks/useNotifications";
import {
  setAdminNotifications,
  setCashbackNotifications,
  setCommissionNotifications,
} from "@/lib/store/slices/notificationSlice";
const FetchWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const userId = useAppSelector((state) => state.auth.user?.id) || "";
  
  // Don't auto-select on categories page
  const isCategoriesPage = pathname === '/categories';

  // Fetching product-related data
  const { data: categories, isPending } = useCategories();
  const selectedCategoryId = useAppSelector(
    (store) => store.product.selectedCategoryId
  );
  const { data: subCategories } = useSubCategories(selectedCategoryId || 0);
  const selectedSubCategoryId =
    useAppSelector((store) => store.product.selectedSubCategoryId) || 0;
  const { data: products } = useProduct(selectedSubCategoryId, userId || 0);

  // Cashback-related hooks
  const { data: cashbackTransactions } = useTransactionPool(userId || 0);
  const { data: cashbackInfo } = useCashbackInfo(userId || 0);
  const { data: wallet } = useWalletTotal(userId || 0);
  const { data: cashbackRequestInfo } = useRequestInfo(userId || 0);
  const { data: commission } = useTotalCommission(userId || 0);

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories?.data?.categories));

      if (categories?.data?.categories?.length > 0) {
        dispatch(setSelectedCategoryId(categories?.data?.categories[0].id));
      }
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (
      subCategories?.data?.subCategories &&
      subCategories.data.subCategories.length > 0
    ) {
      dispatch(setSubCategories(subCategories.data.subCategories));
      
      // Only auto-select first subcategory if NOT on categories page
      if (!isCategoriesPage) {
        dispatch(
          setSelectedSubCategoryId(subCategories.data.subCategories[0].id)
        );
      }
    }
  }, [subCategories, dispatch, isCategoriesPage]);

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products?.data?.products));
    }
  }, [products, dispatch]);

  useEffect(() => {
    if (cashbackTransactions) {
      dispatch(
        setCashbackTransactions(cashbackTransactions?.data?.userTransactionPool)
      );
    }
  }, [cashbackTransactions, dispatch]);

  useEffect(() => {
    if (cashbackInfo) {
      dispatch(setCashbackInfo(cashbackInfo?.data?.data));
    }
  }, [cashbackInfo, dispatch]);

  useEffect(() => {
    if (wallet) {
      dispatch(setWallet(wallet?.data));
    }
  }, [wallet, dispatch]);

  useEffect(() => {
    if (cashbackRequestInfo) {
      dispatch(
        setCashbackRequestInfo(cashbackRequestInfo?.data?.userRequestStatus)
      );
    }
  }, [cashbackRequestInfo, dispatch]);

  useEffect(() => {
    if (commission) {
      dispatch(setCommission(commission?.data));
    }
  }, [commission, dispatch]);

  // Fetching popular product data
  const {
    data: popularProducts,
    isLoading: popularProductsLoading,
    isError,
    error,
  } = usePopularProducts(userId || 0);

  const { data: cashbackData } = useCashbackNotifications(userId);
  const { data: commissionData } = useCommissionNotifications(userId);
  const { data: adminData } = useAdminNotifications(userId);

  useEffect(() => {
    if (cashbackData?.data?.userCashBack) {
      dispatch(setCashbackNotifications(cashbackData.data.userCashBack));
    }
  }, [cashbackData, dispatch]);

  useEffect(() => {
    if (commissionData?.data?.userCommission) {
      dispatch(setCommissionNotifications(commissionData.data.userCommission));
    }
  }, [commissionData, dispatch]);

  useEffect(() => {
    if (adminData?.data?.adminNotification) {
      dispatch(setAdminNotifications(adminData.data.adminNotification));
    }
  }, [adminData, dispatch]);

  useEffect(() => {
    if (popularProducts) {
      dispatch(setPopularProducts(popularProducts?.data?.products));
    }
  }, [popularProducts, dispatch]);

  useEffect(() => {
    dispatch(setPopularProductsLoading(popularProductsLoading));
  }, [popularProductsLoading, dispatch]);

  useEffect(() => {
    if (isError && error) {
      dispatch(setPopularProductsError(error.message));
    }
  }, [isError, error, dispatch]);

  return <>{children}</>;
};

export default FetchWrapper;
