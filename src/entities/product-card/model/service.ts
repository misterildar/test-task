import { getProducts } from './api';
import { ProductsResponse, ProductRequestParams } from './types';

export const fetchProductCart = async (
	params?: ProductRequestParams
): Promise<ProductsResponse> => {
	if (!params) {
		throw new Error('Product request parameters are required to fetch products.');
	}
	return await getProducts(params);
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
