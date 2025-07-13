import { ReviewCard } from '@/entities/review-card/';
import { REVIEWS_MESSAGES } from '../consts/messages';
import { useReviews } from '@/entities/review-card/model/useReviews';

import styles from './Reviews.module.scss';

export const Reviews = () => {
	const { reviews, error, isLoading, isValidating } = useReviews();

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
