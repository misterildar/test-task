import { useOrderStore } from '../../model/store';
import { TABLE_MESSAGES } from '../../consts/messages';

import styles from './TableGoods.module.scss';

export const TableGoods = () => {
	const basketStore = useOrderStore((store) => store.cart);

	const sumTotal = basketStore.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>{TABLE_MESSAGES.headerName}</th>
						<th>{TABLE_MESSAGES.headerQuantity}</th>
						<th>{TABLE_MESSAGES.headerPrice}</th>
						<th>{TABLE_MESSAGES.headerCost}</th>
					</tr>
				</thead>
				<tbody>
					{basketStore.map(({ title, price, quantity, id }) => (
						<tr key={id}>
							<td>{title}</td>
							<td>{quantity}</td>
							<td>{price}</td>
							<td>{price * quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.total}>
				<h2>{TABLE_MESSAGES.totalLabel}</h2>
				<h2>{sumTotal}</h2>
			</div>
		</div>
	);
};
