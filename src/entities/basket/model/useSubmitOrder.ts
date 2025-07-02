import { useState } from 'react';

import { createOrder } from './api';
import { useOrderStore } from './store';
import { FormValues, Status, UseSubmitOrderProps } from './types';

export const useSubmitOrder = ({ reset }: UseSubmitOrderProps) => {
	const [status, setStatus] = useState<Status>('ready');

	const cart = useOrderStore((state) => state.cart);

	const clearCart = useOrderStore((state) => state.clearCart);

	const submitOrder = async (data: FormValues) => {
		if (status === 'loading') return;
		setStatus('loading');
		try {
			const orderData = {
				phone: data.phone.replace(/\D/g, ''),
				cart: cart.map(({ id, quantity }) => ({ id, quantity })),
			};
			const response = await createOrder(orderData);
			if (response.success === 1) {
				setStatus('success');
				clearCart();
				reset({ phone: '' });
			} else {
				throw new Error(response.error || 'Unknown API error');
			}
		} catch (error) {
			setStatus('error');
			console.error(error);
		}
	};

	return { status, setStatus, submitOrder };
};
