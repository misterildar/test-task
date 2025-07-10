import useSWR from 'swr';
import { httpClient } from '@/shared/api';
import { REVIEWS_MESSAGES } from '../consts/messages';
import { ReviewCard } from '@/entities/review-card/';
import { Review } from '@/entities/review-card/model/types';

import styles from './Reviews.module.scss';

export const Reviews = () => {
	const fetcher = (url: string, signal: AbortSignal) =>
		httpClient<Review[]>('get', url, { signal });

	const { data: reviews, error, isLoading, isValidating } = useSWR<Review[]>('/reviews', fetcher);

	return (
		<section className={styles.section}>
			{error && <p className={styles.error}>{REVIEWS_MESSAGES.errorPrefix}</p>}
			<div className={styles.reviews}>
				{reviews?.map((review) => (
					<ReviewCard
						key={review.id}
						text={review.text}
					/>
				))}
				{!reviews && isLoading && <p>{REVIEWS_MESSAGES.loadingReviews}</p>}
			</div>
			{reviews && isValidating && <p className={styles.loadingIndicator}>Обновляем отзывы...</p>}
		</section>
	);
};
