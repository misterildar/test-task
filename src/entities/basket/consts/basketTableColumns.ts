import { TABLE_MESSAGES } from './messages';
import { CartProps, Column } from '../model/types';

export const basketTableColumns: Column<CartProps>[] = [
	{
		key: 'title',
		label: TABLE_MESSAGES.headerName,
		render: (item) => item.title,
	},
	{
		key: 'quantity',
		label: TABLE_MESSAGES.headerQuantity,
		render: (item) => item.quantity,
	},
	{
		key: 'price',
		label: TABLE_MESSAGES.headerPrice,
		render: (item) => item.price,
	},
	{
		key: 'cost',
		label: TABLE_MESSAGES.headerCost,
		render: (item) => item.price * item.quantity,
	},
];
