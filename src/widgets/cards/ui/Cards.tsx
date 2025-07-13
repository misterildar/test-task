import { CARD_MESSAGES } from '../consts/messages';
import { useInfiniteScroll } from '@/shared/hooks';
import { ProductCard } from '@/entities/product-card';
import { useProductPagination } from '@/shared/hooks/useProductPagination';

import styles from './Cards.module.scss';

export const Cards = () => {
	const { products, hasMore, loadMore, initialLoadComplete, error, isLoading, isValidating } =
		useProductPagination();

	const { triggerRef } = useInfiniteScroll({
		hasMore,
		onLoadMore: loadMore,
		isLoading,
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
			{isLoading && hasMore && <p>{CARD_MESSAGES.loadingProducts}</p>}
			{error && (
				<p className={styles.error}>
					{CARD_MESSAGES.errorPrefix} {error.message || error.toString()}
				</p>
			)}
			<div ref={triggerRef} />
			{isValidating && <p>Обновляем данные...</p>}
		</section>
	);
};
