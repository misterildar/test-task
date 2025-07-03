import { api } from './api';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface HttpClientConfig {
	signal?: AbortSignal | null;
	[key: string]: unknown;
}

export const httpClient = <T>(method: HttpMethod, url: string, config: HttpClientConfig = {}) => {
	if (config.signal === undefined) {
		const controller = new AbortController();
		config.signal = controller.signal;
	} else if (config.signal === null) {
		delete config.signal;
	}

	return api[method]<T>(url, config)
		.then((res) => res.data)
		.catch((error) => {
			if (error.name === 'CanceledError') {
				return Promise.reject(new Error('Запрос отменён'));
			}
			throw new Error(`API Error: ${error.message}`);
		});
};
