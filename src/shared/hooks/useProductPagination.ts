import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import { useProductCartStore } from '@/entities/product-card';
import { getProducts } from '@/entities/product-card/model/api';
import { ProductRequestParams, ProductsResponse } from '@/entities/product-card/model/types';

export const useProductPagination = () => {
	const { products, setProducts } = useProductCartStore();

	const getKey = (pageIndex: number, previousPageData: ProductsResponse | null) => {
		if (previousPageData && previousPageData.items.length === 0) return null;
		return ['products', { page: pageIndex + 1, page_size: 20 }];
	};

	const fetcher = (key: [string, ProductRequestParams]) => {
		const [, params] = key;
		return getProducts(params);
	};

	const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
		revalidateOnFocus: false,
	});

	useEffect(() => {
		if (data) {
			const allProducts = data.flatMap((page) => page.items);
			setProducts(allProducts);
		}
	}, [data, setProducts]);

	const hasMore = data ? data[data.length - 1].items.length > 0 : true;

	const loadMore = () => {
		if (!hasMore || isValidating) return;
		setSize(size + 1);
	};

	return {
		products,
		isLoading: !data && !error,
		error,
		hasMore,
		loadMore,
		initialLoadComplete: !!data,
		isValidating,
	};
};
