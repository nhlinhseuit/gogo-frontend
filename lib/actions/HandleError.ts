import ApiError from "@/types/ApiError";

export const handleError = (error:ApiError) => {
  throw new Error(`HTTP error! status: ${error.status}, message: ${error.message}`);
}
