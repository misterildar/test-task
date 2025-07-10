import { httpClient } from '@/shared/api';
import { Review } from './types';

export const getReviews = (): Promise<Review[]> => {
	return httpClient<Review[]>('get', '/reviews');
};
