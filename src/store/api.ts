import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types/product';

// Define types for API responses
export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL_LOCAL || 'http://localhost:5000',
  }),
  tagTypes: ['Products', 'Product', 'Reviews', 'Events', 'Orders'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
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
