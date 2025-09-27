import { useQuery } from "@tanstack/react-query";
import { getHomeBanners } from "@/services/bannerService";

export const useBanners = () => {
  return useQuery({
    queryKey: ["homeBanners"],
    queryFn: getHomeBanners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};
