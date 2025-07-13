import { httpClient } from '@/shared/api';
import { ProductsResponse, ProductRequestParams } from './types';

export const getProducts = (params: ProductRequestParams, signal?: AbortSignal) => {
	if (!params) throw new Error('params is required');
	return httpClient<ProductsResponse>('get', '/products', { params, signal });
};


export const fetchProductDetails = (id: number) => {
	// Иметирую получение данных с сервера по id
	return {
		id: id,
		image_url: '/placeholder.png',
		title: 'Очень классный товар',
		description:
			'Так как нет отдельного эндпоинта для получения детальной информации о товаре по его id, пока здесь только статичные данные. Так как нет отдельного эндпоинта для получения детальной информации о товаре по его id, пока здесь только статичные данные. Так как нет отдельного эндпоинта для получения детальной информации о товаре по его id, пока здесь только статичные данные. Так как нет отдельного эндпоинта для получения детальной информации о товаре по его id, пока здесь только статичные данные. Так как нет отдельного эндпоинта для получения детальной информации о товаре по его id, пока здесь только статичные данные.',
		price: 30651,
	};
};