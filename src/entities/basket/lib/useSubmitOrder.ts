import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { createOrder } from '../model/api';
import { useOrderStore } from '../model/store';
import { FormValues, Status } from '../model/types';

interface UseSubmitOrderProps {
	reset: UseFormReset<FormValues>;
}

export const useSubmitOrder = ({ reset }: UseSubmitOrderProps) => {
	const [status, setStatus] = useState<Status>('idle');
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
