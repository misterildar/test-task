import { api } from './api';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const httpClient = async <T, C extends object = object>(
	method: HttpMethod,
	url: string,
	config?: C
): Promise<T> => {
	try {
		const response = await api[method]<T>(url, config);
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
