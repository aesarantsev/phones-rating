import axios from 'axios';
import { toast } from 'react-toastify';

import { Category, GetProductsApiResponse } from '../types/products';

const BASE_URL = 'https://dummyjson.com';

const getProducts = async (category?: Category) => {
  try {
    const url = category
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`;

    const result = await axios.get<GetProductsApiResponse>(url);

    return result.data.products;
  } catch (error) {
    const message = (error as Error).message;
    console.error('error', message);
    toast.error(message);
  }
};

export const productsApi = { getProducts };
