import { CARD_MESSAGES } from '../consts/messages';
import { ProductCard } from '@/entities/product-card';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useProductPagination } from '@/shared/hooks/useProductPagination';

import styles from './Cards.module.scss';

export const Cards = () => {
	const {
		hasMore,
		loadMore,
		products,
		initialLoadComplete,
		error: productsError,
		isLoading: productsLoading,
	} = useProductPagination();

	const { triggerRef } = useInfiniteScroll({
		hasMore,
		onLoadMore: loadMore,
		isLoading: productsLoading,
		options: { threshold: 0.3 },
		enabled: initialLoadComplete,
	});

	return (
		<section>
			<div className={styles.products}>
				{products.map((product, index) => (
					<ProductCard
						key={product.id}
						id={product.id}
						image_url={product.image_url}
						title={product.title}
						price={product.price}
						description={product.description}
						priority={index < 4}
					/>
				))}
			</div>
			{productsLoading && hasMore && <p>{CARD_MESSAGES.loadingProducts}</p>}
			{productsError && (
				<p className={styles.error}>
					{CARD_MESSAGES.errorPrefix} {productsError}
				</p>
			)}
			<div ref={triggerRef} />
		</section>
	);
};
