import { ReactNode } from 'react';
import { UseFormReset } from 'react-hook-form';

export interface FormValues {
	phone: string;
}

export interface OrderStoreProps {
	cart: CartProps[];
	setCart: (cart: CartProps) => void;
	removeItem: (id: number) => void;
	clearCart: () => void;
}

export interface CartProps {
	id: number;
	quantity: number;
	title: string;
	price: number;
}

export type CartIdQuantity = Pick<CartProps, 'id' | 'quantity'>;

interface CartItem {
	id: number;
	quantity: number;
}

export interface OrderRequest {
	phone: string;
	cart: CartItem[];
}

export interface OrderResponse {
	success: number;
	error?: string;
}

export interface ModalBaskedProps {
	status: Status;
	setStatus: (status: Status) => void;
	clearCart: () => void;
	isModalOpen: boolean;
}

export interface InputMaskProps {
	onChange: (value: string) => void;
	name: string;
	value: string;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}

export interface Column<T> {
	key: string;
	label: string;
	render: (item: T) => ReactNode;
}

export interface UseSubmitOrderProps {
	reset: UseFormReset<FormValues>;
}

export type Status = 'ready' | 'loading' | 'success' | 'error' | 'clear' | 'showClearModal';
