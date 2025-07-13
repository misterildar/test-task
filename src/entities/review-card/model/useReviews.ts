import useSWR from 'swr';
import { useEffect } from 'react';

import { getReviews } from './api';
import { useReviewStore } from '@/entities/review-card/model/store';

export const useReviews = () => {
	const { reviews: storedReviews, setReviews } = useReviewStore();
	const shouldFetch = storedReviews.length === 0;

	const { data, error, isLoading, isValidating } = useSWR(
		shouldFetch ? ['reviews'] : null,
		getReviews,
		{
			fallbackData: storedReviews.length ? storedReviews : undefined,
			revalidateOnFocus: false,
		}
	);

	useEffect(() => {
		if (data && data !== storedReviews) {
			setReviews(data);
		}
	}, [data, storedReviews, setReviews]);

	return { reviews: data, error, isLoading, isValidating };
};
