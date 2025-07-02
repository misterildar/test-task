import { ReactNode } from 'react';
import { Modal } from '@/shared/ui';
import { CARD_MESSAGES } from '../../consts/messages';
import { ModalDetailsProps, StatusDetails } from '../../model/types';

export const ModalDetails = ({ status, onClose, isModalOpen }: ModalDetailsProps) => {
	const modalModalDetailsMap: Record<StatusDetails, ReactNode> = {
		isLoading: <p>{CARD_MESSAGES.isLoading}</p>,
		error: <p>{CARD_MESSAGES.errorGetProduct}</p>,
		ready: null,
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={onClose}
		>
			{modalModalDetailsMap[status]}
		</Modal>
	);
};
