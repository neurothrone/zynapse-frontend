import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types/product";
import { supabase } from "./slices/authSlice";

// Define types for API responses
export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

// Helper function to get the current session token
const getAuthToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL_LOCAL || "http://localhost:5000",
    prepareHeaders: async (headers) => {
      // Get the token from Supabase session
      const token = await getAuthToken();

      // If we have a token, add it to the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Products", "Product", "Reviews", "Events", "Orders"],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result: Product | undefined, _error: unknown, id: number) => [{ type: "Product", id }],
    }),


    // Additional endpoints will be added for:
    // - Reviews
    // - Orders
    // - Events
    // - Authentication
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductQuery,
} = api;
