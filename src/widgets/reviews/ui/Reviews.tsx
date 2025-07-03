import { useEffect } from 'react';

import { REVIEWS_MESSAGES } from '../consts/messages';
import { Review } from '@/entities/review-card/model/types';
import { useApiRequest } from '@/shared/hooks';
import { ReviewCard, fetchReviews, useReviewStore } from '@/entities/review-card/';

import styles from './Reviews.module.scss';

export const Reviews = () => {
	const reviews = useReviewStore((state) => state.reviews);

	const setReviews = useReviewStore((state) => state.setReviews);

	const {
		error: reviewsError,
		isLoading: reviewsLoading,
		sendRequest: sendReviewsRequest,
	} = useApiRequest<Review[], void>();

	useEffect(() => {
		sendReviewsRequest(fetchReviews).then((data) => {
			if (Array.isArray(data)) setReviews(data);
		});
	}, [sendReviewsRequest, setReviews]);

	return (
		<section className={styles.section}>
			{reviewsLoading && <p>{REVIEWS_MESSAGES.loadingReviews}</p>}
			{reviewsError && <p className={styles.error}>{REVIEWS_MESSAGES.errorPrefix}</p>}
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
		</section>
	);
};
