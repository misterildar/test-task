import { BASKET_MESSAGES } from '@/entities/basket/consts/messages';

export const validatePhoneLength = {
	required: BASKET_MESSAGES.phoneRequired,
	minLength: {
		value: 11,
		message: BASKET_MESSAGES.phoneInvalidLength,
	},
	maxLength: {
		value: 11,
		message: BASKET_MESSAGES.phoneInvalidLength,
	},
};
