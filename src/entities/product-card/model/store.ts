import { create } from 'zustand';

import { ProductStoreProps } from './types';

export const useProductCartStore = create<ProductStoreProps>((set) => ({
	products: [],
	productIds: new Set(),

	setProducts: (productsData) =>
		set(() => ({
			products: productsData,
			productIds: new Set(productsData.map((products) => products.id)),
		})),

	addProducts: (newProducts) => {
		set((state) => {
			const uniqueNewProducts = newProducts.filter(
				(newProduct) => !state.productIds.has(newProduct.id)
			);
			if (uniqueNewProducts.length === 0) {
				return state;
			}
			const newProductIds = new Set(state.productIds);
			uniqueNewProducts.forEach((products) => newProductIds.add(products.id));
			return {
				products: [...state.products, ...uniqueNewProducts],
				productIds: newProductIds,
			};
		});
	},
}));
