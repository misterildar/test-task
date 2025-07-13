import { api } from './api';
import { AxiosRequestConfig } from 'axios';
import { HttpMethod } from '@/shared/model/types';

export const httpClient = async <T>(
	method: HttpMethod,
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig & { signal?: AbortSignal }
): Promise<T> => {
	try {
		const response = await api.request<T>({
			method,
			url,
			data,
			...config,
		});

		return response.data;
	} catch (error: unknown) {
		if (error && typeof error === 'object' && ('code' in error || 'message' in error)) {
			const err = error as { code?: string; message?: string };
			if (err.code === 'ERR_CANCELED' || err.message === 'canceled') {
				throw new Error('Request canceled');
			}
		}
		console.error(error);
		throw new Error('An unknown error occurred');
	}
};
