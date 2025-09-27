import { asyncHandler } from "@/lib/asyncHandler";
import { api } from "@/lib/axios";
import { BannerResponse } from "@/types/banner";

export const getHomeBanners = async (): Promise<BannerResponse> => {
  const result = await asyncHandler(async () => {
    const response = await api.get("/list-home-banner");
    return response.data;
  });
  return result.data;
};
