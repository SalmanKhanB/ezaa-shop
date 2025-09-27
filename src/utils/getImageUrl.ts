import { baseUrl } from "@/config/constants";

const getImageUrl = (src: string, isBanner: boolean = false) => {
  if (isBanner) {
    return `${baseUrl}/public/${src}`;
  }
  return `${baseUrl}/${src}`;
};

export default getImageUrl;
