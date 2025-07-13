import { httpClient } from '@/shared/api';
import { OrderResponse, OrderRequest } from './types';

export const createOrder = (orderData: OrderRequest, signal?: AbortSignal) => {
	return httpClient<OrderResponse>('post', '/order', orderData, { signal });
};
