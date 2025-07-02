import { ReactNode } from 'react';
import { Button, Modal } from '@/shared/ui';
import { BASKET_MESSAGES } from '../../consts/messages';
import { Status, ModalBaskedProps } from '../../model/types';

import styles from './ModalBasked.module.scss';

export const ModalBasked = ({ status, setStatus, clearCart, isModalOpen }: ModalBaskedProps) => {
	const modalContentMap: Record<Status, ReactNode> = {
		success: <h2>{BASKET_MESSAGES.orderSuccess}</h2>,
		error: <h2>{BASKET_MESSAGES.orderError}</h2>,
		clear: null,
		showClearModal: (
			<div className={styles.clearModal}>
				<h2>{BASKET_MESSAGES.clearModalTitle}</h2>
				<Button
					className={styles.clearButton}
					text={BASKET_MESSAGES.clearModalConfirmButton}
					onClick={() => {
						clearCart();
						setStatus('ready');
					}}
				/>
			</div>
		),
		ready: null,
		loading: null,
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setStatus('ready')}
		>
			{modalContentMap[status]}
		</Modal>
	);
};
