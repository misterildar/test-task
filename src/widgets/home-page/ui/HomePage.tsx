'use client';

import { useEffect } from 'react';

import { Basket } from '@/entities/basket';
import { HOME_MESSAGES } from '../consts/messages';
import { ProductCard } from '@/entities/product-card';
import { Review } from '@/entities/review-card/model/types';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { useProductCartStore } from '@/entities/product-card';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useProductPagination } from '@/shared/hooks/useProductPagination';
import { ReviewCard, fetchReviews, useReviewStore } from '@/entities/review-card/';

import styles from './HomePage.module.scss';

export const HomePage = () => {
	const reviews = useReviewStore((state) => state.reviews);
	const setReviews = useReviewStore((state) => state.setReviews);

	const products = useProductCartStore((state) => state.products);

	const {
		error: reviewsError,
		isLoading: reviewsLoading,
		sendRequest: sendReviewsRequest,
	} = useApiRequest<Review[], void>();

	const {
		hasMore,
		loadMore,
		initialLoadComplete,
		error: productsError,
		isLoading: productsLoading,
	} = useProductPagination();

	useEffect(() => {
		sendReviewsRequest(fetchReviews).then((data) => {
			if (Array.isArray(data)) setReviews(data);
		});
	}, [sendReviewsRequest, setReviews]);

	const { triggerRef } = useInfiniteScroll({
		hasMore,
		onLoadMore: loadMore,
		isLoading: productsLoading,
		options: { threshold: 0.3 },
		enabled: initialLoadComplete,
	});

	return (
		<section className={styles.section}>
			<div className={styles.title}>
				<h1 className={styles.h1}>{HOME_MESSAGES.title}</h1>
			</div>
			{reviewsLoading && <p>{HOME_MESSAGES.loadingReviews}</p>}
			{reviewsError && <p className={styles.error}>{HOME_MESSAGES.errorPrefix}</p>}
			<div className={styles.reviews}>
				{!reviewsLoading &&
					!reviewsError &&
					reviews.map((review) => (
						<ReviewCard
							key={review.id}
							text={review.text}
						/>
					))}
			</div>
			<Basket />
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
			<div ref={triggerRef} />
			{productsLoading && hasMore && <p>{HOME_MESSAGES.loadingProducts}</p>}
			{productsError && (
				<p className={styles.error}>
					{HOME_MESSAGES.errorPrefix} {productsError}
				</p>
			)}
		</section>
	);
};
