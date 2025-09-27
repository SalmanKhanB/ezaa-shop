export type BannerStatus = "small-popup" | "large-popup" | "banner";

export interface HomeBanner {
  id: number;
  image: string;
  status: BannerStatus;
  created_at: string;
  updated_at: string;
}

export interface BannerResponse {
  status: string;
  message: string;
  homeBanners: HomeBanner[];
}

export interface BannerCarouselProps {
  banners: HomeBanner[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface SmallPopupProps {
  banners: HomeBanner[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface LargePopupProps {
  banners: HomeBanner[];
  isLoading?: boolean;
  isError?: boolean;
}
