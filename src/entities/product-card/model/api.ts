import { httpClient } from '@/shared';
import { ProductsResponse, ProductRequestParams } from './types';

export const getProducts = ({ page, page_size }: ProductRequestParams) => {
	return httpClient<ProductsResponse>('get', '/products', {
		params: { page, page_size },
	});
};
