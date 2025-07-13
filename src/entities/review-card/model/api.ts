import { Review } from './types';
import { httpClient } from '@/shared/api';

export const getReviews = (_key: string, { signal }: { signal?: AbortSignal } = {}) => {
	return httpClient<Review[]>('get', '/reviews', { signal });
};


