import { useEffect, useState } from 'react';
import { ProductSchema } from './schemas';
import { Product, StatusDetails } from './types';
import { CARD_MESSAGES } from '../consts/messages';
import { fetchProductDetails } from '@/entities/product-card';

const DEFAULT_PRODUCT: Product = {
	id: 0,
	title: '',
	price: 0,
	image_url: '',
	description: '',
};

export function useProduct(productId: string) {
	const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
	const [status, setStatus] = useState<StatusDetails>('ready');

	useEffect(() => {
		const loadProduct = async () => {
			try {
				setStatus('isLoading');
				const data = await fetchProductDetails(Number(productId));

				if (!data || typeof data !== 'object' || Array.isArray(data)) {
					throw new Error('Invalid response format');
				}
				const parseResult = ProductSchema.safeParse(data);
				if (!parseResult.success) {
					console.error(CARD_MESSAGES.validateErrorProduct, parseResult.error.errors);
					setStatus('error');
					return;
				}

				setProduct(parseResult.data);
				setStatus('ready');
			} catch (error) {
				console.error(CARD_MESSAGES.errorGetProduct, error);
				setStatus('error');
			}
		};

		loadProduct();
	}, [productId]);

	return { product, status, setStatus };
}
