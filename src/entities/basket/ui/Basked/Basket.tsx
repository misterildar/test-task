import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/shared/ui';
import { useOrderStore } from '@/entities/basket';
import { PhoneMask } from '../PhoneMask/PhoneMask';
import { TableGoods } from '../TableGoods/TableGoods';
import { useSubmitOrder } from '../../lib/useSubmitOrder';
import { FormValues } from '../../model/types';
import { BASKET_MESSAGES } from '../../consts/messages';

import styles from './Basket.module.scss';
import { ModalBasked } from '../ModalBasked/ModalBasked';

export const Basket = () => {
	const {
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		mode: 'onBlur',
		defaultValues: { phone: '' },
	});

	const { status, setStatus, submitOrder } = useSubmitOrder({ reset });

	const cart = useOrderStore((state) => state.cart);
	const clearCart = useOrderStore((state) => state.clearCart);

	const isOrderButtonDisabled =
		Object.keys(errors).length > 0 || status === 'loading' || cart.length === 0;
	const isClearButtonDisabled = cart.length === 0;
	const isModalOpen = ['success', 'error', 'showClearModal'].includes(status);

	return (
		<form
			onSubmit={handleSubmit(submitOrder)}
			className={styles.basket}
		>
			<div className={styles.container}>
				<h2 className={styles.title}>{BASKET_MESSAGES.title}</h2>
				<button
					type='button'
					onClick={() => setStatus('showClearModal')}
					className={styles.clear}
					disabled={isClearButtonDisabled}
				>
					<p>{BASKET_MESSAGES.clearButton}</p>
				</button>
			</div>

			<TableGoods />

			<div className={styles.wrapper}>
				<Controller
					name='phone'
					control={control}
					rules={{
						required: BASKET_MESSAGES.phoneRequired,
						minLength: {
							value: 11,
							message: BASKET_MESSAGES.phoneInvalidLength,
						},
						maxLength: {
							value: 11,
							message: BASKET_MESSAGES.phoneInvalidLength,
						},
					}}
					render={({ field }) => (
						<PhoneMask
							{...field}
							placeholder={BASKET_MESSAGES.phonePlaceholder}
							disabled={status === 'loading'}
						/>
					)}
				/>
				{errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
				<Button
					text={BASKET_MESSAGES.orderButton}
					disabled={isOrderButtonDisabled}
					type='submit'
					loading={status === 'loading'}
				/>
			</div>
			<ModalBasked
				status={status}
				setStatus={setStatus}
				clearCart={clearCart}
				isModalOpen={isModalOpen}
			/>
		</form>
	);
};
