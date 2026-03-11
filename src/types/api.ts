/**
 * Base API response and request types.
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  errors?: Array<{ field: string; messages: string[] }>;
}
