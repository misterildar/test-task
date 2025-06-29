import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { createOrder } from '../../model/api';
import { useOrderStore } from '@/entities/basket';
import { Button, Input, Modal } from '@/shared/ui';
import { TableGoods } from '../TableGoods/TableGoods';
import { BASKET_MESSAGES } from '../../consts/messages';
import { FormValues, CartIdQuantity, Status } from '../../model/types';

import styles from './Basket.module.scss';

export const Basket = () => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		mode: 'all',
		defaultValues: { phone: '' },
	});

	const [status, setStatus] = useState<Status>('idle');

	const basketStore = useOrderStore((store) => store.cart);

	const isFormDisabled =
		Object.keys(errors).length > 0 || status === 'loading' || basketStore.length === 0;

	const disableClearButton = basketStore.length === 0;

	const { clearCart } = useOrderStore.getState();

	const handleClearCart = (statusModal: Status, clearCart?: () => void) => {
		if (clearCart) clearCart();
		setStatus(statusModal);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		if (status === 'loading') return;
		setStatus('loading');
		const cleanedPhone = data.phone.replace(/\D/g, '');
		try {
			const orderData = {
				phone: cleanedPhone,
				cart: basketStore.map(({ id, quantity }: CartIdQuantity) => ({
					id,
					quantity,
				})),
			};
			const response = await createOrder(orderData);
			if (response.success === 1) {
				setStatus('success');
				clearCart();
				reset({ phone: '' }, { keepErrors: false, keepDirty: false, keepTouched: false });
			} else {
				setStatus('error');
				console.error(response.error || 'Unknown API error');
			}
		} catch (error) {
			setStatus('error');
			console.error(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.basket}
		>
			<div className={styles.container}>
				<h2 className={styles.title}>{BASKET_MESSAGES.title}</h2>
				<button
					type='button'
					onClick={() => handleClearCart('showClearModal')}
					className={styles.clear}
					disabled={disableClearButton}
				>
					<p>{BASKET_MESSAGES.clearButton}</p>
				</button>
			</div>

			<TableGoods />

			<div className={styles.wrapper}>
				<Input
					{...register('phone', {
						required: BASKET_MESSAGES.phoneRequired,
						validate: (value) => {
							const digits = value.replace(/\D/g, '');
							return digits.length === 11 || BASKET_MESSAGES.phoneInvalidLength;
						},
					})}
					placeholder={BASKET_MESSAGES.phonePlaceholder}
					disabled={status === 'loading'}
				/>
				{errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
				<Button
					text={BASKET_MESSAGES.orderButton}
					disabled={isFormDisabled}
					type='submit'
					loading={status === 'loading'}
				/>
			</div>
			<Modal
				isOpen={status === 'success' || status === 'error' || status === 'showClearModal'}
				onClose={() => setStatus('idle')}
			>
				{status === 'success' && <h2>{BASKET_MESSAGES.orderSuccess}</h2>}
				{status === 'error' && <h2>{BASKET_MESSAGES.orderError}</h2>}
				{status === 'showClearModal' && (
					<div className={styles.clearModal}>
						<h2>{BASKET_MESSAGES.clearModalTitle}</h2>
						<Button
							className={styles.clearButton}
							text='Да'
							onClick={() => handleClearCart('clear', clearCart)}
						/>
					</div>
				)}
			</Modal>
		</form>
	);
};
