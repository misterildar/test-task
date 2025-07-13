import { createOrder } from './api';
import { useState, useRef, useEffect } from 'react';

import { useOrderStore } from './store';
import { FormValues, Status, UseSubmitOrderProps } from './types';

export const useSubmitOrder = ({ reset }: UseSubmitOrderProps) => {
	const [status, setStatus] = useState<Status>('ready');

	const cart = useOrderStore((state) => state.cart);

	const clearCart = useOrderStore((state) => state.clearCart);

	const abortControllerRef = useRef<AbortController | null>(null);

	const submitOrder = async (data: FormValues) => {
		if (status === 'loading') return;
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		const abortController = new AbortController();
		abortControllerRef.current = abortController;
		setStatus('loading');
		try {
			const orderData = {
				phone: data.phone.replace(/\D/g, ''),
				cart: cart.map(({ id, quantity }) => ({ id, quantity })),
			};
			const response = await createOrder(orderData, abortController.signal);
			if (response.success === 1) {
				setStatus('success');
				clearCart();
				reset({ phone: '' });
			} else {
				throw new Error(response.error || 'Unknown API error');
			}
		} catch (error) {
			if ((error as Error).message === 'Request canceled') {
				console.log('Order request was canceled');
			} else {
				setStatus('error');
				console.error(error);
			}
		} finally {
			abortControllerRef.current = null;
		}
	};

	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	return { status, setStatus, submitOrder };
};
