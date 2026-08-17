export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string;
    /** Field name to message map, present for validation failures. */
    details?: Record<string, string>;
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SortDirection = "asc" | "desc";

export type BaseDocument = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
