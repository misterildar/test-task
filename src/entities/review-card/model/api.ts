import { httpClient } from '@/shared/api';
import { Review } from './types';

export const getReviews = async (): Promise<Review[]> => {
	return httpClient<Review[]>('get', '/reviews');
};
