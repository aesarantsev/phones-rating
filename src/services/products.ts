import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { GetProductsApiResponse } from '../types/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<GetProductsApiResponse, string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;
