import { AsyncResponse } from "@/types";
import { AxiosError } from "axios";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const asyncHandler = async <T>(
  asyncFn: () => Promise<T>,
  maxRetries: number = 3
): Promise<AsyncResponse<T>> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const data = await asyncFn();
      return {
        data,
        error: null,
        status: "success",
      };
    } catch (err: any) {
      lastError = err;
      
      // Don't retry for 404 errors (product not found)
      if (err?.response?.status === 404) {
        throw new Error("Product Not Found!");
      }
      
      // Don't retry for 401 errors (unauthorized)
      if (err?.response?.status === 401) {
        throw new Error("Unauthorized access");
      }
      
      // For rate limiting (429) or server errors (500), retry with exponential backoff
      if (err?.response?.status === 429 || err?.response?.status >= 500) {
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff: 1s, 2s, 4s
          console.log(`🔄 Retrying API call (attempt ${attempt}/${maxRetries}) after ${delay}ms delay`);
          await sleep(delay);
          continue;
        }
      }
      
      // For other errors, don't retry
      break;
    }
  }
  
  const isAxiosError = lastError instanceof AxiosError;
  const errorMessage = isAxiosError
    ? lastError.response?.data?.message
    : lastError?.response?.data?.message;
  const error = errorMessage || lastError.message || "Something went wrong";
  throw new Error(error);
};
